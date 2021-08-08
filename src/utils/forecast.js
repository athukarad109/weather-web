const request = require('request');

const forecast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1db793659d8d55a416120bfeaf48ab90&query=${lattitude},${longitude}&units=m`;


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect ...');
        } else if (body.error) {
            callback('unable to find');
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feel: body.current.feelslike,
                desc: body.current.weather_descriptions
            })
        }
    });

}

module.exports = forecast;