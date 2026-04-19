const { Builder, By, until, Select} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome')

describe('Saucedemo Automation Test', function(){
    let driver;
    let options = new chrome.Options();

    it('Open Saucedemo page and verify the title', async function () {
        options.addArguments('--incognito');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com/')
        await driver.manage().window().fullscreen()

        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let loginButton = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await loginButton.click()

        await driver.wait(until.elementLocated(By.className('app_logo')), 50000)
        let appLogo = await driver.findElement(By.className('app_logo'))

        await appLogo.isDisplayed()
        await driver.takeScreenshot()
    
        await driver.quit()
    });

        it('Open Saucedemo page and sort the product', async function () {
        options.addArguments('--incognito');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com/')
        await driver.manage().window().fullscreen()

        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let loginButton = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await loginButton.click()

        await driver.wait(until.elementLocated(By.xpath('//*[@data-test="product-sort-container"]')), 50000)
        let productSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'))
        await productSort.isDisplayed()
        
        await productSort.click()
        await productSort.findElement(By.css("option[value='za']")).click()
        await driver.takeScreenshot()

        await driver.quit()
    });
});