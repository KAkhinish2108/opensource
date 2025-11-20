document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
    const apikey = "85825b41e4d2bbe49b60bd39e7e4e8c2";
    const city = "Bengaluru";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${"Bengaluru"}&units=metric&appid=${"85825b41e4d2bbe49b60bd39e7e4e8c2"}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById("weatherOutput").textContent = JSON.stringify(data, null, 2);

    })
    .catch(err => {
        console.log("Error:", err);
    });

}