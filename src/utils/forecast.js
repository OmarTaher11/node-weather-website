const request = require('request')
const forecast = (longitude,latitude,callback) => {
 const url = 'https://api.darksky.net/forecast/0a9fec3f63bf43759a37ee304d5776d0/'+latitude+','+longitude+'?units=si'

 request({ url,json: true},(error, {body}={}) =>{
     if (error)
     callback("cannot connect to the weather app")
     else if(body.error){
     callback('unable to find location')
     }
     else
        callback(undefined,{
            summary:body.daily.data[0].summary,
            temp:body.currently.temperature,
            rainProb:body.currently.precipProbability
        })
 }) 
}
 module.exports = {
     forecast:forecast
 }
