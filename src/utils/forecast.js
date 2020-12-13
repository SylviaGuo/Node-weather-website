const request = require('postman-request')

const forecast = (latitute, longitute, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=701af7bd03541e9bbd67500a09898175&query="+longitute+','+latitute
    request({url, json:true},(error, {body}={})=>{
        if(error){
            callback("Unable to connect to weather serverices!", undefined)
        }else if(body.error){
            callback("Unable to find location!", undefined)
        }else{
            const tempture = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_description = body.current.weather_descriptions[0]
            const result= weather_description+". It is currently " + tempture + " degress out. It feels like " + feelslike + " degress out."
            callback(undefined, result)
        }
    })
}

module.exports = forecast