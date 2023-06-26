FROM node:18-alpine as base
ENV NODE_ENV=production

WORKDIR /app
COPY .npmrc .
COPY package*.json ./
RUN npm install && npm cache clean --force && rm .npmrc

# DEV
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
COPY ./ .

# BUILD
FROM dev as build
RUN npm run build

# TEST
FROM dev as test
CMD ["npm", "run", "test"]

FROM base as prod
COPY --from=build /app/dist .
CMD ["node", "index.js"]
