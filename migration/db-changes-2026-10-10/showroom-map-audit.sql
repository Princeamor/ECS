SELECT 'READ-ONLY SHOWROOM MAP AUDIT' AS audit;

SHOW CREATE TABLE ehox_wms_auto_v1.wms_ware_storage;
SHOW CREATE TABLE `ehox-ecs-v2`.chitu_map_node;

SELECT id, ware_id, code, name, storage_row, storage_col,
       storage_floor, status, del_flag
FROM ehox_wms_auto_v1.wms_ware_storage
WHERE ware_id = 1
ORDER BY storage_floor, storage_row, storage_col, id;

SELECT s.id, s.code, s.storage_floor,
       (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_stock r
        WHERE r.storage_id = s.id) AS stock_references,
       (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_stock_relation r
        WHERE r.storage_id = s.id) AS relation_references,
       (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_out_pallet r
        WHERE r.storage_id = s.id) AS out_pallet_references
FROM ehox_wms_auto_v1.wms_ware_storage s
WHERE s.ware_id = 1
ORDER BY s.id;

SELECT r.relation_id, r.ware_id, r.storage_id, r.storage_code,
       r.storage_row, r.storage_col, r.storage_floor,
       r.pallet_id, r.pallet_code, r.status, r.del_flag
FROM ehox_wms_auto_v1.wms_stock_relation r
WHERE r.ware_id = 1;

SELECT id, code, status, move_task_status, send_status,
       start_position, end_position
FROM ehox_wms_auto_v1.wms_stock_task
WHERE ware_id = 1
ORDER BY id DESC
LIMIT 5;

SELECT id, code, task_code, status, storage_floor,
       start_position, end_position
FROM ehox_wms_auto_v1.wms_stock_task_step
WHERE task_code = 'MOV20261010000004'
ORDER BY id;

SELECT id, node_code, node_type, x, y, z, node_status,
       up, down, left_d, right_d, pallet_code, map_area
FROM `ehox-ecs-v2`.chitu_map_node
ORDER BY z, x, y, id;

SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'ehox-ecs-v2'
  AND (COLUMN_NAME LIKE '%floor%'
       OR COLUMN_NAME IN ('z', 'node_code', 'map_id', 'map_code'))
ORDER BY TABLE_NAME, ORDINAL_POSITION;

SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'ehox_wms_auto_v1'
  AND TABLE_NAME IN ('wms_stock', 'wms_entrance', 'wms_ware_storage')
ORDER BY TABLE_NAME, ORDINAL_POSITION;
