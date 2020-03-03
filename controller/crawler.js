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
                $('.main-content .postlist #pins li').each((index, element) => {
                    const $element = $(element)
                    request.head($element.children('a').children('img').attr('data-original'), (err, res, body) => {
                        request($element.children('a').children('img').attr('data-original')).pipe(fs.createWriteStream('./images', '/', Math.floor(Math.random()*100000)))
                    })
                    items.push({
                        "title": $element.text(),
                        "href": $element.children('a').children('img').attr('data-original')
                    })
                })
                resolve(items)
            })
    })
}

module.exports = {
    crawler
}