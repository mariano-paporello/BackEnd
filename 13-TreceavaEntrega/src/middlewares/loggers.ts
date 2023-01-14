import winston from "winston"
import { logged } from "../services/server";

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
    format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    colorize(),
    printf((info) => `${info.level}|${[info.timestamp]}|${info.message}`)
    ),
  transports: [
    new transports.Console({ level: 'info' }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: './logs/warn.log',
      level: "warn"
  }),
],})
 

   
    



