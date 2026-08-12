import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:4321/Astrofotografia/utility/astronomy-tools/', { waitUntil: 'networkidle' });

console.log('ccd-camera-preset hidden?', await page.locator('#ccd-camera-preset').isHidden());
const comboInput = page.locator('#ccd-camera-preset + div input');
console.log('combo input visible?', await comboInput.isVisible());
console.log('initial value:', await comboInput.inputValue());

const panel = page.locator('#ccd-camera-preset + div > div.max-h-72');

await comboInput.click();
await page.waitForTimeout(100);
console.log('panel open on focus?', await panel.isVisible());

await comboInput.fill('asi2600');
await page.waitForTimeout(150);
const buttons = await page.locator('#ccd-camera-preset + div button').allTextContents();
console.log('filtered results for "asi2600":', buttons);

await page.locator('#ccd-camera-preset + div button').first().click();
await page.waitForTimeout(100);
console.log('input value after selecting:', await comboInput.inputValue());
console.log('pixel size after selecting:', await page.inputValue('#ccd-pixel-size'));
console.log('CCD scale after selecting:', await page.textContent('#ccd-scale-output'));

await page.mouse.click(50, 50);
await page.waitForTimeout(250);
console.log('panel hidden after outside click?', await panel.isHidden());

const fovInput = page.locator('#fov-preset + div input');
await fovInput.click();
await fovInput.fill('nikon d850');
await page.waitForTimeout(150);
console.log('FOV filtered:', await page.locator('#fov-preset + div button').allTextContents());
await page.locator('#fov-preset + div button').first().click();
await page.waitForTimeout(100);
console.log('FOV resW/resH after Nikon D850:', await page.inputValue('#fov-res-w'), await page.inputValue('#fov-res-h'));

await page.click('[data-lang-btn="en"]');
await page.waitForTimeout(100);
const guideImgInput = page.locator('#guide-img-camera-preset + div input');
console.log('guide-img combo label after switching to EN (should be Custom):', await guideImgInput.inputValue());

console.log('errors:', errors);
await browser.close();
