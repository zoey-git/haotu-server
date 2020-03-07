const mongoose = require('../db'), Schema = mongoose.Schema

const PhotoSchema = new Schema({
    display_url: { type: String, required: true },
    image_format: { type: String, required: true },
    created_at: { type: String, required: true },
    image_url: { type: Array, required: true }
})

module.exports = mongoose.model("Photo", PhotoSchema)