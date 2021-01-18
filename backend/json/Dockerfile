# inspired by: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

USER node

CMD ["dumb-init", "node", "server.js"]