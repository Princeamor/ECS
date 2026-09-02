/** Recovered from compiled ECS controller annotations. All paths retain the legacy /prod-api proxy prefix. */
export const api = {
  login: '/prod-api/login', routers: '/prod-api/getRouters', profile: '/prod-api/getInfo',
  monitor: { map: '/prod-api/business/WHMon/getRunMap', devices: '/prod-api/business/WHMon/getDeviceList', exceptions: '/prod-api/business/WHMon/getExList', taskCount: '/prod-api/business/WHMon/getExTaskCount' },
  device: { list: '/prod-api/business/device/list', detail: id => `/prod-api/business/device/${id}`, connection: id => `/prod-api/business/device/getDeviceConnect/${id}` },
  task: { list: '/prod-api/business/task/list', steps: code => `/prod-api/business/task/step/${encodeURIComponent(code)}`, statistics: '/prod-api/business/task/statistics' },
  warning: { list: '/prod-api/business/warningLog/list', monitor: '/prod-api/monitor/warningMonitor/index' },
  websocket: '/ws-api/'
};
export async function request(path, { token, method = 'GET', body } = {}) {
  const response = await fetch(path, { method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}
