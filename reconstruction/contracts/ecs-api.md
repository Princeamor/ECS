# Recovered ECS API contract

The compiled ECS controllers use the Nginx `/prod-api/` proxy and `/ws-api/` WebSocket proxy. This inventory was reconstructed from Spring MVC annotations; it records paths, not assumed request DTO field shapes.

## Safety-critical groups

| Base route | Read routes | Command/configuration routes — do not expose before simulator sign-off |
|---|---|---|
| `/business/WHMon` | `getRunMap`, `getDeviceList`, `getExList`, `getExTaskCount`, `getDeviceNodeDetail` | `callFunction` |
| `/business/device` | `list`, `/{id}`, `getDeviceConnect/{id}`, `getCarInfo`, `getCarRadioInfo` | `changeEnableStatus`, `forceOffLine/{id}` |
| `/business/plcData` | `list`, `getListByPlcIdAndDeviceCode`, `readByDataId`, `batchRead` | `writeByDataId`, `clearData`, `importData` |
| `/business/task` | `list`, `step/{taskCode}`, `statistics`, `listByBatchCode` | `complate/{taskCode}`, `in/{taskCode}`, `cancel/{taskCode}`, `suspend/{taskCode}`, `executing/{taskCode}`, `stepCommand/{stepId}`, `feedback` |
| `/api/taskApi` | `getInfoByOutTaskCode`, `getEntrances`, `getDeviceInfo`, `getMap` | `start/{wmsTaskCode}`, `addTask`, `cancelTask`, `restart/{carCode}`, `recover/{carCode}`, `recoverAndCancelTask/{carCode}`, `editPalletCode` |

## Authentication and navigation

- `POST /login` accepts a login body and returns a token.
- `GET /getInfo` returns current user, roles, and permissions.
- `GET /getRouters` returns menu/router configuration.
- `/ws-api/` proxies to the ECS service on port 8182; the message schema remains unknown from classes alone.

## Reconstruction rule

Treat backend responses as opaque until captured from a simulator. Maintain endpoint, method, authentication, payload, and status semantics; translate labels only in the frontend.
