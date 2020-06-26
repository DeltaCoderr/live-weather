window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  
  //Requires geoLocation to track your current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(postion => {
      long = postion.coords.longitude;
      lat = postion.coords.latitude;
      //Access the api from proxy
      const proxy = "https://cors-anywhere.herokuapp.com/";
      //Your API goes here 
      const api = `${proxy}[your API here]${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //Formula For Celsius
          let celsius = (temperature - 32) * (5 / 9);

          //Set Icons
          setIcons(icon, document.querySelector(".icon"));

          //Change degree to Celsius/Farheneit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.floor(celsius * 10) / 10;
            } else {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
    //function of setIcons
    function setIcons(icon, iconID) {
      const skycons = new Skycons({ color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
  }
});
