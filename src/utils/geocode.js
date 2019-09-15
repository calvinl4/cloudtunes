const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FsdmlubDQiLCJhIjoiY2swanJ6OHliMGE2MDNub3RraDMxajFndyJ9.NqvZccTj9gVSx4uUtltkIg&limit=1'
    request({url: url, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if(response.body.features.length === 0){
            callback('No matching results!')
        } else {
            callback (undefined, {
                latitude : response.body.features[0].center[1],
                longtitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })   
        }
    })
}

module.exports = geocode
