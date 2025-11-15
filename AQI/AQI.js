document.getElementById("getAQIBtn").addEventListener("click", getAQI);

function getAQI() {
    const apikey = "85825b41e4d2bbe49b60bd39e7e4e8c2";

    const lat = 12.9716;
    const lon = 77.5946;

    const url  = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${"12.9716"}&lon=${"77.5946"}&appid=${"85825b41e4d2bbe49b60bd39e7e4e8c2"}`;

    fetch (url)
    .then(response => response.json())
    .then(data => {
        document.getElementById("aqiOutput").textContent = JSON.stringify(data, null, 2);

    })
    .catch(err => {
        console.log("Error:", err);
    });
}