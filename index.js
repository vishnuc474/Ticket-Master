const express = require('express')
const mongoose = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const app = express()
const port = 3005

app.use(express.json())
app.use(cors())
app.use('/',router)


app.listen(port, () => {
    console.log('listening to the port', port)
}) 