let citySubmit = document.getElementById("search");

citySubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("button clicked");
  let choiceCity = new FormData(citySubmit);
  let city = choiceCity.get("name");

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fbf458a7369a9ca1c284ae2e7021dcc`
      );
      let data = await response.json();
      displayWeatherData(data);
    } catch (err) {
      if (err instanceof TypeError) {
        displayError();
      }
    }
  };
  fetchWeatherData();
});

function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  return (valNum - 273.15) * 1.8 + 32;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

let dismiss;

function setDismissHandler() {
  dismiss = document.getElementById("error");
  dismiss.addEventListener("click", (event) => {
    dismiss.innerHTML = "";
    dismiss = null;
  });
}

function displayError() {
  let errorEl = document.getElementById("error");
  errorEl.innerHTML = `
    <div id="dismiss" class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 hover:cursor-pointer px-4 py-3" role="alert">
  <p class="font-bold">Uh oh</p>
  <p class="text-sm">Looks like that isn't a valid input. Click anywhere to dismiss.</p>
</div>
    `;
  setDismissHandler();
}

function displayWeatherData(data) {
  let locationEl = document.getElementById("location");
  let tempEl = document.getElementById("temp");
  let forecastEl = document.getElementById("forecast");
  let hiLoEl = document.getElementById("hi-lo-humid");
  let iconEl = document.getElementById("icon");

  locationEl.innerHTML = `
    ${data.name}
    `;
  tempEl.innerHTML = `
    ${Math.floor(temperatureConverter(data.main.temp))}\u00B0
    `;
  forecastEl.innerHTML = `
    ${toTitleCase(data.weather[0].description)}
    `;
  iconEl.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> 
    `;

  hiLoEl.innerHTML = `
  <div class="flex space-x-3" id="hi-lo-humid">
  <div
    class="text-white flex flex-col items-center justify-center bg-slate-600 w-24 h-24 rounded-xl"
  >
    <p>High</p>
    <hr />
    <p>${Math.floor(temperatureConverter(data.main.temp_min))}\u00B0</p>
  </div>
  <div
    class="text-white flex flex-col items-center justify-center bg-slate-700 w-24 h-24 rounded-xl"
  >
    <p>Low</p>
    <hr />
    <p>${Math.floor(temperatureConverter(data.main.temp_max))}\u00B0</p>
  </div>
  <div
    class="text-white flex flex-col items-center justify-center bg-slate-800 w-24 h-24 rounded-xl"
  >
    <p>Humidity</p>
    <hr />
    <p>${data.main.humidity}%</p>
  </div>
</div>
    `;
}
