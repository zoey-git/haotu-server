const superagent = require('superagent')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const request = require('request')
const qn = require('qiniu')

const config = {
    accessKey: '5XFLinQd9Et3Izlk5kALMHmUYtpR5D04-jcA8J8N',
    secretKey: '-DpTp4E13kMlMgrY3qCyayRiG_d4OAGc1bIixFli',
    bucket: 'haotu-photo'
}
let mac  = new qn.auth.digest.Mac(config.accessKey, config.secretKey)
let options = {
    scope: config.bucket
}
const putPolicy = new qn.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
const qnConfig = new qn.conf.Config()
qnConfig.zone = qn.zone.Zone_z0



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
const saveImg = (imgUrl, filePath, fileName) => {
    return new Promise((resolve, reject) => {
        var readStream = request.get({
            url: imgUrl,
            headers: { 'Referer': 'http://www.mzitu.com/' }
        })
        var writeStream = fs.createWriteStream(filePath)
        readStream.pipe(writeStream);
        writeStream.on('finish', function () {
            writeStream.end();
            const formUpload = new qn.form_up.FormUploader(qnConfig)
            const putExtra = new qn.form_up.PutExtra()

            formUpload.putFile(uploadToken, fileName, filePath, putExtra, (err, body, info) => {
                if (err) {
                    throw err
                }
                if (info.statusCode === 200) {
                    console.log(body);
                } else {
                    console.log(info.statusCode);
                    console.log(body);
                }
            })
            resolve('ok')
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
                    await saveImg(imgUrl, filePath, `${$element.text()}_image.png`)
                    items.push({
                        "title": $element.text(),
                        "href": imgUrl
                    })
                })
                resolve(items)
            })
    })
}

const downFile = () => {
    var mac = new qn.auth.digest.Mac(config.accessKey, config.secretKey);
    var qnConfig = new qn.conf.Config();
    var bucketManager = new qn.rs.BucketManager(mac, qnConfig);
    var publicBucketDomain = 'http://q6pmg0ho4.bkt.clouddn.com';
    // 公开空间访问链接
    var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, '电梯偶遇失恋醉酒女 女神杨紫嫣满足你的尾随幻想2020-03-03_image.png');
    console.log(publicDownloadUrl);
     saveImg(publicDownloadUrl, path.resolve(__dirname, '../static/images', `电梯偶遇失恋醉酒女 女神杨紫嫣满足你的尾随幻想2020-03-03_image.png`))
}

module.exports = {
    crawler,
    downFile
}