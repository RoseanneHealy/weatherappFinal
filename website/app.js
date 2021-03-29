//values added together equal http route I believe
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=1d3069638ea01c21620211ee9ec5ee3d&units=metric';
const newLocation = document.getElementById('zip').value;

//when generate button is clicked function to get the value of zip and feelings.
document.getElementById('generate').addEventListener('click', performAction);

//feeling user content box/zip value taken
function performAction(e) {
  const feeling = document.getElementById('feelings').value;
  const newLocation = document.getElementById('zip').value;

  getZipWeatherInfo(baseURL + newLocation)
    .then(
      function (data) {        
        //Add data to POST request(ROUTE AND DATA)/ feeling:feeling is what user wrote themselves.
        let newDate = createDate();
        postData('/addNewZip', { date: newDate, temp: data.main.temp, content: feeling })
          .then(() => {
            updateUI();
        });
    })
};
//using the then keyword we can post our data to server .so we post data and use fetch later to receive it back. 
//to have it appear on page, we need to dynamically update UI to have it on our static webpage.



//async function (async so our code waits to receive back data from server.) which takes base url, zip and API Key.
const getZipWeatherInfo = async (url) => {
  const res = await fetch(url + apiKey);
  
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const createDate = () => {
  let d = new Date();
  let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
  return newDate;
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const request = await fetch('/all')
  try {
    const lastEntry = await request.json();
    console.log(lastEntry);

    document.getElementById('date').innerHTML = lastEntry.date;
    document.getElementById('temp').innerHTML = lastEntry.temp + " °C";
    document.getElementById('content').innerHTML = lastEntry.content;
  } catch (error) {
    console.log("error", error);
  }
}

