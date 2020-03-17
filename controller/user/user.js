const UserModel = require('../../model/user')
const { TOKEN_KEY } = require('../../config')
const { verifyToken } = require('../../utils')
const jwt = require('jsonwebtoken')

const AddUser = async (ctx, next) => {
    const { username, password, email } = ctx.request.body
    console.log(ctx.request.body);
    
    return
    if (!username || !password || !email) {
        return ctx.body = {
            code: 301,
            msg: 'params is not full'
        }
    }
    const user = new UserModel({
        username: username,
        password: password,
        email: email
    })
    try {
        let res = await user.save()
        console.log(res);
        if(res._id) {
            return ctx.body = {
                code: 200,
                msg: '添加成功'
            }
        }
    } catch (error) {
        return ctx.body = {
            code: 302,
            msg: error
        }
    }
}


const Login = async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
        return ctx.body = {
            code: 301,
            msg: 'params is not full'
        }
    }
    let res = await UserModel.findOne({ username, password })
    if (!res) {
        return ctx.body = {
            code: 201,
            msg: '用户不存在或密码错误'
        }
    }
    if (res._id) {
        const token = jwt.sign({
            username: res.username,
            _id: res._id
        }, TOKEN_KEY, { expiresIn: '2h'})
        return ctx.body = {
            code: 200,
            data: {
                username: res.username,
                email: res.email,
                id: res._id,
                token: token
            }
        }
    }
}

const ChangeUserPassword = async (ctx, next) => {
    const { oldPassword, newPassword, username, token } = ctx.request.body
    if (!oldPassword || !newPassword || !username || !token) {
        return ctx.body = {
            code: 301,
            msg: 'params is not full'
        }
    }
    try {
        let res = await verifyToken(token)
        if (res.name === username) {
            let user = await UserModel.findOne({username, password: oldPassword})
            if (user._id) {
                try {
                    let update_res = await UserModel.updateOne({ username }, { password: newPassword })
                    if (update_res.ok) {
                        return ctx.body = {
                            code: 200,
                            msg: '更新成功'
                        }
                    }
                } catch (error) {
                    return ctx.body = {
                        code: 303,
                        msg: '更新失败'
                    }
                }
            } else {
                // 密码错误
                return ctx.body = {
                    code: 302,
                    msg: '密码错误'
                }
            }
        } else {
            return ctx.body = {
                code: 302,
                msg: '未知错误'
            }
        }
    } catch (error) {
        return ctx.body = {
            code: 302,
            msg: '未知错误'
        }
    }
    
}

module.exports = {
    AddUser,
    Login,
    ChangeUserPassword
}