const express = require('express')
const path = require('path')
const app = express()
const port = 80

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')

app.use('/api', express.static(path.join(__dirname, 'api')))

app.get('/', (req, res) => {
    res.render("home", {
        "header_url": req.protocol + "://" + req.hostname + req.originalUrl,
        "thumnail_url": "https://i.ibb.co/zh3z1PK/og-cover.png"
    })
})

app.get('/create', (req, res) => {
    res.render("create_script", {
        "header_url": req.protocol + "://" + req.hostname + req.originalUrl,
        "thumnail_url": "https://i.ibb.co/zh3z1PK/og-cover.png"
    })
})

app.get('/id/:id', (req, res) => {
    async function sendscript() {
        let response = await fetch(req.protocol + '://' + req.hostname + '/api/char_scripts/' + req.params["id"] + '.json')
        let json_data = await response.json()
        res.render('script', {
            "title": json_data[0]["title"],
            "message": json_data[1],
            "header_url": req.protocol + "://" + req.hostname + req.originalUrl,
            "thumnail": json_data[0]["thumnail"]
        })
    }
    sendscript()
})

app.listen(port, () => {
    console.log(`running as port ${port}`)
})