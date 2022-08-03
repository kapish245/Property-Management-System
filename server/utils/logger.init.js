const {format,createLogger,transports} = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('dotenv').config()
const options = {
  file: {
    filename: process.env.LOGFILE_PATH,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  format: combine(
    label({ label: 'PMS' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
      logger.info(message);
  }
};

module.exports = logger