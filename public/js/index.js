document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.tooltipped');
    let instances = M.Tooltip.init(elems, {});

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

        let expression = /[a-zA-Z]/gi
        let regex = new RegExp(expression)

        if (!appName.match(regex)) {
            alert('Please input valid name')
            return false
        }

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
        document.querySelector('#url').value = ''
    }
});

function fetchHerokuApps() {
    let herokuApps = JSON.parse(localStorage.getItem('herokuApps'))
    let currentTime = Math.floor(Date.now() / 1000)
    let herokuAppsResults = document.querySelector('#appsList')

    herokuAppsResults.innerHTML = ''
    herokuApps.forEach(app => {
        let name = app.name, addedTime = app.time, status = app.status
        let appAddedTime = Math.floor(((currentTime - addedTime) / 60) /60)

        let output = `<li class="row collection-item">
                            <span class="col s1">
                                <a href=""  class="tooltipped" data-tooltip="Stop pinging this app"><i class="material-icons" style="color:#2bbbad;">${currentTime - addedTime <= 120000 ? 'play_arrow' : 'stop'}</i></a>
                            </span>
                            <span class="col s6">
                                <a href="https://${name}.herokuapp.com" target="_blank"><span style="color:#2bbbad;">${name}.herokuapp.com</span></a>
                            </span>
                            <span class="col s4">
                                <span class="badge">added ${appAddedTime} hours ago</span>
                            </span>
                            <span class="col s1">
                                <a href="#" class="tooltipped" data-tooltip="Delete" onclick="deleteHerokuApp('${name}')"><i class="material-icons" style="color:#ee6e73;">delete</i></a>
                            </span>
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