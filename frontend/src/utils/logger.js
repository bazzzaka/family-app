const logLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const currentLogLevel = process.env.NODE_ENV === 'production' ? logLevels.INFO : logLevels.DEBUG;

const logger = {
  debug: (...args) => {
    if (currentLogLevel <= logLevels.DEBUG) {
      console.debug('[DEBUG]', ...args);
    }
  },
  
  info: (...args) => {
    if (currentLogLevel <= logLevels.INFO) {
      console.info('[INFO]', ...args);
    }
  },
  
  warn: (...args) => {
    if (currentLogLevel <= logLevels.WARN) {
      console.warn('[WARN]', ...args);
    }
  },
  
  error: (...args) => {
    if (currentLogLevel <= logLevels.ERROR) {
      console.error('[ERROR]', ...args);
    }
  }
};

export default logger; 