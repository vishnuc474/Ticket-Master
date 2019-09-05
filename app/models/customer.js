const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        validate : {
            validator : function(email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
            },
            message : props => `${props.value} is not an valid email`
        },
        required: true
    },
    mobile: {
        type:String,
        required : true,
        maxlength : 10,
        minlength : 10
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Customer = mongoose.model('Customer',customerSchema)

module.exports = Customer