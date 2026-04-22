const { Builder, By, until, Select} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome')

describe('Saucedemo Automation Test', function(){
    let driver;
    let options = new chrome.Options();
    let userName = 'standard_user'
    let password = 'secret_sauce'

    beforeEach(async() =>{
        options.addArguments('--incognito');
        //options.addArguments('--headless');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com/')
        await driver.manage().window().fullscreen()
    })

    afterEach(async() => {
        await driver.quit()
    })

    it('Open Saucedemo page and verify the title', async function () {
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let loginButton = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys(userName)
        await inputPassword.sendKeys(password)
        await loginButton.click()

        await driver.wait(until.elementLocated(By.className('app_logo')), 50000)
        let appLogo = await driver.findElement(By.className('app_logo'))

        await appLogo.isDisplayed()
        await driver.takeScreenshot()
    });

        it('Open Saucedemo page and sort the product', async function () {
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let loginButton = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys(userName)
        await inputPassword.sendKeys(password)
        await loginButton.click()

        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="product-sort-container"]')), 50000)
        let productSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'))
        await productSort.isDisplayed()
        
        await productSort.click()
        await productSort.findElement(By.css("option[value='hilo']")).click()

        await driver.takeScreenshot()
    });

    it('Add item into Cart', async function () {
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let loginButton = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys(userName)
        await inputPassword.sendKeys(password)
        await loginButton.click()

        let addToCartbutton = await driver.findElement(By.xpath('//*[@id="add-to-cart-sauce-labs-backpack"]'))
        await addToCartbutton.click()

        let shoppingCart = await driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]'))
        await shoppingCart.click()

        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="inventory-item-name"]')), 50000)
        let itemName = await driver.findElement(By.xpath('//*[@data-test="inventory-item-name"]'))

        await itemName.isDisplayed()
        await driver.takeScreenshot()
    });
});