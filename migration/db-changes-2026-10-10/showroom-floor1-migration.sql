-- Run only while WMS, WES and ECS are stopped and the shuttle is isolated.
-- Backups preserve complete rows; historical tasks and other warehouses stay unchanged.
USE psa_floor1_backup_20261010;
CREATE TABLE IF NOT EXISTS showroom_storage LIKE ehox_wms_auto_v1.wms_ware_storage;
CREATE TABLE IF NOT EXISTS showroom_stock LIKE ehox_wms_auto_v1.wms_stock;
CREATE TABLE IF NOT EXISTS showroom_relations LIKE ehox_wms_auto_v1.wms_stock_relation;
CREATE TABLE IF NOT EXISTS showroom_nodes LIKE `ehox-ecs-v2`.chitu_map_node;
CREATE TABLE IF NOT EXISTS showroom_map_config LIKE `ehox-ecs-v2`.sys_config;
CREATE TABLE IF NOT EXISTS showroom_distances LIKE `ehox-ecs-v2`.chitu_car_distance;

DROP PROCEDURE IF EXISTS migrate_showroom_floor1;
DELIMITER //
CREATE PROCEDURE migrate_showroom_floor1()
BEGIN
    DECLARE n INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    SELECT COUNT(*) INTO n FROM showroom_storage;
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Migration backup already exists; do not rerun without review';
    END IF;

    SELECT COUNT(*) INTO n FROM ehox_wms_auto_v1.wms_stock_task
    WHERE del_flag = 0 AND status NOT IN (5, 7);
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Active WMS tasks remain; map unchanged';
    END IF;
    SELECT COUNT(*) INTO n FROM ehox_wms_auto_v1.wms_stock_task_step
    WHERE del_flag = 0 AND status NOT IN (6, 8);
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Active WES steps remain; map unchanged';
    END IF;
    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.chitu_task
    WHERE task_status NOT IN ('3', '5');
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nonterminal ECS tasks remain; map unchanged';
    END IF;

    SELECT COUNT(*) INTO n FROM ehox_wms_auto_v1.wms_ware_storage
    WHERE ware_id = 1 AND del_flag = 0;
    IF n <> 24 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected showroom storage count';
    END IF;
    SELECT COUNT(*) INTO n FROM ehox_wms_auto_v1.wms_ware_storage
    WHERE ware_id = 1 AND del_flag = 0
      AND ((id BETWEEN 25 AND 36 AND storage_floor = 1 AND status = 20)
        OR (id BETWEEN 37 AND 48 AND storage_floor = 2))
      AND storage_row BETWEEN 1 AND 3 AND storage_col BETWEEN 1 AND 4
      AND code = CONCAT(storage_row, '-', storage_col, '-', storage_floor)
      AND name = code;
    IF n <> 24 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Showroom layout differs from audited layout';
    END IF;
    SELECT COUNT(*) INTO n
    FROM ehox_wms_auto_v1.wms_ware_storage s
    JOIN ehox_wms_auto_v1.wms_ware_storage t
      ON t.ware_id = s.ware_id AND t.storage_row = s.storage_row
     AND t.storage_col = s.storage_col AND t.storage_floor = 1 AND t.del_flag = 0
    WHERE s.ware_id = 1 AND s.storage_floor = 2 AND s.del_flag = 0;
    IF n <> 12 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Floor layouts do not match one-to-one';
    END IF;
    SELECT
      (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_stock WHERE storage_id BETWEEN 25 AND 36)
      + (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_stock_relation WHERE storage_id BETWEEN 25 AND 36)
      + (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_out_pallet WHERE storage_id BETWEEN 25 AND 48)
      + (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_out_pallet_item WHERE storage_id BETWEEN 25 AND 48)
      + (SELECT COUNT(*) FROM ehox_wms_auto_v1.wms_stock_check_item WHERE storage_id BETWEEN 25 AND 48)
    INTO n;
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Additional storage references require review';
    END IF;

    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.chitu_map_node;
    IF n <> 24 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected ECS map size; map unchanged';
    END IF;
    SELECT COUNT(*) INTO n
    FROM `ehox-ecs-v2`.chitu_map_node e
    JOIN ehox_wms_auto_v1.wms_ware_storage s ON s.id = e.id
    WHERE s.ware_id = 1 AND e.x = s.storage_row AND e.y = s.storage_col
      AND e.z = s.storage_floor AND e.node_code = CONCAT('C-', s.code)
      AND (e.id BETWEEN 37 AND 48
           OR (e.id BETWEEN 25 AND 36 AND e.node_type = 'B05'
               AND e.node_status = '0' AND COALESCE(e.pallet_code, '') = ''));
    IF n <> 24 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ECS map differs from audited layout';
    END IF;
    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.chitu_car_distance
    WHERE z = 2 AND x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4;
    IF n <> 15 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Verified floor-2 calibration count changed';
    END IF;
    SELECT COUNT(*) INTO n FROM (
        SELECT x, y, orb_state
        FROM `ehox-ecs-v2`.chitu_car_distance
        WHERE z = 2 AND x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4
        GROUP BY x, y, orb_state HAVING COUNT(*) <> 1
    ) duplicate_distances;
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ambiguous floor-2 calibration; map unchanged';
    END IF;
    SELECT COUNT(*) INTO n
    FROM `ehox-ecs-v2`.chitu_car_distance f1
    LEFT JOIN `ehox-ecs-v2`.chitu_car_distance f2
      ON f2.x = f1.x AND f2.y = f1.y AND f2.orb_state = f1.orb_state AND f2.z = 2
    WHERE f1.z = 1 AND f1.x BETWEEN 1 AND 3 AND f1.y BETWEEN 1 AND 4
      AND f2.id IS NULL;
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Floor-1 calibration without verified replacement';
    END IF;
    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.chitu_node_reserve WHERE z = 2;
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Floor-2 reservations remain; map unchanged';
    END IF;
    SELECT COUNT(*) INTO n FROM ehox_wms_auto_v1.wms_entrance
    WHERE ware_id = 1 AND del_flag = '0';
    IF n <> 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Active entrance configuration needs review';
    END IF;
    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.sys_config
    WHERE config_id = 102 AND config_key = 'business.map.manage.control'
      AND JSON_VALID(config_value)
      AND JSON_EXTRACT(config_value, '$.max_z') = 2;
    IF n <> 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected ECS live map configuration';
    END IF;

    INSERT INTO showroom_storage SELECT * FROM ehox_wms_auto_v1.wms_ware_storage WHERE ware_id = 1;
    INSERT INTO showroom_stock SELECT * FROM ehox_wms_auto_v1.wms_stock WHERE ware_id = 1;
    INSERT INTO showroom_relations SELECT * FROM ehox_wms_auto_v1.wms_stock_relation WHERE ware_id = 1;
    INSERT INTO showroom_nodes SELECT * FROM `ehox-ecs-v2`.chitu_map_node;
    INSERT INTO showroom_map_config SELECT * FROM `ehox-ecs-v2`.sys_config WHERE config_id = 102;
    INSERT INTO showroom_distances SELECT * FROM `ehox-ecs-v2`.chitu_car_distance;

    DELETE FROM `ehox-ecs-v2`.chitu_car_distance
    WHERE z = 1 AND x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4;
    UPDATE `ehox-ecs-v2`.chitu_car_distance
    SET z = 1
    WHERE z = 2 AND x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4;

    UPDATE ehox_wms_auto_v1.wms_ware_storage
    SET del_flag = 1
    WHERE ware_id = 1 AND id BETWEEN 25 AND 36 AND storage_floor = 1;
    UPDATE ehox_wms_auto_v1.wms_ware_storage
    SET storage_floor = 1,
        code = CONCAT(storage_row, '-', storage_col, '-1'),
        name = CONCAT(storage_row, '-', storage_col, '-1'),
        roadway = CASE WHEN RIGHT(roadway, 2) = '-2'
                       THEN CONCAT(LEFT(roadway, CHAR_LENGTH(roadway) - 1), '1')
                       ELSE roadway END
    WHERE ware_id = 1 AND id BETWEEN 37 AND 48 AND storage_floor = 2;

    UPDATE ehox_wms_auto_v1.wms_stock r
    JOIN ehox_wms_auto_v1.wms_ware_storage s ON s.id = r.storage_id AND s.ware_id = r.ware_id
    SET r.storage_code = s.code, r.storage_floor = s.storage_floor
    WHERE r.ware_id = 1 AND r.del_flag = 0 AND s.id BETWEEN 37 AND 48;
    UPDATE ehox_wms_auto_v1.wms_stock_relation r
    JOIN ehox_wms_auto_v1.wms_ware_storage s ON s.id = r.storage_id AND s.ware_id = r.ware_id
    SET r.storage_code = s.code, r.storage_floor = s.storage_floor
    WHERE r.ware_id = 1 AND r.del_flag = 0 AND s.id BETWEEN 37 AND 48;

    DELETE FROM `ehox-ecs-v2`.chitu_map_node WHERE id BETWEEN 25 AND 36 AND z = 1;
    UPDATE `ehox-ecs-v2`.chitu_map_node
    SET z = 1, node_code = CONCAT('C-', x, '-', y, '-1')
    WHERE id BETWEEN 37 AND 48 AND z = 2;
    UPDATE `ehox-ecs-v2`.sys_config
    SET config_value = JSON_SET(config_value, '$.max_z', 1)
    WHERE config_id = 102 AND config_key = 'business.map.manage.control';

    SELECT COUNT(*) INTO n FROM ehox_wms_auto_v1.wms_ware_storage
    WHERE ware_id = 1 AND del_flag = 0 AND storage_floor = 1 AND id BETWEEN 37 AND 48;
    IF n <> 12 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Warehouse verification failed; rolled back';
    END IF;
    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.chitu_map_node e
    JOIN showroom_nodes b ON b.id = e.id
    WHERE e.z = 1 AND e.node_code = CONCAT('C-', e.x, '-', e.y, '-1')
      AND e.x <=> b.x AND e.y <=> b.y AND e.node_type <=> b.node_type
      AND e.node_status <=> b.node_status AND e.pallet_code <=> b.pallet_code
      AND e.up <=> b.up AND e.down <=> b.down
      AND e.left_d <=> b.left_d AND e.right_d <=> b.right_d
      AND e.x_fd_count <=> b.x_fd_count AND e.x_nd_count <=> b.x_nd_count
      AND e.y_fd_count <=> b.y_fd_count AND e.y_nd_count <=> b.y_nd_count
      AND e.y_fd_master <=> b.y_fd_master AND e.y_nd_master <=> b.y_nd_master;
    IF n <> 12 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ECS tag-data verification failed; rolled back';
    END IF;
    SELECT COUNT(*) INTO n
    FROM `ehox-ecs-v2`.chitu_car_distance d
    JOIN showroom_distances b ON b.id = d.id
    WHERE b.z = 2 AND b.x BETWEEN 1 AND 3 AND b.y BETWEEN 1 AND 4
      AND d.z = 1 AND d.x <=> b.x AND d.y <=> b.y
      AND d.orb_state <=> b.orb_state AND d.car_code <=> b.car_code
      AND d.distance <=> b.distance;
    IF n <> 15 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Calibration preservation failed; rolled back';
    END IF;
    SELECT COUNT(*) INTO n FROM `ehox-ecs-v2`.chitu_car_distance
    WHERE z = 1 AND x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4;
    IF n <> 15 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unexpected calibration after migration; rolled back';
    END IF;
    COMMIT;
    SELECT 'COMMITTED: showroom is Floor 1; tag data preserved' AS result;
END//
DELIMITER ;
CALL migrate_showroom_floor1();
DROP PROCEDURE migrate_showroom_floor1;

SELECT id, code, storage_row, storage_col, storage_floor, status
FROM ehox_wms_auto_v1.wms_ware_storage
WHERE ware_id = 1 AND del_flag = 0 ORDER BY id;
SELECT id, node_code, x, y, z, node_type, pallet_code
FROM `ehox-ecs-v2`.chitu_map_node ORDER BY id;
SELECT id, storage_id, storage_code, storage_floor, pallet_code
FROM ehox_wms_auto_v1.wms_stock WHERE ware_id = 1 AND del_flag = 0;
SELECT id, car_code, orb_state, x, y, z, distance
FROM `ehox-ecs-v2`.chitu_car_distance
WHERE x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4 ORDER BY z, x, y, orb_state;
