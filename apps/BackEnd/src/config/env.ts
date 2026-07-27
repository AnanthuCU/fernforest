import "dotenv/config";

export const env = {
  port: process.env.PORT || 3000,
  db: {
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  name: process.env.DB_NAME!,
  poolSize: Number(process.env.DB_POOL_SIZE || 10),
}

};
