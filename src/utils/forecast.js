const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=612aedae31ab38d8948f551c46144bce&query=${lat},${long}&units=f`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to loaction services!', undefined)
        }
        else if (body.error) {
            callback('Unable to locate', undefined)
        }
        else {
            const data = body.current
            const {weather_descriptions,temperature,feelslike,weather_icons,humidity} = data 
            callback(undefined,{icon:weather_icons[0]},
                `${weather_descriptions[0]} . Its is currently ${temperature} degrees out.It feels like ${feelslike} degrees out at ${body.location.region} . The humidity is ${humidity}%.`


            )
        }
    })
}

module.exports = forecast