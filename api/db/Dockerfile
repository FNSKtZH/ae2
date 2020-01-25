FROM postgres:alpine
COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./ae.backup /sik_data/ae.backup