// weather main
// https://api.openweathermap.org/data/2.5/weather?q=${myInput.value}&units=metric&appid=${88b168ed248d74afc4314a7d6d4cf359}

// country info
// https://api.timezonedb.com/v2.1/get-time-zone?key=SS1WKIHA07HI&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}
//   <span class="cloud">&#9729;</span>

/*
 result.weather[0].main == "Clear"
          ? x 
          : result.weather[0].main == "Clouds"
          ? console.log("it cloud")
          : console.log("no")*/

const sun = "<span>&#9728;</span>";
const cloud = " <span>&#9729;</span>";
const rain = "<i class=bi bi-cloud-rain></i>";

const mycity = document.querySelector(".thecity");
const mytime = document.querySelector(".thetime");
const myInput = document.querySelector(".input");
const mybutton = document.querySelector(".mybutton");
const typewhether = document.querySelector(".typewhether");
const mydegree = document.querySelector(".degree");
const mywindspped = document.querySelector(".windspeed");
const myhumidity = document.querySelector(".Humidity");
const mypresure = document.querySelector(".Presure");
const myimg = document.querySelector(".img");
// https://api.openweathermap.org/data/2.5/weather?q=${myInput.value}&units=metric&appid=3f100b35e815be1951b4fbc0199fc1ba

mybutton.addEventListener("click", () => {
  fetch(
    ` https://api.openweathermap.org/data/2.5/weather?q=${
      myInput.value
        ? myInput.value
        : (mycity.innerHTML = `<h1 class="text-danger" >no city found</h1>`)
    }&units=metric&appid=3f100b35e815be1951b4fbc0199fc1ba
    `
  )
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      // console.log(result.weather[0].main);
      // ----------------------------------------------------------------------
      let tempruter = ` <h1 class="">${result.weather[0].main}</h1>`;
      typewhether.innerHTML = tempruter;
      let img = ` <h1 class="">${
        result.weather[0].main == "Clear"
          ? sun
          : result.weather[0].main == "Clouds"
          ? cloud
          : rain
      }</h1>`;
      myimg.innerHTML = img;

      // --------------------------------------------------------------------
      let degree = `<h1 class="fs-2 text-warning">${result.main.temp}</h1>`;
      mydegree.innerHTML = degree;
      // --------------------------------------------------------------------
      let wind = `<h1 class="fs-5 text-warning ">${result.wind.speed}</h1>`;
      mywindspped.innerHTML = wind;
      // --------------------------------------------------------------------
      let theHumidity = `<h1 class="fs-5 text-warning ">${result.main.humidity}</h1>`;
      myhumidity.innerHTML = theHumidity;
      let thePresure = `<h1 class="fs-5 text-warning ">${result.main.pressure}</h1>`;
      mypresure.innerHTML = thePresure;
      return [result.coord.lon, result.coord.lat];
    })
    // .catch((error) => {
    //   console.log(error.message);
    // })
    .then((data) => {
      fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=SS1WKIHA07HI&format=json&by=position&lat=${data[1]}&lng=${data[0]}`
      )
        .then((countrey) => countrey.json())
        .then((result) => {
          console.log(result);
          let city = `<h1 class="fs-3 text-warning">${result.cityName}/${result.countryName}</h1>`;
          mycity.innerHTML = city;
          let time = `<h1 class="  fs-3">Time :${result.formatted}</h1>`;
          mytime.innerHTML = time;
        });
    });
});
