const { until } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../PageObject/home.page');

class HomeAction {
    constructor(driver) {
        this.driver = driver;
    }

    async sortProduct() {
        await this.driver
            .findElement(HomePage.productSort)
            .click()
    }

    async sortHilo(){
        await this.driver
            .findElement(HomePage.sortHiLo)
            .click()
    }

    async addItem() {
        await this.driver
            .findElement(HomePage.addToCartbutton)
            .click()
    }

    async getAddToCartButton() {
        return await this.driver.findElement(HomePage.addToCartbutton);
    }  

    async removeItem() {
         await this.driver
            .findElement(HomePage.removeFromCartbutton)
            .click()
    }

    async getRemoveFromCartButton() {
        return await this.driver.findElement(HomePage.removeFromCartbutton);
    }  
}

module.exports = HomeAction;