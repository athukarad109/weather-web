const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // return console.log(data.error);
                return messageOne.textContent = data.error;
            }
            // console.log(data.location);
            console.log(data.forecastData);
            messageOne.textContent = `Location : ${data.location}`;
            messageTwo.textContent = `${data.forecastData.desc} Temperature is ${data.forecastData.temp} degree celcius`;
        })
    })

})