#!/usr/bin/env node

const program = require('commander')

const puppeteer = require("puppeteer");
const path = require('path')

const { thumbnail, directoryExists, readdir, mkdir, rm } = require('./lib')

program
  .version('1.0.0')
  .name('indscreenshoter')
  .description('An image resizer to make thumbnails')
  .option('-url,--weburl ,<char>', 'web url')
 // .option('-d,--destination [folder]', 'Source images directory', 'images')
  .option(
    '-d,--destination [folder]',
    'Directory to be created for thumbnails',
    'screenshots'
  )
  .parse(process.argv)

const main = async () => {
  try {
    // Use current working dir vs __dirname where this code lives
    const cwd = process.cwd()

    // Use user input or default options
    const { weburl, destination } = program

    console.log('weburl',weburl);
    // const srcPath = path.join(cwd, source)
    //const destPath = path.join(cwd, destination)

    const destPath = destination;
 console.log('destPath',destPath);
    // Remove destination directory is it exists
    if (directoryExists(destPath)) {
      await rm(destPath)
    }

    // Create destination directory
    await mkdir(destPath)




let browser;
(async () => {
  browser = await puppeteer.launch({dumpio: false});
  const [page] = await browser.pages();
  const baseURL = weburl;  

 await page.goto(`${baseURL}`, {
   'waitUntil':'networkidle0'
    });

    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
  await page.screenshot({ path: "nyt-puppeteer.png", fullPage: true });
function validateURL(value) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }

for( let i = 0; i < hrefs.length; i++){

  
  if( validateURL(hrefs[i])){
 

    console.log('log',hrefs[i]);
          await page.goto(`${hrefs[i]}`, {
      'waitUntil':'networkidle0'
    });


const dest = path.join(destPath, i+"nyt-puppeteer.png")
 
    await page.screenshot({ path: dest, fullPage: true });

}
}
 


})()
  .catch(err => console.error(err))
  .finally(() => {

    browser.close();
        console.log('Screenshots created successfully!')
     // res.send(`Sucess`); 

  });
  


    // // Read source directory
    // const imagesAll = await readdir(srcPath)

    // // Create thumbnails
    // for (let image of imagesAll) {
    //   const src = path.join(srcPath, image)
    //   const dest = path.join(destPath, image)
    //   console.log(`Creating thumbnail at: ${dest}`)
    //   thumbnail(src, dest)
    // }


  } catch (error) {
    console.log('Error creating thumbnails')
  }
}

main()
