const Photo = require('../../model/photo')


const GetPhotoList = async (ctx, next) => {
    let { page } = ctx.request.body
    let { pageSize: limit = 10, currentPage = 1 } = page
    const result = await Photo.find({}).skip(
        (currentPage - 1) * limit
    ).limit(limit)
    const total = await Photo.count({})
    ctx.body = {
        code: 200,
        data: {
            photos: result,
            page: {
                pageSize: limit,
                currentPage: currentPage,
                total: total
            }
        }
    }
}

const UpdatePhoto = async (ctx, next) => {
    let { _id, user_id  } = ctx.request.body
    if (!_id) {
        return ctx.body = {
            code: 301,
            msg: 'params is not success'
        }
    }
    let result = await Photo.updateOne({ _id }, { user_id })
    ctx.body = {
        code: 200,
        data: result
    }
}


module.exports = {
    GetPhotoList,
    UpdatePhoto
}