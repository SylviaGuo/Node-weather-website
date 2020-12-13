const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name:'Sylvia Guo'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'This is my some helpful text.',
        title:'Help',
        name:'Sylvia Guo'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name:'Sylvia Guo'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        error:'Help article not found.',
        title:'404 Page',
        name:'Sylvia Guo'
    })
})


app.get('/weather', (req, res)=>{
    
    const address = req.query.address
    console.log(address)
    if(!address){
        return res.send({
            error:'You must provide a address!'
        })
    }
    geocode(address, (error, {latitute, longitute, location}={})=>{
        if(error)
            return res.send({
                error
            })
    
        forecast(latitute, longitute, (error,forecastdata)=>{
            if(error)
                return res.send({
                    error
                })
                res.send({
                    forecast:forecastdata,
                    location,
                    address:address
                })
        })
    })
    
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/*', (req, res)=>{
    res.render('404', {
        error:'Page not found.',
        title:'404 Page',
        name:'Sylvia Guo'
    })
})

app.listen(port, ()=>{
    console.log('Server on port ' + port + '!')
})