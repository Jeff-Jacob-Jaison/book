import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to a good size for screenshots
    await page.setViewport({ width: 1280, height: 800 });

    // Login
    console.log('Navigating to login...');
    await page.goto('http://localhost:8000/login');
    await page.type('#email', 'member@bookvault.com');
    await page.type('#password', 'password');
    await Promise.all([
        page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    console.log('Capturing Dashboard/Collection...');
    // It redirects to dashboard or collection. Let's explicitly go to collection.
    await page.goto('http://localhost:8000/collection', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'diagrams/collection_page.png' });

    console.log('Capturing Preview Modal...');
    // Click on a book image to open preview modal
    // Assuming there's a book image or button that opens the modal. We'll try clicking the first image inside main content.
    const bookCovers = await page.$$('img[alt$="Cover"]');
    if (bookCovers.length > 0) {
        await bookCovers[0].click();
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for modal animation
        await page.screenshot({ path: 'diagrams/preview_modal.png' });

        // close modal if needed
        await page.keyboard.press('Escape');
        await new Promise(resolve => setTimeout(resolve, 500));
    } else {
        console.log('No books found for preview modal capture.');
    }

    console.log('Capturing Wishlist...');
    await page.goto('http://localhost:8000/wishlists', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'diagrams/wishlist_page.png' });

    await browser.close();
    console.log('Done.');
})();
