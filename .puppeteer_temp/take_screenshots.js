const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log('Visiting collection page...');
    await page.goto('http://127.0.0.1:8000/collection', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '../BookVault_FSD_Report/collection.png' });

    console.log('Visiting login page...');
    await page.goto('http://127.0.0.1:8000/login', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '../BookVault_FSD_Report/dashboard.png' });

    await browser.close();
    console.log('Screenshots captured successfully.');
})();
