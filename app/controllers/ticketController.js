const Ticket = require('../models/ticket')

module.exports.list =  (req,res) => {
    Ticket.find().populate({path: 'employee',populate: { path: 'department' }}).populate('customer').populate('department')
        .then( (ticket) =>{
            res.json(ticket)
        })
}

module.exports.create= (req, res) => {
    const data = req.body
    const ticket = new Ticket(data)
    ticket.save()  
        .then((ticket) =>{
            res.json(ticket)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Ticket.findById(id).populate({path: 'employee',populate: { path: 'department' }}).populate('customer').populate('department')
        .then((ticket) => {
            res.json(ticket)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Ticket.findByIdAndUpdate(id, {$set : body} , {new : true, runValidators : true})
        .then((ticket) => {
            if(ticket){
                res.json({})
            }else{
                res.json(ticket)
            }
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Ticket.findByIdAndDelete(id)
        .then(ticket => {
            if(ticket){
                res.json(ticket)
            }else{
                res.status('404').json({})
            }
        })
}