const UserModel = require('../../model/user')
const { TOKEN_KEY } = require('../../config')
const { verifyToken, validateParams } = require('../../utils')
const jwt = require('jsonwebtoken')

const AddUser = async (ctx, next) => {
    const { username, password, email, nickname } = ctx.request.body
    try {
        await validateParams(ctx, next, [username, password, email, nickname])
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: 'params is not full'
        }
    }

    const user = new UserModel({
        username: username,
        password: password,
        nickname: nickname,
        email: email
    })

    try {
        let res = await user.save()
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

const GetUserList = async (ctx, next) => {
    let res = await UserModel.find({})
    return ctx.body = {
        code: 200,
        data: res
    }
}

const EditUser = async (ctx, next) => {
    const { nickname, _id } = ctx.request.body
    await UserModel.updateOne({ _id }, { nickname })
    return ctx.body = {
        code: 200
    }
}

module.exports = {
    AddUser,
    Login,
    ChangeUserPassword,
    GetUserList,
    EditUser
}