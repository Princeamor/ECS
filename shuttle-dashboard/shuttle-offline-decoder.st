(* Offline decoding example only. No sockets, PLC writes, motion or safety logic.
   IEC 61131-3 syntax; vendor-specific import/type/function syntax may need changes.
   Supply exactly one complete binary frame, NOT ASCII hex characters.
   FromEcs distinguishes a command from an acknowledgement with the same type.
   Length includes header and CRC. Buffer uses ZERO-BASED indexing.
   This is not the controller's original source and has not been vendor-compiled.
   Known test: 55 AA 06 33 00 00 01 0A 79 03 = heartbeat, transaction 0, shuttle 1.
   Path test: 55 AA 09 40 1B 58 01 1B 58 15 02 B4 DD.
   Set FromEcs=TRUE and Length=13 for this path test. Expected TaskNumber=7000,
   ShuttleNumber=1, Instructions[0].Id=7000, Axis=1 (X), Positive=TRUE,
   TargetCoordinate=2, SpeedGroup=4. Do not wire these fields to actuators.
   Error: 1 header/length, 2 CRC, 3 layout, 4 instruction ID.
   Valid means decoded layout/CRC only, NOT safe, accepted or completed movement. *)

TYPE ST_ShuttleInstruction :
STRUCT
    Id : UINT;
    Operation : BYTE;
    Content : BYTE;
    Supported : BOOL;
    IsMovement : BOOL;
    Axis : BYTE; (* 0 none, 1 X, 2 Y *)
    Positive : BOOL;
    TargetCoordinate : BYTE;
    SpeedGroup : BYTE; (* protocol group only, not a physical speed *)
END_STRUCT
END_TYPE

FUNCTION F_ShuttleWord : UINT
VAR_INPUT
    Hi : BYTE;
    Lo : BYTE;
END_VAR
F_ShuttleWord := BYTE_TO_UINT(Hi) * UINT#256 + BYTE_TO_UINT(Lo);
END_FUNCTION

FUNCTION_BLOCK FB_ShuttleOfflineDecode
VAR_INPUT
    Buffer : ARRAY[0..123] OF BYTE;
    Length : UINT;
    FromEcs : BOOL;
END_VAR
VAR_OUTPUT
    Valid : BOOL;
    Supported : BOOL;
    ErrorCode : UINT;
    Kind : BYTE;
    IsAcknowledgement : BOOL;
    ResultByte : BYTE;
    ShuttleNumber : BYTE;
    TaskNumber : UINT;
    Parameter : BYTE;
    InstructionCount : UINT;
    Instructions : ARRAY[0..27] OF ST_ShuttleInstruction;
    X : BYTE;
    Y : BYTE;
    Z : BYTE;
    BatteryPercent : BYTE;
    Mode : BYTE;
    State : BYTE;
    Alignment : BYTE;
    CompletedInstructionCount : BYTE;
    ErrorType : BYTE;
    HardwareError : BYTE;
    DeviceErrorCode : UINT;
END_VAR
VAR
    Crc : WORD;
    ExpectedCrc : WORD;
    I : INT;
    J : INT;
    K : INT;
    Start : INT;
    Offset : INT;
    Direction : INT;
END_VAR

Valid := FALSE;
Supported := FALSE;
ErrorCode := UINT#0;
Kind := BYTE#0;
IsAcknowledgement := FALSE;
ResultByte := BYTE#0;
ShuttleNumber := BYTE#0;
TaskNumber := UINT#0;
Parameter := BYTE#0;
InstructionCount := UINT#0;
X := BYTE#0;
Y := BYTE#0;
Z := BYTE#0;
BatteryPercent := BYTE#0;
Mode := BYTE#0;
State := BYTE#0;
Alignment := BYTE#0;
CompletedInstructionCount := BYTE#0;
ErrorType := BYTE#0;
HardwareError := BYTE#0;
DeviceErrorCode := UINT#0;
FOR I := 0 TO 27 DO
    Instructions[I].Id := UINT#0;
    Instructions[I].Operation := BYTE#0;
    Instructions[I].Content := BYTE#0;
    Instructions[I].Supported := FALSE;
    Instructions[I].IsMovement := FALSE;
    Instructions[I].Axis := BYTE#0;
    Instructions[I].Positive := FALSE;
    Instructions[I].TargetCoordinate := BYTE#0;
    Instructions[I].SpeedGroup := BYTE#0;
END_FOR;

IF (Length < UINT#6) OR (Length > UINT#124) THEN
    ErrorCode := UINT#1;
    RETURN;
END_IF;
IF (Buffer[0] <> BYTE#16#55) OR (Buffer[1] <> BYTE#16#AA)
    OR (Buffer[2] < BYTE#2) OR (Buffer[2] > BYTE#120)
    OR (Length <> BYTE_TO_UINT(Buffer[2]) + UINT#4) THEN
    ErrorCode := UINT#1;
    RETURN;
END_IF;

Crc := WORD#16#FFFF;
FOR I := 0 TO UINT_TO_INT(Length) - 3 DO
    Crc := Crc XOR SHL(BYTE_TO_WORD(Buffer[I]), 8);
    FOR J := 0 TO 7 DO
        IF (Crc AND WORD#16#8000) <> WORD#0 THEN
            Crc := SHL(Crc, 1) XOR WORD#16#1021;
        ELSE
            Crc := SHL(Crc, 1);
        END_IF;
    END_FOR;
END_FOR;
ExpectedCrc := SHL(BYTE_TO_WORD(Buffer[UINT_TO_INT(Length) - 2]), 8)
    OR BYTE_TO_WORD(Buffer[UINT_TO_INT(Length) - 1]);
IF Crc <> ExpectedCrc THEN
    ErrorCode := UINT#2;
    RETURN;
END_IF;

Kind := Buffer[3];
IF (NOT FromEcs) AND (Kind = BYTE#1) THEN
    IF Length <> UINT#28 THEN
        ErrorCode := UINT#3;
        RETURN;
    END_IF;
    ShuttleNumber := Buffer[4];
    X := Buffer[5];
    Y := Buffer[6];
    Z := Buffer[7];
    BatteryPercent := Buffer[8];
    Mode := Buffer[9];
    State := Buffer[10];
    Alignment := Buffer[11];
    TaskNumber := F_ShuttleWord(Hi := Buffer[12], Lo := Buffer[13]);
    CompletedInstructionCount := Buffer[14];
    ErrorType := Buffer[20];
    HardwareError := Buffer[21];
    DeviceErrorCode := F_ShuttleWord(Hi := Buffer[22], Lo := Buffer[23]);
    Supported := TRUE;
    Valid := TRUE;
    RETURN;
END_IF;

CASE Kind OF
    BYTE#16#30, BYTE#16#40, BYTE#16#33, BYTE#16#35,
    BYTE#16#36, BYTE#16#37, BYTE#16#38, BYTE#16#39,
    BYTE#16#3C, BYTE#16#90:
        Supported := TRUE;
ELSE
    (* Unknown frame: CRC is valid, semantics are not inferred. *)
    Valid := TRUE;
    RETURN;
END_CASE;

IF Length < UINT#9 THEN
    ErrorCode := UINT#3;
    RETURN;
END_IF;
TaskNumber := F_ShuttleWord(Hi := Buffer[4], Lo := Buffer[5]);
ShuttleNumber := Buffer[6];
IF NOT FromEcs THEN
    IF Length <> UINT#10 THEN
        ErrorCode := UINT#3;
        RETURN;
    END_IF;
    IsAcknowledgement := TRUE;
    ResultByte := Buffer[7];
    Valid := TRUE;
    RETURN;
END_IF;

CASE Kind OF
    BYTE#16#30, BYTE#16#40:
        IF Kind = BYTE#16#30 THEN
            IF Length < UINT#10 THEN
                ErrorCode := UINT#3;
                RETURN;
            END_IF;
            InstructionCount := BYTE_TO_UINT(Buffer[7]);
            Start := 8;
        ELSE
            InstructionCount := UINT#1;
            Start := 7;
        END_IF;
        IF (InstructionCount = UINT#0) OR (InstructionCount > UINT#28)
            OR (Length <> INT_TO_UINT(Start) + InstructionCount * UINT#4 + UINT#2) THEN
            ErrorCode := UINT#3;
            RETURN;
        END_IF;
        FOR I := 0 TO UINT_TO_INT(InstructionCount) - 1 DO
            Offset := Start + I * 4;
            Instructions[I].Id := F_ShuttleWord(Hi := Buffer[Offset], Lo := Buffer[Offset + 1]);
            IF Instructions[I].Id = UINT#0 THEN
                ErrorCode := UINT#4;
                RETURN;
            END_IF;
            IF I > 0 THEN
                FOR K := 0 TO I - 1 DO
                    IF Instructions[K].Id = Instructions[I].Id THEN
                        ErrorCode := UINT#4;
                        RETURN;
                    END_IF;
                END_FOR;
            END_IF;
            Instructions[I].Operation := Buffer[Offset + 2];
            Instructions[I].Content := Buffer[Offset + 3];
            Instructions[I].Supported := (Instructions[I].Operation >= BYTE#1)
                AND (Instructions[I].Operation <= BYTE#16#16);
            IF (Instructions[I].Operation >= BYTE#7)
                AND (Instructions[I].Operation <= BYTE#16#16) THEN
                Instructions[I].IsMovement := TRUE;
                Direction := (BYTE_TO_INT(Instructions[I].Operation) - 7) MOD 4;
                IF Direction < 2 THEN
                    Instructions[I].Axis := BYTE#2;
                ELSE
                    Instructions[I].Axis := BYTE#1;
                END_IF;
                Instructions[I].Positive := (Direction MOD 2) = 0;
                Instructions[I].TargetCoordinate := Instructions[I].Content;
                Instructions[I].SpeedGroup := INT_TO_BYTE(
                    (BYTE_TO_INT(Instructions[I].Operation) - 7) / 4 + 1);
            END_IF;
        END_FOR;
    BYTE#16#90:
        IF Length <> UINT#12 THEN
            ErrorCode := UINT#3;
            RETURN;
        END_IF;
        X := Buffer[7];
        Y := Buffer[8];
        Z := Buffer[9];
ELSE
    IF Length <> UINT#10 THEN
        ErrorCode := UINT#3;
        RETURN;
    END_IF;
    Parameter := Buffer[7];
    IF (Kind = BYTE#16#33) AND (Parameter <> BYTE#10) THEN
        ErrorCode := UINT#3;
        RETURN;
    END_IF;
END_CASE;
Valid := TRUE;
END_FUNCTION_BLOCK
