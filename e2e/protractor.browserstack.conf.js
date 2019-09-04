// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

let browserstack = require('browserstack-local');
let browserstackUser = process.env.BROWSERSTACK_USERNAME;
let browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  multiCapabilities: [
    {
      'browserName': 'chrome',
      'os': 'Windows',
      'browserstack.local': true,
      'browserstack.user': browserstackUser,
      'browserstack.key': browserstackKey
    }
  ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  // Code to start browserstack local before start of test
  beforeLaunch: function () {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': browserstackKey}, function (error) {
        if (error) return reject(error);
        console.log('Connected to browserstack. Now testing...');
        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function () {
    return new Promise(function (resolve, reject) {
      console.log('Stopping browserstack-local connection');
      exports.bs_local.stop();
      resolve();
    });
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    jasmine.getEnv().addReporter(new (require('jasmine-reporters').JUnitXmlReporter)({
      filePrefix: 'e2e-tests',
      savePath: 'reports',
      package: 'e2e',
      modifySuiteName: function (generatedSuiteName) {
        return 'e2e.' + generatedSuiteName.replace(/\./g, '#');
      }
    }));
  }
};