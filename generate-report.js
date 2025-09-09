import reporter from 'multiple-cucumber-html-reporter';

reporter.generate({
  jsonDir: 'reports',       
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '100',
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10',
    },
  },
});
