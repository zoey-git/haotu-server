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

module.exports = {
    verifyToken
}