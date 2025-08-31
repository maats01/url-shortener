import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true }
});

export const logger = pino({
  level: 'info',
}, transport);