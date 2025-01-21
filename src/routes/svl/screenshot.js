// https://pptr.dev/guides/screenshots
const {Router} = require('express');
const puppeteer = require('puppeteer');

const router = Router();

router.get('/screenshot', async (req, res) => {
  const { url, selector } = req.query;

  if (!url || !selector) {
    return res.status(400).send('URL and selector are required');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const element = await page.waitForSelector(selector);
    if (!element) {
      await browser.close();
      return res.status(400).send('Element not found');
    }

    const screenshotBuffer = await element.screenshot({
      encoding: 'base64',
      path: 'screnshot.png',
      optimizeForSpeed: true,
    });

    await browser.close();

    // Отправляем изображение в ответ
    res.set('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (e) {
    console.error(e);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
