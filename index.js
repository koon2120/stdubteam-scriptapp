const express = require('express')
const path = require('path')
const app = express()
const port = 80

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/api', express.static(path.join(__dirname, 'api')))

const scripts_list = [
    {"id":"taisho_gissip_ep01","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 01","thumnail":"/static/images/taisho_gissip_ep01_thumbnail.jpg","link":"/script/taisho_gissip_ep01"},
    {"id":"taisho_gissip_ep02","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 02","thumnail":"/static/images/taisho_gissip_ep02_thumbnail.jpg","link":"/script/taisho_gissip_ep02"},
    {"id":"taisho_gissip_ep03","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 03","thumnail":"/static/images/taisho_gissip_ep03_thumbnail.jpg","link":"/script/taisho_gissip_ep03"},
    {"id":"taisho_gissip_ep04","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 04","thumnail":"/static/images/taisho_gissip_ep04_thumbnail.jpg","link":"/script/taisho_gissip_ep04"},
    {"id":"taisho_gissip_ep05","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 05","thumnail":"/static/images/taisho_gissip_ep05_thumbnail.jpg","link":"/script/taisho_gissip_ep05"},
    {"id":"taisho_gissip_ep06","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 06","thumnail":"/static/images/taisho_gissip_ep06_thumbnail.jpg","link":"/script/taisho_gissip_ep06"},
    {"id":"taisho_gissip_ep07","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 07","thumnail":"/static/images/taisho_gissip_ep07_thumbnail.jpg","link":"/script/taisho_gissip_ep07"},
    {"id":"taisho_gissip_ep08","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 08","thumnail":"/static/images/taisho_gissip_ep08_thumbnail.jpg","link":"/script/taisho_gissip_ep08"},
    {"id":"taisho_gissip_ep09","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 09","thumnail":"/static/images/taisho_gissip_ep09_thumbnail.jpg","link":"/script/taisho_gissip_ep09"},
    {"id":"taisho_gissip_ep10","title":"ข่าวลือซุบซิบยุคไทโช ดาบพิฆาตอสูร ภาค ย่านเริงรมย์ ตอนที่ 10","thumnail":"/static/images/taisho_gissip_ep10_thumbnail.jpg","link":"/script/taisho_gissip_ep10"},
]

app.get('/', (req, res) => {
    res.redirect("/home")
})

app.get('/home', (req, res) => {
    res.render("home",{
        "listscript":scripts_list,
        "header_url":req.protocol + "://" + req.hostname + req.originalUrl,
        "thumnail_url":req.protocol + "://" + req.hostname + "/static/images/og-cover.png"
    })
})

app.get('/script/:id', (req, res) => {
    check = true
    for (script in scripts_list) {
        if (scripts_list[script]["id"] == req.params['id']) {
            async function sendscript() {
                let response = await fetch(req.protocol + '://' + req.hostname + '/api/char_scripts/' + req.params["id"] + '.json')
                let message = await response.json()
                res.render('script', {
                    "title":scripts_list[script]["title"],
                    "message": message,
                    "header_url":req.protocol + "://" + req.hostname + req.originalUrl,
                    "thumnail_url":req.protocol + "://" + req.hostname + scripts_list[script]["thumnail"]
                })
            }
            sendscript()
            check = false
            break
        }
    }
    if (check) {
        res.send("ไม่มีข้อมูล")
    }
})

app.listen(port, () => {
    console.log(`running as port ${port}`)
})