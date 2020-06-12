// modules 
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// db connection
mongoose.set('debug', true)
mongoose.Promise = global.Promise // asynchronize handling
mongoose.connect('url', (err) => {
    if (!err) {
        console.log('db connected...')
    } else {
        console.log('Error in MongoDB connection: ' + JSON.stringify(err,undefined,2))
    }
});

// import routes
const rts = require('./routes')

var app = express()

// middlewares
app.use(bodyParser.json())
app.use(cors())

app.use('/api', rts)

// listening to port
app.listen(4000, () => console.log(`Server started 4000`))