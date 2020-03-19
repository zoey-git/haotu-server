const { TOKEN_KEY } = require('../config')
const jwt = require('jsonwebtoken')

const result = () => {

}

const verifyToken = (token) => {
    if (!token) {
        return ''
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, TOKEN_KEY, (err, decode) => {
            if (err) {
                return reject(err)    
            }
            return resolve(decode)
        })
    })
}

const validateParams = (ctx, next, [...params]) => {
    return new Promise((resolve, reject) => {
        let arr = params.filter((item) => {
            return ['', undefined, null].includes(item)
        })
        if(arr.length) {
            return reject()
        }
        resolve()
    })
}

module.exports = {
    verifyToken,
    validateParams
}