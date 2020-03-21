const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Define paths for express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")
//setup handlebars engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
// setup static dir
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index',{
        title:'Weather',
        name: 'Omar Taher'
    })
})

app.get('/about',(req, res) => {
     res.render('about',{
         title: 'About',
         name: 'Omar Taher'
     })
    
})

app.get('/help',(req, res) => {
    res.render('help',{
        helpText:'this is some helpful text',
        title: 'Help',
        name: 'Omar taher'
    })
   
})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "you should provide an address"
        })
    }


    
geocode.geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
    if(error){
            return res.send({
            error
        })
    }  
    
    forecast.forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                    return res.send({
                    error
                })
            }
            res.send({
                forecastdata,
                location,
                address: req.query.address
            })
    })
      
})
})

app.get('/product',(req, res) =>{
    if(!req.query.price){
        return res.send({
            error: 'you must provide a price term'
        })
    }
        console.log(req.query.rating)
            res.send({
            product: []
    })
    
})
app.get('/help/*',(req, res) =>{
    res.render('error',{
        name: "article not found"
    })
    
})
app.get('/*',(req, res) =>{
    res.render('error',{
        name: "Page not found 404"
    })
    
})

app.listen(3001,() => {
    console.log('Server is up')
})
 