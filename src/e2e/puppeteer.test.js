// jest.setTimeout(30000);
describe('puppeteer', function () {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/first.html');
  });

  it('should detect page name and be able to click buttons', async function () {
    await expect(page).toMatch('First');
    await page.click('#first-btn');
    const content = await page.$('#content');
    const textContent = await page.evaluate(elem => {
      return elem.textContent;
    }, content);
    expect(textContent).toEqual('Hello world');

    // await jestPuppeteer.debug()
    // click iframe button

    const frame = page.frames().find(f => f.name() === 'middle');
    await frame.waitForSelector('#middle-iframe');
    const frameContent = await frame.$('#middle-iframe');
    const text = await frame.evaluate(elem => elem.textContent, frameContent);
    expect(text).toEqual('middle');
  });
});