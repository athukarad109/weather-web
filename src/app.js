const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars and views
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static dir
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Athu"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Athu"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Hey there, I am here to help',
        name: "Athu"
    })
})

app.get('/weather', (req, res) => {
    //make sure that query is not empty
    if (!req.query.address) {
        return res.send({
            error: 'Provide address of your location'
        })
    }
    var address = req.query.address
    geoCode(address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            const lat = lattitude;
            const long = longitude;
            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }

                res.send({
                    location,
                    forecastData
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        pageName: 'Help page'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        pageName: 'Page'
    })
})

app.listen(3000, () => {
    console.log('Server is up ...')
})