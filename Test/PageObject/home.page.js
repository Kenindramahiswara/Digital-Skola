const { By } = require('selenium-webdriver');

class HomePage {

    static productSort = By.xpath('//*[@data-test="product-sort-container"]');
    static sortHiLo = By.css('option[value="hilo"]')
    static addToCartbutton = By.id('add-to-cart-sauce-labs-backpack')
    static removeFromCartbutton = By.id('remove-sauce-labs-backpack')
}

module.exports = HomePage;