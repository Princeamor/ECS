"use strict";

const ShuttleProtocol = (() => {
  const types = {
    0x30: "Task instruction batch", 0x40: "Path instruction",
    0x33: "Heartbeat", 0x35: "Recover", 0x36: "Pause",
    0x37: "Resume", 0x38: "Cancel", 0x39: "Set floor",
    0x3C: "Set alignment", 0x90: "Synchronize position"
  };
  const states = {0: "Ready", 1: "Lifting", 2: "Lowering", 3: "Changing track",
    4: "Changing track", 5: "Moving", 6: "Paused", 7: "Cancelled", 11: "Fault"};
  const operations = {
    1: "Lift", 2: "Lower", 3: "Select track 0", 4: "Select track 1",
    5: "Calibration and lift", 6: "Calibration"
  };

  function crc(bytes) {
    let value = 0xFFFF;
    for (const byte of bytes) {
      value ^= byte << 8;
      for (let bit = 0; bit < 8; bit++) {
        value = ((value << 1) ^ ((value & 0x8000) ? 0x1021 : 0)) & 0xFFFF;
      }
    }
    return value;
  }

  function instruction(bytes, offset) {
    const id = bytes[offset] * 256 + bytes[offset + 1];
    const operation = bytes[offset + 2];
    const content = bytes[offset + 3];
    const result = {instruction_id: id, operation_hex: operation.toString(16).padStart(2, "0").toUpperCase(),
      content, supported: operation >= 1 && operation <= 0x16};
    if (operations[operation]) result.meaning = operations[operation];
    else if (operation >= 7 && operation <= 0x16) {
      const direction = (operation - 7) % 4;
      result.axis = direction < 2 ? "Y" : "X";
      result.direction = direction % 2 === 0 ? "positive" : "negative";
      result.target_coordinate = content;
      result.speed_group = Math.floor((operation - 7) / 4) + 1;
      result.meaning = `Move ${result.axis} ${result.direction} to absolute coordinate ${content} ` +
        `(protocol speed group ${result.speed_group}; physical speed not established)`;
    } else result.meaning = "Unknown operation; no movement inferred";
    return result;
  }

  function decodeHex(hex, fromEcs) {
    const invalid = (error) => ({valid: false, error});
    if (typeof hex !== "string" || !/^(?:[0-9a-fA-F]{2})+$/.test(hex)) {
      return invalid("Expected an even-length hexadecimal frame");
    }
    const bytes = hex.match(/../g).map((byte) => parseInt(byte, 16));
    if (bytes.length < 6 || bytes[0] !== 0x55 || bytes[1] !== 0xAA ||
        bytes[2] < 2 || bytes[2] > 120 || bytes.length !== bytes[2] + 4) {
      return invalid("Not exactly one complete shuttle frame (header/length mismatch)");
    }
    if (crc(bytes.slice(0, -2)) !== bytes[bytes.length - 2] * 256 + bytes[bytes.length - 1]) {
      return invalid("CRC-16/CCITT-FALSE mismatch");
    }
    const payload = bytes.slice(3, -2);
    const kind = payload[0];
    const result = {valid: true, crc_valid: true, direction: fromEcs ? "ECS -> simulator" : "simulator -> ECS",
      message_type_hex: kind.toString(16).padStart(2, "0").toUpperCase()};
    const word = (offset) => payload[offset] * 256 + payload[offset + 1];
    if (!fromEcs && kind === 1) {
      if (payload.length !== 23) return invalid("Unexpected status layout");
      return {...result, meaning: "Shuttle status", shuttle_number: payload[1],
        position: {x: payload[2], y: payload[3], z: payload[4]}, battery_percent: payload[5],
        mode: payload[6], state: payload[7], state_name: states[payload[7]] || "Unknown state",
        alignment: payload[8], task_number: word(9), completed_instruction_count: payload[11],
        laser: word(12), lift_state: payload[14], track: payload[15], pallet: payload[16],
        error_type: payload[17], hardware_error: payload[18], error_code: word(19),
        radio: word(21)};
    }
    if (!types[kind]) return {...result, supported: false, meaning: "Unknown message type; raw hex retained"};
    if (payload.length < 4) return invalid("Missing transaction and shuttle number");
    Object.assign(result, {supported: true, meaning: types[kind], task_number: word(1),
      shuttle_number: payload[3]});
    if (!fromEcs) {
      if (payload.length !== 5) return invalid("Unexpected acknowledgement layout");
      return {...result, meaning: `${types[kind]} acknowledgement`, result_byte: payload[4],
        note: "An acknowledgement is not task completion; result byte meaning is not independently established."};
    }
    if (kind === 0x30 || kind === 0x40) {
      const start = kind === 0x30 ? 5 : 4;
      const count = kind === 0x30 ? payload[4] : 1;
      if (!count || payload.length !== start + 4 * count) return invalid("Instruction count/layout mismatch");
      result.instructions = Array.from({length: count}, (_, index) => instruction(payload, start + index * 4));
      const ids = result.instructions.map((item) => item.instruction_id);
      if (ids.includes(0) || new Set(ids).size !== ids.length) return invalid("Instruction IDs must be nonzero and unique");
      return result;
    }
    if (kind === 0x90) {
      if (payload.length !== 7) return invalid("Unexpected position synchronization layout");
      return {...result, position: {x: payload[4], y: payload[5], z: payload[6]}};
    }
    if (payload.length !== 5) return invalid("Expected one parameter byte");
    if (kind === 0x33 && payload[4] !== 10) return invalid("Unsupported heartbeat parameter");
    return {...result, parameter: payload[4]};
  }

  function translateEvent(event) {
    const kind = event.kind;
    let translation;
    if (kind === "rx_frame" || kind === "tx_attempt" || kind === "tx_sent" || kind === "command_rejected") {
      translation = decodeHex(event.details.hex, kind === "rx_frame" || kind === "command_rejected");
    } else if (kind === "rx_chunk" || kind === "incomplete_frame") {
      translation = {direction: "ECS -> simulator",
        meaning: "Raw TCP bytes; may be partial or contain multiple frames. Not decoded as a single command."};
    } else {
      translation = {meaning: "Connection or protocol diagnostic", message: event.details.message};
    }
    return {...event, translation};
  }

  return {crc, decodeHex, translateEvent};
})();
