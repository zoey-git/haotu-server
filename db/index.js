const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/haotu')

mongoose.connection.on('connected', () => {
    console.log("Mongoose connection open success;");
})
mongoose.connection.on('error', (err) => {
    console.log("Mongoose connection open error: " + err);
})
mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection open disconnected");
})

module.exports = mongoose