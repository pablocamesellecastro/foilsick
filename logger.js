import winston from "winston";
const { combine, timestamp, json, printf } = winston.format;

// Formato personalizado
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
    level: "info", // "warn", "error"
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        new winston.transports.File({
            filename: "app.log",
            // maxsize: 5242880, // 5MB
        }),
    ],
});

export { logger };