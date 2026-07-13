const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'cv.html'), { waitUntil: 'networkidle' });
  await page.pdf({
    path: path.resolve(__dirname, 'Fedor_Berman_CV_dark.pdf'),
    format: 'A4',
    printBackground: true,
  });
  await browser.close();
  console.log('Fedor_Berman_CV_dark.pdf готов');
})();
