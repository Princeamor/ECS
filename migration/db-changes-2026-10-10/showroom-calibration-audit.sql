SELECT 'READ-ONLY CALIBRATION AUDIT; KEEP BACKENDS STOPPED' AS audit;

SELECT id, car_code, orb_state, x, y, z, distance
FROM `ehox-ecs-v2`.chitu_car_distance
WHERE car_code = 'A1-1'
   OR (x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4)
ORDER BY z, x, y, orb_state, car_code, id;

SELECT x, y, z, orb_state, COUNT(*) AS matching_rows,
       GROUP_CONCAT(CONCAT(id, ':', COALESCE(car_code, 'NULL'), ':',
                           COALESCE(distance, 'NULL')) ORDER BY id) AS entries
FROM `ehox-ecs-v2`.chitu_car_distance
WHERE x BETWEEN 1 AND 3 AND y BETWEEN 1 AND 4
GROUP BY x, y, z, orb_state
HAVING COUNT(*) > 1;

SELECT f2.id AS floor2_id, f2.car_code AS floor2_car,
       f2.orb_state, f2.x, f2.y, f2.distance AS floor2_distance,
       f1.id AS floor1_id, f1.car_code AS floor1_car,
       f1.distance AS floor1_distance
FROM `ehox-ecs-v2`.chitu_car_distance f2
LEFT JOIN `ehox-ecs-v2`.chitu_car_distance f1
  ON f1.x = f2.x AND f1.y = f2.y
 AND f1.orb_state = f2.orb_state AND f1.z = 1
WHERE f2.z = 2 AND f2.x BETWEEN 1 AND 3 AND f2.y BETWEEN 1 AND 4
ORDER BY f2.id, f1.id;

SELECT 'BACKUP CHECK' AS audit;
SELECT COUNT(*) AS backed_up_storage_rows
FROM psa_floor1_backup_20261010.showroom_storage;
SELECT storage_floor, del_flag, COUNT(*) AS storage_rows
FROM ehox_wms_auto_v1.wms_ware_storage
WHERE ware_id = 1
GROUP BY storage_floor, del_flag;
SELECT z, COUNT(*) AS ecs_nodes
FROM `ehox-ecs-v2`.chitu_map_node GROUP BY z;
