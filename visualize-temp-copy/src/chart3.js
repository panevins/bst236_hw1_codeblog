const data = [
    { city: 'Hanoi', temp: 13.2 },
    { city: 'Pyongyang', temp: 18.3 },
    { city: 'George Town', temp: 37.3 },
    { city: 'Lake Havasu City', temp: 4.2 },
    { city: 'Nakhon Ratchasima', temp: 14.3 },
    { city: 'Rabat', temp: 18.5 },
    { city: 'Irkutsk', temp: -2.2 }
];

// Extract temperatures
const values = data.map(row => row.temp);

// Determine the range of the data
const min = Math.min(...values);
const max = Math.max(...values);
const binSize = (max - min) / 2;

// Create bins
const bins = Array(2).fill(0);
const binData = Array(2).fill().map(() => []);
values.forEach((value, index) => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), 1);
    bins[binIndex]++;
    binData[binIndex].push(data[index]);
});

// Create labels for bins
const labels = bins.map((_, index) => {
    const binStart = (min + index * binSize).toFixed(2);
    const binEnd = (min + (index + 1) * binSize).toFixed(2);
    return `${binStart} - ${binEnd}`;
});

// Get the context of the canvas element we want to select
var ctx = document.getElementById('myChart3').getContext('2d');

// Create a new Chart object
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Number of Observations',
            data: bins,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const binCities = binData[index];
                const binTemps = binCities.map(city => city.temp);
                const binMin = Math.min(...binTemps);
                const binMax = Math.max(...binTemps);
                const binMedian = binTemps.sort((a, b) => a - b)[Math.floor(binTemps.length / 2)];
                const minTempCity = binCities.find(city => city.temp === binMin).city;
                const maxTempCity = binCities.find(city => city.temp === binMax).city;
                const cityNames = binCities.map(city => city.city).join(', ');

                // Display the associated cities and statistics
                const infoText = `
                    <p><strong>Bin: ${labels[index]}</strong></p>
                    <p>Min Temperature: ${binMin} (City: ${minTempCity})</p>
                    <p>Median Temperature: ${binMedian}</p>
                    <p>Max Temperature: ${binMax} (City: ${maxTempCity})</p>
                    <p>Cities: ${cityNames}</p>
                `;
                document.getElementById('infoText').innerHTML = infoText;
            }
        }
    }
});