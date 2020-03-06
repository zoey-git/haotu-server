


const PhotoList = (ctx, next) => {
    console.log(123);
    
    return ctx.body = {
        code: 200,
        data: {
            photoList: [123,3456,123]
        }
    }
}

module.exports = {
    PhotoList
}