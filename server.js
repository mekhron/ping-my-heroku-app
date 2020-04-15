const express = require('express')
const fetch = require("node-fetch")
const pingMyApp = require("./modules/pingMyApp")

const PORT = process.env.PORT || 3300;
const DYNO_URL = "https://pingmy.herokuapp.com/favicon.ico"

// Define Express App
const app = express()

// Serve Static Assets
app.use(express.static('public'))


app.listen(PORT, () => {
    console.log('Server connected at:', PORT)

    pingMyApp(DYNO_URL)
})