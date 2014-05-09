# [node-service-skeleton](https://github.com/luscus/node-service-skeleton)

The 'service-skeleton' gives any Node service some basic functionalities such as: logging, metrics and probing.

This package wraps following projects:
* [loggerjs](https://github.com/luscus/node-LoggerJS)
* [service-metrics](https://github.com/luscus/node-service-metrics)
* [service-probe](https://github.com/luscus/node-service-probe)

Take a look to the [TODO](https://github.com/luscus/node-service-skeleton/blob/master/TODO.md) if you want to help towards the next steps.

## Installation

### Node Dependencies

Add following line to your project dependencies

    "service-skeleton": "0.0.x",

then hit

    npm install

### Require module

    var options = {
      loggerjs: {
        logLevel: 'INFO',
        logfileDirectory : 'path_to_dir'
        /*... something ...*/
      },
      metrics: {
        disable_cpu_metrics: false
        /*... something ...*/
      },
    },
    skeleton = require('service-skeleton')(options);

    // Log service start
    skeleton.logger.info('"'+skeleton.probe.name+'" service starting...');

The options object holds option groups for the wrapped packages

####List of available options

* [LoggerJS options](https://github.com/luscus/LoggerJS/blob/master/README.md#instanciate)
* [Service-Metrics options](https://github.com/luscus/node-service-metrics#configure)

## Usage

### skeleton.logger

Singleton returned by the package [loggerjs](https://github.com/luscus/node-LoggerJS).

### skeleton.metrics

Singleton returned by the package [service-metrics](https://github.com/luscus/node-service-metrics).

### skeleton.probe

JSON object generated by the [service-probe](https://github.com/luscus/node-service-probe) package.