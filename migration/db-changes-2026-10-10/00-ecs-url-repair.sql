-- Record of the ECS_URL repair run by the operator on 2026-10-10 (before the
-- scripts in this folder). Run with MYSQL_PWD taken from the container's own
-- environment; no credential is stored here.
--
--   sudo docker exec -i mysql sh -c \
--     'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; exec mysql -uroot ehox_wms_auto_v1' < 00-ecs-url-repair.sql
--
-- Applied once. Result: updated_rows = 1. Do not rerun; the guard below only
-- matches the old value, so a rerun changes nothing.

SELECT id, code, value FROM sys_param WHERE code = 'ECS_URL';

START TRANSACTION;
UPDATE sys_param
SET value = 'http://ehox-ecs:8060'
WHERE id = 10
  AND code = 'ECS_URL'
  AND value = 'http://192.168.1.159:8060';
SELECT ROW_COUNT() AS updated_rows;
SELECT id, code, value FROM sys_param WHERE code = 'ECS_URL';
COMMIT;
