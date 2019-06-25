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
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/guests', (req, res) => {
    getAllGuests((guests) => {
        res.status(200).send(JSON.stringify(guests))
    })
})

app.post('/add_name', (req, res) => {
    if (req.body.name) {
        addGuestToList(req.body.name)
        console.log(`Adding name ${req.body.name}`);
        res.redirect('/')
        res.send()
    }
    else {
        console.log("Failed to add name")
        res.status(204).send("Error: No name to add")
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('guestlist app listening on port', port)
})