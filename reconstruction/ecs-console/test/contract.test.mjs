import test from 'node:test'; import assert from 'node:assert/strict'; import { api } from '../src/contract.js';
test('ECS proxy paths retain recovered prefixes',()=>{assert.equal(api.monitor.devices,'/prod-api/business/WHMon/getDeviceList');assert.equal(api.websocket,'/ws-api/');assert.equal(api.task.steps('A B'),'/prod-api/business/task/step/A%20B')});
