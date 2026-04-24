const { Builder } = require('selenium-webdriver');
const LoginAction = require('../Action/login.action');
const HomeAction = require ('../Action/home.page.action')
const SharingAction = require('../Action/sharing.screenshot');
const compareScreenshot = require('../../Utilities/visual.regression.helper');
const chrome = require('selenium-webdriver/chrome');

describe('Home Page Test', function(){
    let driver;
    let loginAction;
    let sharingAction;
    let homeAction;
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
        homeAction = new HomeAction(driver)
        await driver.manage().window().fullscreen()
    })

    afterEach(async() => {
        await driver.quit()
    })

    it('Sort Product High to Low', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await homeAction.sortProduct();
        await homeAction.sortHilo();
        
        await sharingAction.fullPageScreenshot('Sort Success');

        await compareScreenshot(driver, 'Success_sorting')
    });

    
    it('Add item into Cart', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await homeAction.addItem();

        const removeButton = await homeAction.getRemoveFromCartButton();
        await removeButton.isDisplayed();
        
        await sharingAction.fullPageScreenshot('Add item success');

        await compareScreenshot(driver, 'Success_add_item')
    });

    it('Remove item from Cart', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await homeAction.addItem();
        await homeAction.removeItem();

        const addButton = await homeAction.getAddToCartButton();
        await addButton.isDisplayed();
        
        await sharingAction.fullPageScreenshot('Remove item success');

        await compareScreenshot(driver, 'Success_Remove_item')
    });
})