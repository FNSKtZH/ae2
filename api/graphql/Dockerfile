FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

RUN npm install -g postgraphile
RUN npm install -g postgraphile-plugin-connection-filter
RUN npm install -g @graphile-contrib/pg-order-by-related

COPY .postgraphilerc.js .postgraphilerc.js

EXPOSE 5000
#ENTRYPOINT ["postgraphile", "-n", "db"]
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]