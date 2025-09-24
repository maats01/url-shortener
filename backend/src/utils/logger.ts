import pino from 'pino';

const transport = process.env.NODE_ENV !== 'production' 
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    }
  : undefined;

const logger = pino({
  level: 'info',
  transport,
});

export { logger };