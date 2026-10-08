"use strict";

function runProtocolDecoderTests() {
  let checks = 0;
  function check(condition, message) {
    if (!condition) throw new Error(message);
    checks++;
  }
  function fixture(payload) {
    const bytes = [0x55, 0xAA, payload.length + 1, ...payload];
    const crc = ShuttleProtocol.crc(bytes);
    return [...bytes, crc >> 8, crc & 255].map((byte) =>
      byte.toString(16).padStart(2, "0")).join("").toUpperCase();
  }
  const heartbeat = ShuttleProtocol.decodeHex("55AA06330000010A7903", true);
  check(heartbeat.valid && heartbeat.meaning === "Heartbeat" &&
    heartbeat.shuttle_number === 1 && heartbeat.parameter === 10, "Known heartbeat");
  check(ShuttleProtocol.crc([49, 50, 51, 52, 53, 54, 55, 56, 57]) === 0x29B1,
    "Independent CRC-CCITT-FALSE reference vector");
  const path = ShuttleProtocol.decodeHex("55AA09401B58011B581502B4DD", true);
  const command = path.instructions[0];
  check(path.valid && path.task_number === 7000 && command.instruction_id === 7000 &&
    command.axis === "X" && command.direction === "positive" &&
    command.target_coordinate === 2 && command.speed_group === 4, "Known X path");
  for (let operation = 1; operation <= 0x16; operation++) {
    const result = ShuttleProtocol.decodeHex(fixture([0x40, 0, 100, 1, 255, 255, operation, 2]), true);
    const item = result.instructions[0];
    check(result.valid && item.instruction_id === 65535 && item.supported && item.meaning,
      `Instruction ${operation}`);
    if (operation >= 7) {
      const direction = (operation - 7) % 4;
      check(item.axis === (direction < 2 ? "Y" : "X") &&
        item.direction === (direction % 2 === 0 ? "positive" : "negative") &&
        item.speed_group === Math.floor((operation - 7) / 4) + 1, `Movement ${operation}`);
    }
  }
  const batch = ShuttleProtocol.decodeHex(
    fixture([0x30, 0x1B, 0x58, 1, 2, 1, 0, 1, 0, 1, 1, 0x15, 2]), true);
  check(batch.valid && batch.instructions.length === 2 &&
    batch.instructions[1].instruction_id === 257, "Batch and 16-bit IDs");
  check(!ShuttleProtocol.decodeHex(fixture([0x30, 0, 1, 1, 2, 0, 1, 7, 2]), true).valid,
    "Batch count mismatch");
  check(!ShuttleProtocol.decodeHex(fixture([0x30, 0, 1, 1, 2, 0, 1, 7, 2, 0, 1, 7, 2]), true).valid,
    "Duplicate instruction IDs");
  check(!ShuttleProtocol.decodeHex(fixture([0x40, 0, 1, 1, 0, 0, 7, 2]), true).valid,
    "Zero instruction ID");
  const unknown = ShuttleProtocol.decodeHex(fixture([0x40, 0, 1, 1, 0, 1, 0xFF, 2]), true);
  check(unknown.valid && !unknown.instructions[0].supported, "Unknown opcode explicit");
  check(!ShuttleProtocol.decodeHex("55AA06330000010A7902", true).valid, "Bad CRC");
  for (const hex of ["", "ABC", "ZZ", "55AA", "55AA06330000010A790355AA", "00AA06330000010A7903"]) {
    check(!ShuttleProtocol.decodeHex(hex, true).valid, `Bad frame ${hex}`);
  }
  const status = ShuttleProtocol.decodeHex(
    fixture([1, 1, 2, 3, 2, 90, 0, 5, 1, 0x1B, 0x58, 3, 0, 7, 1, 0, 1, 2, 3, 1, 0, 0, 9]), false);
  check(status.valid && status.position.x === 2 && status.position.y === 3 &&
    status.position.z === 2 && status.task_number === 7000 &&
    status.completed_instruction_count === 3 && status.state_name === "Moving" &&
    status.error_code === 256 && status.radio === 9, "Status byte offsets");
  check(!ShuttleProtocol.decodeHex(fixture([1, 1, 2]), false).valid, "Short status");
  for (const kind of [0x33, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3C]) {
    const result = ShuttleProtocol.decodeHex(fixture([kind, 0, 1, 1, kind === 0x33 ? 10 : 2]), true);
    check(result.valid && result.parameter !== undefined, `Function ${kind}`);
    const ack = ShuttleProtocol.decodeHex(fixture([kind, 0, 1, 1, 0]), false);
    check(ack.valid && ack.result_byte === 0 && ack.meaning.includes("acknowledgement"), `ACK ${kind}`);
  }
  const sync = ShuttleProtocol.decodeHex(fixture([0x90, 0, 1, 1, 2, 3, 2]), true);
  check(sync.valid && sync.position.y === 3, "Position synchronization");
  check(!ShuttleProtocol.decodeHex(fixture([0x33, 0, 1, 1, 0]), true).valid,
    "Direction prevents interpreting ACK as heartbeat");
  check(!ShuttleProtocol.decodeHex(fixture([0x40, 0, 1, 1, 0, 1, 7, 2]), false).valid,
    "Direction prevents interpreting command as ACK");
  check(!ShuttleProtocol.decodeHex(fixture([0x33, 0, 1]), true).valid, "Missing common fields");
  check(!ShuttleProtocol.decodeHex(fixture([0x90, 0, 1, 1, 2]), true).valid, "Bad sync layout");
  check(!ShuttleProtocol.decodeHex(fixture([0x35, 0, 1, 1]), true).valid, "Missing parameter");
  const unsupported = ShuttleProtocol.decodeHex(fixture([0xF0, 1]), true);
  check(unsupported.valid && !unsupported.supported, "Unknown message type");
  const event = {id: 7, kind: "rx_frame", details: {hex: "55AA09401B58011B581502B4DD"}};
  const translated = ShuttleProtocol.translateEvent(event);
  check(translated.translation.instructions[0].target_coordinate === 2 &&
    translated.details.hex === event.details.hex && event.translation === undefined,
    "Translation preserves raw event");
  check(!ShuttleProtocol.translateEvent({...event, kind: "rx_chunk"}).translation.instructions,
    "Chunk is not mislabeled as command");
  check(ShuttleProtocol.translateEvent({...event, details: {hex: "55AA"}}).translation.valid === false,
    "Malformed event explicitly translated as invalid");
  return {passed: true, checks, scope: "Offline decoder fixtures only; no network/equipment commands"};
}
