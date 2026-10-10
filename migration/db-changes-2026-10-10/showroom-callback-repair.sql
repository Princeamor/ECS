CREATE DATABASE IF NOT EXISTS psa_floor1_backup_20261010;
CREATE TABLE IF NOT EXISTS psa_floor1_backup_20261010.ecs_callback
LIKE `ehox-ecs-v2`.sys_config;

START TRANSACTION;
INSERT INTO psa_floor1_backup_20261010.ecs_callback
SELECT c.* FROM `ehox-ecs-v2`.sys_config c
WHERE c.config_id = 138
  AND c.config_key = 'admin.api.wmsUrl.TaskRequest'
  AND NOT EXISTS (
    SELECT 1 FROM psa_floor1_backup_20261010.ecs_callback b
    WHERE b.config_id = c.config_id
  );

SELECT config_id, config_key, config_value AS before_value
FROM `ehox-ecs-v2`.sys_config
WHERE config_id = 138
  AND config_key = 'admin.api.wmsUrl.TaskRequest';

UPDATE `ehox-ecs-v2`.sys_config
SET config_value = 'http://ehox-wes:8092'
WHERE config_id = 138
  AND config_key = 'admin.api.wmsUrl.TaskRequest'
  AND config_value = 'http://192.168.1.159:8109';
SELECT ROW_COUNT() AS callback_updated_rows;

SELECT config_id, config_key, config_value AS after_value
FROM `ehox-ecs-v2`.sys_config
WHERE config_id = 138
  AND config_key = 'admin.api.wmsUrl.TaskRequest';
COMMIT;

SELECT 'ACTIVE WAREHOUSE TASKS' AS audit;
SELECT id, code, type, status, move_task_status, send_status,
       start_position, end_position
FROM ehox_wms_auto_v1.wms_stock_task
WHERE del_flag = 0 AND status NOT IN (5, 7);

SELECT 'NONTERMINAL WES STEPS' AS audit;
SELECT id, code, task_code, status, storage_floor
FROM ehox_wms_auto_v1.wms_stock_task_step
WHERE del_flag = 0 AND status NOT IN (6, 8);

SELECT 'OTHER LIVE FLOOR REFERENCES' AS audit;
SELECT entrance_id, ware_id, entrance_code, coordinate, station_code,
       floors, status, del_flag
FROM ehox_wms_auto_v1.wms_entrance
WHERE ware_id = 1;

SELECT 'chitu_auto_in' AS table_name, COUNT(*) AS floor_2_rows
FROM `ehox-ecs-v2`.chitu_auto_in WHERE z = 2
UNION ALL
SELECT 'chitu_car_distance', COUNT(*)
FROM `ehox-ecs-v2`.chitu_car_distance WHERE z = 2
UNION ALL
SELECT 'chitu_device_route', COUNT(*)
FROM `ehox-ecs-v2`.chitu_device_route WHERE target_floor = 2
UNION ALL
SELECT 'chitu_device_station', COUNT(*)
FROM `ehox-ecs-v2`.chitu_device_station WHERE station_floor = 2
UNION ALL
SELECT 'chitu_map_node_status', COUNT(*)
FROM `ehox-ecs-v2`.chitu_map_node_status WHERE z = 2
UNION ALL
SELECT 'chitu_map_node_temp', COUNT(*)
FROM `ehox-ecs-v2`.chitu_map_node_temp WHERE z = 2
UNION ALL
SELECT 'chitu_node_reserve', COUNT(*)
FROM `ehox-ecs-v2`.chitu_node_reserve WHERE z = 2;
