const { Builder } = require('selenium-webdriver');
const LoginAction = require('../Action/login.action');
const SharingAction = require('../Action/sharing.screenshot');
const compareScreenshot = require('../../Utilities/visual.regression.helper');
const chrome = require('selenium-webdriver/chrome');

describe('Login Test', function(){
    let driver;
    let loginAction;
    let sharingAction;
    let options = new chrome.Options();
    
    beforeEach(async() =>{
        options.addArguments('--incognito');
        //options.addArguments('--headless');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        loginAction = new LoginAction(driver)
        await loginAction.openWeb('https://www.saucedemo.com/')
        sharingAction = new SharingAction(driver)
        await driver.manage().window().fullscreen()
    })

    afterEach(async() => {
        await driver.quit()
    })

     it('Login with valid credential', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess('Products');

        await sharingAction.fullPageScreenshot('login_success');

        await compareScreenshot(driver, 'success_login')
    });

    it('Login with invalid username', async () => {
        await loginAction.inputUsername('standart_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await sharingAction.fullPageScreenshot('login_failed_invalid_username');

        await compareScreenshot(driver, 'failed_login_invalid_username')
    });

    it('Login with invalid password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secred_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await sharingAction.fullPageScreenshot('login_failed_invalid_password');

        await compareScreenshot(driver, 'failed_login_invalid_username')
    });

    it('Login with empty username', async () => {
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await sharingAction.fullPageScreenshot('login_failed_empty_username');

        await compareScreenshot(driver, 'failed_login_empty_username')
    });

    it('Login with empty password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Password is required');

        await sharingAction.fullPageScreenshot('login_failed_empty_password');
        
        await compareScreenshot(driver, 'failed_login_empty_password')
    });

        it.only('Login with locked user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');

        await sharingAction.fullPageScreenshot('login_failed_locked_user');
        
        await compareScreenshot(driver, 'failed_login_locked_user')
    });
})