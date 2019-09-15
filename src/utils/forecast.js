const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/776763cfb29ca6ce3d26dc2515f0e01f/' + latitude + ',' + longtitude + '?units=si'
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to internet!', undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature
                    + ' degrees celsius outside. There is a ' + response.body.currently.precipProbability
                    + '% chance of rain.')
        }
    })
}

module.exports = forecast