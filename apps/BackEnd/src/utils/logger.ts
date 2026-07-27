  import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // 🔥 THIS IS REQUIRED FOR DOZZLE
    new winston.transports.Console(),

    // optional file logging
    new winston.transports.File({
      filename: "logs/app.log",
    }),
  ],
});

export default logger;
