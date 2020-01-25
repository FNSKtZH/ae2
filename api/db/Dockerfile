FROM postgres:alpine
COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./ae.backup /sik_data/ae.backup
RUN chmod +x /docker-entrypoint-initdb.d/02_restore.sh