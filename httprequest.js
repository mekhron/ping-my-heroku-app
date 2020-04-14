const fetch = require("node-fetch")

const time = 1000
const app = 'https://coronavirus-us-stats.herokuapp.com'

setInterval(() => {
    fetch(app)
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