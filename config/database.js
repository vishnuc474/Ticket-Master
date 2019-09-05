const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://localhost:27017/ticket-master`, {useNewUrlParser : true})
    .then(() => {
        console.log("Connected to Db")
    })
    .catch((err) => {
        console.log("Error connecting to Db", err)
    })

    module.exports = mongoose