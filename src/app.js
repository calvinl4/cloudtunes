const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static('/Users/calvinlin4/Documents/Node-Course/web-server/public'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Calvin Lin, Jason Lin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Calvin Lin, Jason Lin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Calvin Lin, Jason Lin'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })     
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})