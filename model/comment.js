
const mongoose = require('../db'), Schema = mongoose.Schema

const CommentSchema = new Schema({
    photo_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
},{
    timestamps: {
        createdAt: 'created'
    }
})


module.exports = mongoose.model("Comment", CommentSchema)
