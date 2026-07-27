FROM node:20-alpine

WORKDIR /app

# Copy only package files first (cache)
COPY package.json package-lock.json ./

RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
