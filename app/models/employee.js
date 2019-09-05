const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
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
        maxlength:10,
        minlength:10
        
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'Department',
        required : true
    }
})

const Employee = mongoose.model('Employee',employeeSchema)

module.exports = Employee