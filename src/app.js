const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home page',
        name: 'Max Dyrmage'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Max Dyrmage'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Max Dyrmage',
        message: 'Example Message'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "pls provide address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error)
        }
        forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
        })
    })
})


app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page/article not found..',
        name: 'Max Dyrhage'
    })
})

app.get('/about/*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page/article not found..',
        name: 'Max Dyrhage'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help page/article not found..',
        name: 'Max Dyrhage'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})