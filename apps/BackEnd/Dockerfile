FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

# Run database migrations before launching the server
CMD ["sh", "-c", "node src/migrate.js && node server.js"]
