var options = {loggerjs: {logfileDirectory:'./test'}},
    skeleton = require('../lib/service-skeleton')(options);


skeleton.logger.setLogLevel(skeleton.logger.LOG);

skeleton.setShutdownHandler(function () {
  console.log('YOU ARE MINE...');
});

var test = 0,
    calls = 0;

skeleton.metrics.addTask('log', function (metrics) {
  calls++;
  console.log('################################################################');
  skeleton.logger.log(metrics);
});

skeleton.metrics.set('persistent-counter');
skeleton.metrics.set('counter');
skeleton.metrics.set('fackeValues', false);

setInterval(function () {
  test++;
  skeleton.metrics.incr('counter');
  skeleton.metrics.incr('persistent-counter');
  skeleton.metrics.incr('fackeValues', test);

  if (test === 5) test = 0;
}, 1000);

skeleton.logger.info('"'+skeleton.probe.name+'" service starting...');
