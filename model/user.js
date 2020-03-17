const mongoose = require('../db'), Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    head_pic_url: { type: String }, // 头像
    cover_url: { type: String }, // 封面图片
    city: { type: String },
    fans: [Schema.Types.ObjectId],
    attention: [Schema.Types.ObjectId],
    email: { type: String, required: true, unique: true }
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})


module.exports = mongoose.model("User", UserSchema)