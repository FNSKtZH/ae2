#!/bin/bash
set -e

until PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

POSTGRES="psql --username ${POSTGRES_USER}"
echo "restoring database"
pg_restore --host db --port 5432 --username postgres --no-password --dbname ae --verbose "/sik_data/ae.backup"
echo "database was restored"