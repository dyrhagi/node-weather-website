const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/5690a6d772882e65d4f74767dcb44744/' + latitude + ','+ longitude +'?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
                callback('Unable to connect to weather service', undefined)
            } else if (body.error){
                callback('Unable to find the location', undefined)
            
            } else {
                callback(undefined, 'The current temp: ' + body.currently.temperature + ' degrees. There is a '+ body.currently.precipProbability*100 + '% chance of rain. The highest temp of today is ' + body.daily.data[0].temperatureHigh + '. The lowest temp today has been ' + body.daily.data[0].temperatureLow )
                
            }
    })
}




// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error){
//         console.log('Unable to find the location')

//     } else {
//            console.log('The current temp: ' + response.body.currently.temperature + ' degrees. There is a '+ response.body.currently.precipProbability*100 + '% chance of rain')
//     }
// })


module.exports = forecast