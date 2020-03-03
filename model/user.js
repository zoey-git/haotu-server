const mongoose = require('../db'), Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String }
})

module.exports = mongoose.model("User", UserSchema)