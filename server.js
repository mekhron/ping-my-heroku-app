const express = require('express');
const fetch = require("node-fetch")

// Define Express App
const app = express();
const PORT = process.env.PORT || 3300;

const time = 1000*60*25
const appName = 'http://localhost:'+PORT



// Serve Static Assets
app.use(express.static('public'));

setInterval(() => {
    fetch(appName)
        .then(res => {
            return res.status
        })
        .then(status => {
            console.log(status)
        })
        .catch(res => {
            console.log("Booo")
        })
}, time)

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});