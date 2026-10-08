"use strict";

const byId = (id) => document.getElementById(id);
const states = {0: "Ready", 1: "Lifting", 2: "Lowering", 3: "Changing track",
  4: "Changing track", 5: "Moving", 6: "Paused", 7: "Cancelled", 11: "Fault"};
let apiBase = "";
let token = "";
let timer;
let cursor = 0;
let connected = false;
let currentState;
let journal = [];
let busy = false;
let workflowSnapshot;
let workflowUpdated = 0;
let plcSnapshot;
byId("api-url").value = `http://${location.hostname || "127.0.0.1"}:8765`;
if (["127.0.0.1", "localhost"].includes(location.hostname)) {
  document.querySelectorAll('nav[aria-label="Warehouse workflow"] a').forEach((link) => {
    const url = new URL(link.href);
    url.hostname = location.hostname;
    link.href = url.href;
  });
}

function showError(error) {
  byId("error").textContent = error.message;
  byId("error").hidden = false;
}

function buttons() {
  byId("configure").disabled = !connected || busy || Boolean(currentState?.armed);
  byId("download").disabled = !connected || busy;
  byId("tcp-download").disabled = !connected || busy;
  byId("self-test").disabled = !connected || busy;
  byId("workflow-download").disabled = !connected || !workflowSnapshot;
  byId("plc-download").disabled = !connected || busy || !plcSnapshot;
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.disabled = !connected || busy;
    if (button.dataset.action === "arm") {
      button.disabled ||= !byId("isolation").checked || Boolean(currentState?.armed);
    }
  });
}

async function api(path, body) {
  const response = await fetch(apiBase + path, {
    method: body === undefined ? "GET" : "POST",
    headers: {Authorization: `Bearer ${token}`, ...(body === undefined ? {} :
      {"Content-Type": "application/json"})},
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
    cache: "no-store"
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || `API returned ${response.status}`);
  return result;
}

function display(state) {
  currentState = state;
  byId("armed").textContent = state.armed ? "ARMED - TEST FEEDBACK" : "DISARMED";
  byId("sessions").textContent = state.connections.length ? state.connections.join(", ") : "NO ECS CONNECTION";
  byId("position").textContent = `${state.x}, ${state.y}, ${state.z} / ${state.soc}%`;
  byId("task").textContent = `${state.task_number} / ${state.task_step}`;
  byId("feedback").textContent = `A1-${state.car_number}: ${states[state.state] || `State ${state.state}`}. ` +
    `${state.pending_commands.length} pending instructions. ` +
    (state.last_error ? `Last error: ${state.last_error}` : "No simulated fault.");
  if (state.self_test && !busy) displaySelfTest(state.self_test);
  buttons();
}

function displaySelfTest(result) {
  const passed = result.checks.filter((check) => check.passed).length;
  byId("self-test-summary").textContent =
    `${result.passed ? "PASS" : "FAIL"}: ${passed}/${result.checks.length} checks passed. ${result.timestamp}. ${result.scope}`;
  const rows = result.checks.map((check) => {
    const row = document.createElement("tr");
    [check.name, check.passed ? "PASS" : "FAIL", check.details].forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.append(cell);
    });
    return row;
  });
  byId("self-test-results").replaceChildren(...rows);
}

byId("self-test").addEventListener("click", async () => {
  busy = true;
  buttons();
  byId("error").hidden = true;
  byId("self-test-summary").textContent = "Running isolated self-test...";
  byId("self-test-results").replaceChildren();
  try {
    displaySelfTest(await api("/api/self-test", {}));
    await refresh();
  } catch (error) {
    byId("self-test-summary").textContent = `Self-test could not complete: ${error.message}`;
    showError(error);
  } finally {
    busy = false;
    buttons();
  }
});

function renderJournal() {
  const fragment = document.createDocumentFragment();
  [...journal].reverse().forEach((event) => {
    const row = document.createElement("tr");
    [ `#${event.id}\n${event.timestamp}`, event.kind,
      JSON.stringify(event.details, null, 2) ].forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.append(cell);
    });
    fragment.append(row);
  });
  byId("events").replaceChildren(fragment);
}

async function refresh() {
  const state = await api("/api/state");
  display(state);
  const taskOnly = byId("task-only").checked;
  const result = await api(`/api/events?after=${cursor}&limit=300&task_only=${taskOnly ? 1 : 0}`);
  if (result.events.length) {
    cursor = result.events[result.events.length - 1].id;
    journal = journal.concat(result.events).slice(-300);
    renderJournal();
  }
  if (taskOnly && result.events.length < 300) cursor = result.latest_event;
  byId("journal-status").textContent = `Read through event ${cursor}; latest event ${result.latest_event}.`;
  if (Date.now() - workflowUpdated >= 5000) {
    try {
      workflowSnapshot = await api("/api/workflow");
      workflowUpdated = Date.now();
      displayWorkflow(workflowSnapshot);
    } catch (error) {
      byId("workflow-status").textContent = `Workflow logs unavailable: ${error.message}`;
      workflowSnapshot = undefined;
      byId("workflow-events").replaceChildren();
    }
    try {
      plcSnapshot = await api("/api/plc-writes?limit=1000");
      displayPlcWrites(plcSnapshot);
    } catch (error) {
      plcSnapshot = undefined;
      byId("plc-status").textContent = `PLC write logs unavailable: ${error.message}`;
      byId("plc-events").replaceChildren();
    }
    buttons();
  }
}

function displayPlcWrites(result) {
  const problems = result.sources.flatMap((source) => source.errors);
  const truncated = result.sources.some((source) => source.truncated);
  byId("plc-status").textContent =
    `${result.timestamp}. ${result.total ? `${result.total} retained writes` : "No recorded PLC writes"}. ` +
    `${truncated ? "Some source files contain only recent tails. " : ""}${problems.join("; ")} ` +
    (result.total > result.events.length ? "Download includes the remaining retained writes." : "");
  const rows = [...result.events].reverse().map((event) => {
    const row = document.createElement("tr");
    const details = event.details;
    [`${event.timestamp}\n${details.name}`,
      `${details.address}\n${details.value}`,
      `${details.success ? "DRIVER SUCCESS" : "DRIVER FAILURE"}\n${details.result_message || ""}`]
      .forEach((text) => {
        const cell = document.createElement("td");
        cell.textContent = text;
        row.append(cell);
      });
    return row;
  });
  byId("plc-events").replaceChildren(...rows);
}

byId("plc-download").addEventListener("click", async () => {
  busy = true;
  buttons();
  byId("error").hidden = true;
  try {
    const snapshot = await api("/api/plc-writes?limit=1000");
    const {events, ...metadata} = snapshot;
    const chunks = [JSON.stringify({kind: "plc_write_export", ...metadata}) + "\n"];
    let page = events;
    let exported = 0;
    while (page.length) {
      chunks.push(page.map((event) => JSON.stringify(event) + "\n").join(""));
      exported += page.length;
      const after = page[page.length - 1].id;
      page = (await api(`/api/plc-writes?after=${after}&limit=1000&through=${snapshot.through}`)).events;
    }
    if (exported !== snapshot.total) throw new Error("PLC write export count does not match snapshot");
    const url = URL.createObjectURL(new Blob(chunks, {type: "application/x-ndjson"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `ecs-plc-writes-${new Date().toISOString().replace(/[:.]/g, "-")}.jsonl`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    showError(error);
  } finally {
    busy = false;
    buttons();
  }
});

function displayWorkflow(result) {
  const problems = result.sources.flatMap((source) => source.errors);
  const sources = result.sources.map((source) =>
    `${source.source}: ${source.available ? `${source.events} excerpts${source.truncated ? " (recent tail only)" : ""}` : "UNAVAILABLE"}`);
  byId("workflow-status").textContent = `${result.timestamp}. ${result.events.length} retained exchanges. Recent tails: ${sources.join("; ")}. ${problems.join("; ")}`;
  const verified = result.verification;
  byId("workflow-verification").textContent = verified ?
    `Last verification (${verified.timestamp}): ${verified.summary}` :
    (result.verification_error || "No end-to-end verification recorded.");
  const rows = [...result.events].reverse().map((event) => {
    const row = document.createElement("tr");
    [`${event.source}\n${event.timestamp}`,
      `${event.kind}\n${event.tasks.join(", ")}\n${event.route}`,
      JSON.stringify(event.details, null, 2)].forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.append(cell);
    });
    return row;
  });
  byId("workflow-events").replaceChildren(...rows);
}

byId("task-only").addEventListener("change", async () => {
  cursor = 0;
  journal = [];
  renderJournal();
  if (connected) {
    try {
      await refresh();
    } catch (error) {
      showError(error);
    }
  }
});

byId("workflow-download").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(workflowSnapshot, null, 2)],
    {type: "application/json"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = `warehouse-workflow-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

function scheduleRefresh() {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      await refresh();
      if (connected) scheduleRefresh();
    } catch (error) {
      connected = false;
      byId("armed").textContent = "API UNREACHABLE - STATE UNKNOWN";
      byId("sessions").textContent = "Unknown";
      buttons();
      showError(error);
    }
  }, 1000);
}

byId("connect-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  clearTimeout(timer);
  connected = false;
  byId("error").hidden = true;
  try {
    const url = new URL(byId("api-url").value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password ||
        url.pathname !== "/" || url.search || url.hash ||
        !["127.0.0.1", "localhost", "100.119.148.61"].includes(url.hostname)) {
      throw new Error("Use this simulator's localhost or VPN API origin only");
    }
    apiBase = url.origin;
    token = byId("token").value.trim();
    if (token.startsWith("cat ") || token.includes("access-token") || token.includes("~/.local/")) {
      throw new Error("Run the cat command in your terminal, then paste the token it prints here. Do not paste the command itself.");
    }
    cursor = 0;
    journal = [];
    workflowUpdated = 0;
    const state = await api("/api/state");
    connected = true;
    display(state);
    const names = {"car-number": "car_number", x: "x", y: "y", z: "z",
      soc: "soc", mode: "mode", "command-seconds": "command_seconds"};
    Object.entries(names).forEach(([id, key]) => { byId(id).value = state[key]; });
    byId("nodes").value = state.allowed_nodes.map((node) => node.join(",")).join("\n");
    await refresh();
    scheduleRefresh();
  } catch (error) {
    connected = false;
    showError(error);
    buttons();
  }
});

async function control(action, parameters = {}) {
  busy = true;
  buttons();
  byId("error").hidden = true;
  try {
    await api("/api/control", {action, parameters});
    await refresh();
  } catch (error) {
    showError(error);
  } finally {
    busy = false;
    buttons();
  }
}

byId("configure-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const nodes = byId("nodes").value.trim().split(/\r?\n/).map((line, index) => {
      const pieces = line.split(",").map((part) => part.trim());
      if (pieces.length !== 3 || pieces.some((part) => !/^\d+$/.test(part))) {
        throw new Error(`Map line ${index + 1} must contain x,y,z integers`);
      }
      return pieces.map(Number);
    });
    await control("configure", {
      car_number: Number(byId("car-number").value), x: Number(byId("x").value),
      y: Number(byId("y").value), z: Number(byId("z").value),
      soc: Number(byId("soc").value), mode: Number(byId("mode").value),
      command_seconds: Number(byId("command-seconds").value), allowed_nodes: nodes
    });
  } catch (error) {
    showError(error);
  }
});

byId("isolation").addEventListener("change", buttons);
document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.action === "arm" && !byId("isolation").checked) {
      showError(new Error("Confirm test isolation before arming"));
      return;
    }
    control(button.dataset.action);
  });
});

const tcpEventKinds = new Set([
  "connected", "disconnected", "connection_rejected", "connection_error",
  "rx_chunk", "rx_frame", "incomplete_frame", "protocol_error", "command_rejected",
  "tx_attempt", "tx_sent", "tx_failed"
]);

async function downloadJournal(tcpOnly = false) {
  busy = true;
  buttons();
  byId("error").hidden = true;
  try {
    const state = await api("/api/state");
    const through = state.latest_event;
    const chunks = tcpOnly ? [JSON.stringify({
      kind: "shuttle_tcp_export",
      timestamp: new Date().toISOString(),
      through,
      scope: "All retained ECS <-> shuttle simulator TCP payload observations at this snapshot. " +
        "Includes heartbeats and connection/protocol errors. rx_chunk and rx_frame can describe " +
        "the same received bytes; tx_attempt and tx_sent can describe the same outgoing frame. " +
        "tx_sent means the local socket write completed, not that ECS accepted it. " +
        "Not a TCP/IP packet capture or a conveyor/hoist PLC trace. " +
        "Complete frames include read-only translations; original hex is preserved. " +
        "Unknown layouts and CRC errors are explicit, not guessed.",
      directions: {
        rx_chunk: "ECS -> simulator",
        rx_frame: "ECS -> simulator",
        tx_attempt: "simulator -> ECS",
        tx_sent: "simulator -> ECS"
      }
    }) + "\n"] : [];
    let after = 0;
    while (after < through) {
      const result = await api(`/api/events?after=${after}&limit=1000&through=${through}`);
      if (!result.events.length) throw new Error("Journal export ended before the snapshot cursor");
      const events = tcpOnly ? result.events.filter((event) => tcpEventKinds.has(event.kind)) :
        result.events;
      chunks.push(events.map((event) =>
        JSON.stringify(tcpOnly ? ShuttleProtocol.translateEvent(event) : event) + "\n").join(""));
      after = result.events[result.events.length - 1].id;
    }
    const url = URL.createObjectURL(new Blob(chunks, {type: "application/x-ndjson"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tcpOnly ? "shuttle-tcp" : "shuttle-simulation"}-${new Date().toISOString().replace(/[:.]/g, "-")}.jsonl`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    showError(error);
  } finally {
    busy = false;
    buttons();
  }
}

byId("download").addEventListener("click", () => downloadJournal());
byId("tcp-download").addEventListener("click", () => downloadJournal(true));
