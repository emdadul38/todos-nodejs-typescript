require('express-async-errors');
const config_field = require("../../config");


console.log(config_field);
const winston = require('winston');
const morgan = require('morgan');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

const logger = createLogger({
    level: config_field.logging.level,
    format: combine(
      // timestamp(),
      colorize(),
      prettyPrint(),
    ),

    transports: [
        new winston.transports.File({ filename: './logger/logfile.log' }),
    ],

    exceptionHandlers: [
        new transports.File({ filename: './logger/uncaught_exception.log' }),
    ],
});

logger.morgan = morgan('tiny', {
    stream: {
        write: function(message: any) {
            logger.info(message);
        },
    },
});

if (config_field.is_debug) {
    logger.add(new transports.Console({
        format: winston.format.simple(),
        handleExceptions: true,
    }));
}

// process.on('unhandledRejection', (ex) => {
//     console.log(ex);

//     throw ex;
// });

module.exports = logger;