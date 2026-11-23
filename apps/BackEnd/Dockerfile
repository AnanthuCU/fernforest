# Build from the repo root (the npm workspace lockfile lives there):
#   docker build -f apps/BackEnd/Dockerfile .
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/BackEnd/package.json apps/BackEnd/
COPY libs/shared-types/package.json libs/shared-types/

RUN npm ci --omit=dev --workspace fernforest-backend --include-workspace-root=false

COPY apps/BackEnd apps/BackEnd

WORKDIR /app/apps/BackEnd

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

# Run database migrations before launching the server
CMD ["sh", "-c", "node src/utils/migrate.js && node server.js"]
