
var LoggerJS,
    metrics,
    probe,
    logger;

var onShutdown = function () {
  console.log('onShutdown() called...');
};

module.exports = function (options) {

  if (!options) {
    options = {};
  }

  if (!options.loggerjs) {
    options.loggerjs = {};
  }

  if (!options.metrics) {
    options.metrics = {};
  }

  LoggerJS = require('loggerjs');
  metrics = require('service-metrics')(options.metrics);
  probe = require('service-probe');


  // force the logger namespace to be the service name
  options.loggerjs.namespace = probe.name;

  logger = new LoggerJS.Logger(options.loggerjs);

  // Check for Logfile option
  if (options.loggerjs.logfileDirectory) {
    logger.useLogfile(options.loggerjs.logfileDirectory + '/' + probe.name + '.log');
  }

  // Handle unexpected errors
  var taskOptions = {
        name: 'UncaughtException',
        status: true,
        logLevel : LoggerJS.ERROR,
        task: function (logEntry) {
          process.exit();
        }
      },
      task = new LoggerJS.LogTask(taskOptions);

  logger.registerLogTask(task);

  return {
    logger: logger,
    metrics: metrics,
    probe: probe,
    getShutdownHandler: function () {
      return onShutdown;
    },
    setShutdownHandler: function (task) {
      if (typeof task === 'function') {
        onShutdown = task;
      }
    }
  };
};



/**
* Global Kill listener.
*/
process.on('SIGINT', function () {
  logger.info('"'+probe.name+'" process KILLED !!!');

  process.exit();
});

/**
* Global shutdown listener.
*/
process.on('exit', function(code) {
  onShutdown();
  logger.info('"'+probe.name+'" service shuting down...');
});
