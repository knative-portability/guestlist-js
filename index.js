const path = require('path')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const morgan = require('morgan')
const {
    getAllGuests,
    addGuestToList
} = require('./firestoreTools')

morgan('tiny') // logging

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    // console.log('Received a GET request for guests')
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/guests', (req, res) => {
    // console.log('Received a GET request for guests.')
    getAllGuests((guests) => {
        res.status(200)
        res.send(JSON.stringify(guests))
    })
})

app.post('/add_name', (req, res) => {
    if (req.body.name) {
        console.log("Added name ${name}");
        addGuestToList(req.body.name)
        res.status(201)
        res.redirect('/')
    }
    console.log("Failed to add name")
    res.status(204)
    res.send("Error: No name to add")
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('guestlist app listening on port', port)
})