document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});

    document.querySelector('#pingMyApp').addEventListener('submit', saveHerokuApp)

    function saveHerokuApp(e) {
        e.preventDefault()

        let appName = document.querySelector('#url').value
        let addedTime = Math.floor(Date.now() / 1000)
        let appStatus = 'live'
        let herokuApp = {
            name: appName,
            time: addedTime,
            status: appStatus
        }

        if (!appName) {
            alert('Please, fill in the form')
            return false
        }

        // let expression = /^a-zA-z-]/gi
        // let regex = new RegExp(expression)

        // if (!appName.match(regex)) {
        //     alert('Please input valid name')
        //     return false
        // }

        if (localStorage.getItem('herokuApps') === null) {
            let herokuApps = []
            herokuApps.push(herokuApp)
            localStorage.setItem('herokuApps', JSON.stringify(herokuApps))
        } else {
            let herokuApps = JSON.parse(localStorage.getItem('herokuApps'))
            herokuApps.push(herokuApp)
            localStorage.setItem('herokuApps', JSON.stringify(herokuApps))
        }

        fetchHerokuApps()
        
    }
});

function fetchHerokuApps() {
    let herokuApps = JSON.parse(localStorage.getItem('herokuApps'))

    let herokuAppsResults = document.querySelector('#appsList')

    herokuAppsResults.innerHTML = ''
    herokuApps.forEach(app => {
        let name = app.name, addedTime = app.time, status = app.status
        let currentTime = Math.floor(Date.now() / 1000)
        let appAddedTime = Math.floor(((currentTime - addedTime) / 60) /60)

        let statusParams = {
            live: {
                name: "live",
                icon: "play_arrow",
                tooltip: "Stop pinging this app",
                color: "#2bbbad"
            },
            stop: {
                name: "stop",
                icon: "stop",
                tooltip: "",
                color: "#000000"
            },
            error: {
                name: "error",
                icon: "error",
                tooltip: "Try again",
                color: "#ee6e73"
            }
        }

        let output = `<li>
                            <div class="collapsible-header">
                                <a href=""  class="tooltipped" data-tooltip="Stop pinging this app"><i class="material-icons" style="color:#2bbbad;">${currentTime - addedTime <= 1200 ? 'play_arrow' : 'stop'}</i></a>
                                <a href="https://${name}.herokuapp.com" target="_blank"><span style="color:#2bbbad;">${name}.herokuapp.com</span></a>
                                <span class="badge">added ${appAddedTime} hours ago</span>
                                <a href="#" class="tooltipped" data-tooltip="Delete" onclick="deleteHerokuApp('${name}')"><i class="material-icons" style="color:#ee6e73;">delete</i></a>
                            </div>
                        </li>`

        herokuAppsResults.innerHTML += output
    })
}

function deleteHerokuApp(name) {
    let herokuApps = JSON.parse(localStorage.getItem('herokuApps'))
    
    herokuApps.forEach((app, i) => {
        if (app.name === name) {
            herokuApps.splice(i, 1)
        }
        localStorage.setItem('herokuApps', JSON.stringify(herokuApps))
    })

    fetchHerokuApps()
}