const cheerio = require('cheerio')
const superagent = require('superagent')
const path = require('path')
const fs = require('fs')
const request = require('request')
const Photo = require('../../model/photo')




const PhotoList = async (ctx, next) => {
    let { pageSize: limit = 10, currentPage = 2} = ctx.request.body
    let imgList = await Photo.find({}).skip(
        (currentPage - 1) * limit 
    ).limit(limit)
    
    return ctx.body = {
        code: 200,
        data: {
            photoList: imgList
        }
    }
}


const GetPhotos = () => {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'https://api.500px.com/v1/photos?rpp=50&feature=popular&image_size%5B%5D=1&image_size%5B%5D=2&image_size%5B%5D=32&image_size%5B%5D=31&image_size%5B%5D=33&image_size%5B%5D=34&image_size%5B%5D=35&image_size%5B%5D=36&image_size%5B%5D=2048&image_size%5B%5D=4&image_size%5B%5D=14&sort=&include_states=true&include_licensing=true&formats=jpeg%2Clytro&only=&exclude=&personalized_categories=&page=2&rpp=50'
        }, (err, res, body) => {
            if (err) {
                reject(err)
            }
            let { photos } = JSON.parse(body)
            let imgList = []
            Object.keys(photos).map(key => {
                imgList.push(photos[key])
            })
            resolve(imgList)
        })
    })
}

const SetPhotos = async (ctx, next) => {
    let imgList = await GetPhotos()
    let obj = []
    imgList.map(item => {
        let display_url;
        item.images.map(imgItem => {
            if(imgItem.size === 34) {
                display_url = imgItem.url
            }
        })
        obj.push({
            display_url: display_url,
            image_format: item.image_format,
            created_at: item.created_at,
            image_url: item.image_url
        })
    })
    
    try {
        let res = await Photo.create(obj)
        console.log(res);
        ctx.body = {
            code: 200,
            data: res
        }
    } catch (error) {
        ctx.body = {
            code: 304,
            msg: error
        }
    }
}


module.exports = {
    PhotoList,
    SetPhotos
}