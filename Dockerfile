# Stage 1: Set up the workspace and install dependencies
FROM node:22-alpine as workspace
WORKDIR /srv/app

COPY package*.json ./
RUN npm ci

# Stage 2: Build the app
FROM workspace AS workspace-build
WORKDIR /srv/app

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build

# Stage 3: Prune development dependencies

FROM workspace AS workspace-pruned
WORKDIR /srv/app

RUN npm prune --production

# Stage 4: Assemble the final production image
FROM node:22-alpine
WORKDIR /srv/app

COPY --from=workspace-pruned /srv/app/node_modules ./node_modules
COPY --from=workspace-build /srv/app/tsconfig*.json ./
COPY --from=workspace-build /srv/app/package*.json ./
COPY --from=workspace-build /srv/app/dist ./dist

ARG CAPROVER_GIT_COMMIT_SHA=${CAPROVER_GIT_COMMIT_SHA}
ENV VERSION=${CAPROVER_GIT_COMMIT_SHA}
ENV NODE_ENV production

USER 1000
CMD ["node", "dist/index.js"]
