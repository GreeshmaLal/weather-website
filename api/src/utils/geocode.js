const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=717e05c6dbc6f59d5d3404c26f6d107d&query=` + encodeURIComponent(address)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to loaction services!', undefined)
        }
        else if (body?.data?.length == 0 || body?.error) {
              callback('Unable to find location. Try another search', undefined)
        }
        else {
            const data = body.data[0]
            const { latitude, longitude,label } = data
            callback(undefined, {
                latitude,
                longitude,
                location:label
            })
        }
    })
}

module.exports = geocode