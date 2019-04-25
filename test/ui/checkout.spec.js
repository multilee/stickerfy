require('chromedriver');
const assert = require('assert');
const {Builder, By} = require('selenium-webdriver');

describe('Checkout workflow', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('adds a sticker to the cart and checks out', async function() {
    await driver.get('http://localhost:3000');
    // Find element by href
    await driver.findElement(By.xpath(".//a[@href='/add-to-cart/5cc21bc9b4174270e8e88f29']")).click(); //by tag a with certain href
    await driver.findElement(By.xpath(".//a[@href='/add-to-cart/5cc21bc9b4174270e8e88f2a']")).click();
    await driver.findElement(By.xpath(".//a[@href='/add-to-cart/5cc21bc9b4174270e8e88f28']")).click();
    await driver.findElement(By.id('cart')).click();
    await driver.findElement(By.id('checkout')).click();

    let total = await driver.findElement(By.id('total'));
    assert.equal(await total.getText(), 'Total: $17');
    });
    after(() => driver && driver.quit());
});
