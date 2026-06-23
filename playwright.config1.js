const { devices } = require('@playwright/test');
const { trace } = require('node:console');
const { permission } = require('node:process');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  retries:1,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000

  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on'
      }
      },

  {
      name: 'Firefox',
    
      use: {
        browserName:'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video:'retain-on-failure',
        Viewport:{width:720,height:720},
        //...devices['Galaxy S24'],
        ignoreHttpsError:true,
        permission:['geolocation']
      }


    }


  

    



  ]
  

      

  


  
};
module.exports = config
