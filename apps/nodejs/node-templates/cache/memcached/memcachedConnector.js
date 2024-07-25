const Memcached = require('memcached');
const middleare = require('../../middlewares/utils');
const config = require('../../config');

const host = config.MEMCACHED.MEMCACHED_HOST;
const port = config.MEMCACHED.MEMCACHED_PORT;

const memcached = new Memcached(`${host}:${port}`);

memcached.on('failure', function (details) {
  console.log("Memcached failure:", details);
});

memcached.on('reconnecting', function (details) {
  console.log("Reconnecting to Memcached:", details);
});

memcached.on('reconnected', function (details) {
  console.log("Reconnected to Memcached:", details);
});


(async () => {
  try {
    // Check connection by setting a test key
    const testKey = 'test_key';
    const testValue = 'test_value';
    memcached.set(testKey, testValue, 10, function (err) {
      if (err) {
        const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
        const nconnected = `- ${middleare.colorMiddleware.red}Not Connected to ${middleare.colorMiddleware.yellow}'Memcached'`
        const loc = `at ${colorMiddleware.green}${host}:${port} ${middleare.colorMiddleware.reset}`
        console.log(time, nconnected, loc);
      }
      const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
      const connected = `- ${middleare.colorMiddleware.cyan}Connected to ${middleare.colorMiddleware.yellow}'Memcached'`
      const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`
      const loc = `at ${colorMiddleware.green}${host}:${port} ${middleare.colorMiddleware.reset}`
      console.log(time, connected, succ, loc);
    });
  } catch (error) {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected to ${middleare.colorMiddleware.yellow}'Memcached'`
    const loc = `at ${colorMiddleware.green}${host}:${port} ${middleare.colorMiddleware.reset}`
    console.log(time, nconnected, loc);
  }
})();

module.exports = memcached;
