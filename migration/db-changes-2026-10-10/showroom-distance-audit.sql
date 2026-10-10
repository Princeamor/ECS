SHOW CREATE TABLE `ehox-ecs-v2`.chitu_car_distance;
SELECT * FROM `ehox-ecs-v2`.chitu_car_distance LIMIT 8;
SELECT z, COUNT(*) AS distance_rows
FROM `ehox-ecs-v2`.chitu_car_distance
GROUP BY z;

SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'ehox-ecs-v2'
  AND TABLE_NAME IN ('chitu_car_distance', 'chitu_task',
                    'chitu_map_node_status', 'chitu_map_node_video')
ORDER BY TABLE_NAME, ORDINAL_POSITION;

SELECT config_id, config_key, config_value
FROM `ehox-ecs-v2`.sys_config
WHERE LOWER(config_key) LIKE '%floor%'
   OR LOWER(config_key) LIKE '%map%'
   OR LOWER(config_key) LIKE '%layer%';
