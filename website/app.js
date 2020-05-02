/* Global Variables */
// Personal API key for OpenWeatherMap API
let appID = '5e499f5ad8373ca656acff84e1ac77fe';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener  to add function 
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener //
function performAction(event) {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);

    getTemperature(baseURL, postCode, appID)
        .then(function (data) {
            // Add data to POST request //
            postData('http://localhost:8080/addWeatherData', { temperature: data.main.temp, date: newDate, user_response: feelings })
                //Function which update UI
                .then(function () {
                    updateUI()

                })
        })
}
//Async GET
const getTemperature = async (baseURL, code, appID) => {
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + appID)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

//Async POST
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });
    try {
        
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }

}
// Update user interface //
const updateUI = async () => {
    const request = await fetch('http://localhost:8080/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}