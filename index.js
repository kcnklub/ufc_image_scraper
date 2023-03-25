import puppeteer from "puppeteer"

(async() => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        devtools: false,
        headless: true,
        args: ['--no-sandbox']
    });
    const pages = await browser.pages();
    const page = pages[0]
    page.setViewport({width: 1920, height: 1080}) 

    page.waitForSelector("h1")
        .then(async () =>{
            await sleep(1000)
            const gamestrips = await page.$$(".MMAFightCard__Gamestrip")
            for (let strip of gamestrips) {
                const fighters = await strip.$$(".MMACompetitor");
                for (let fighter of fighters) {
                    const name = await fighter.$("h2")
                    const image = await fighter.$("img")
                    let value = await page.evaluate(el => el.textContent, name)
                    let imageValue = await page.evaluate(el => el.src, image)
                    console.log(value.toLowerCase())
                    console.log(imageValue)
                }
            }
        }) 

    await page.goto('https://espn.com/mma/fightcenter');

    await browser.close()
})()

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
