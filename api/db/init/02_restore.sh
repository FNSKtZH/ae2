#!/bin/bash
set -e

# need to wait until db is accessible
# hm. why never?
echo "connecting to database ${POSTGRES_DB} with username ${POSTGRES_USER}"
until psql --host=db --port=5432 --username="${POSTGRES_USER}" --command='\q'; do
  >&2 echo "Postgres is unavailable - waiting before restoring"
  sleep 5
done

POSTGRES="psql --username ${POSTGRES_USER}"
echo "restoring database"
pg_restore --host db --port 5432 --username "${POSTGRES_USER}" --no-password --dbname "${POSTGRES_DB}" --verbose "/sik_data/ae.backup"
echo "database was restored"