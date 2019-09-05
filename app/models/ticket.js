const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    message : {
        type: String,
        required : true
    },
    priority : {
        type: String,
        required : true
    },
    ticketCode : {
        type: String
    },
    isCompleted : {
        type: Boolean,
        default: false
    },
    customer : {
        type : Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    },
    employee : {
        type : Schema.Types.ObjectId,
        ref : 'Employee',
        required : true
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'Department',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    } 
})

const Ticket = mongoose.model('Ticket',ticketSchema)

module.exports = Ticket