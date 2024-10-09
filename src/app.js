const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('views', viewsPath)
app.use(express.static(publicDirectory))
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Project',
        name: 'Greeshma'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Greeshma'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        message: 'Contact me for any help!',
        name: 'Greeshma'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'No address found' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error1,{icon} ,forecastData) => {
            if (error1) {
                return res.send({ error1 })
            }
            res.send({ forecast: forecastData, location, address: req.query.address,icon })
           
               
           

        })

    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Greeshma',
        errorMessage: 'Help article not found'
    })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Greeshma',
        errorMessage: 'Page not found'
    })
})
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up')
})