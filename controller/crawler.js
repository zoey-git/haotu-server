const superagent = require('superagent')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const request = require('request')
const crawler = async (ctx, next) => {
    try {
        let res = await crawlerFn() 
        ctx.body = {
            code: 200,
            data: res
        }
    } catch (error) {
        
    }
}
const saveImg = (imgUrl, filePath) => {
    return new Promise((resolve, reject) => {
        var readStream = request.get({
            url: imgUrl,
            headers: { 'Referer': 'http://www.mzitu.com/' }
        })
        var writeStream = fs.createWriteStream(filePath)
        readStream.pipe(writeStream);
        writeStream.on('finish', function () {
            resolve('ok')
            writeStream.end();
        })
    })
}

const crawlerFn = () => {
    return new Promise((resolve, reject) => {
        const items = []
        superagent.get('https://www.mzitu.com/')
            .set({
                'Referrer': 'www.baidu.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            })
            .end((err, res) => {
                if (err) {
                    reject(err)
                }
                const $ = cheerio.load(res.text)
                $('.main-content .postlist #pins li').each(async (index, element) => {
                    const $element = $(element)
                    let imgUrl = $element.children('a').children('img').attr('data-original')
                    const filePath = path.resolve(__dirname, '../static/images', `${$element.text()}_image.png`)
                    await saveImg(imgUrl, filePath)
                    items.push({
                        "title": $element.text(),
                        "href": imgUrl
                    })
                })
                resolve(items)
            })
    })
}

module.exports = {
    crawler
}