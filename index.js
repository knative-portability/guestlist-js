const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const getAllGuests = require('./firestoreTools')

morgan('tiny') // logging

app.get('/', (req, res) => {
    // console.log('Received a GET request for guests')
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/guests', (req, res) => {
    // console.log('Received a GET request for guests.')
    guests = getAllGuests()
    res.send(`Hello ${target}!`)
})

app.post('/', (req, res) => {
    // console.log('Received a request for guests.')
    // TODO: asdsadsa
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('guestlist app listening on port', port)
})