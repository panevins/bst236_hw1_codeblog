const data = {
  "Abha": {
      "latitude": 18.2,
      "longitude": 42.5,
      "mean_temperature": 18.0
  },
  "Abidjan": {
      "latitude": 5.3,
      "longitude": -4.0,
      "mean_temperature": 26.0
  },
  "Abéché": {
      "latitude": 13.2,
      "longitude": 20.8,
      "mean_temperature": 29.4
  },
  "Accra": {
      "latitude": 5.6,
      "longitude": -0.2,
      "mean_temperature": 26.4
  },
  "Addis Ababa": {
      "latitude": 9.0,
      "longitude": 38.7,
      "mean_temperature": 16.0
  }  
};

// Extract temperatures
const values = Object.values(data).map(row => row.mean_temperature);

// Determine the range of the data
const min = Math.min(...values);
const max = Math.max(...values);

const ctx = document.getElementById('myChart5').getContext('2d');
let myChart;

function interpolateColor(value, min, max) {
    const ratio = (value - min) / (max - min);
    const r = Math.floor(255 * ratio);
    const g = 0;
    const b = Math.floor(255 * (1 - ratio));
    return `rgb(${r},${g},${b}, 0.4)`;
}

function updateChart(binCount) {
    const binSize = (max - min) / binCount;

    // Create bins
    const bins = Array(binCount).fill(0);
    const binData = Array(binCount).fill().map(() => []);
    const binMeans = Array(binCount).fill(0);
    values.forEach((value, index) => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
        bins[binIndex]++;
        binData[binIndex].push(Object.entries(data)[index][1]);
    });

    // Calculate mean for each bin
    binData.forEach((bin, index) => {
        if (bin.length > 0) {
            const mean = bin.reduce((sum, city) => sum + city.mean_temperature, 0) / bin.length;
            binMeans[index] = mean;
        }
    });

    // Create labels for bins
    const labels = bins.map((_, index) => {
        const binStart = (min + index * binSize).toFixed(1);
        const binEnd = (min + (index + 1) * binSize).toFixed(1);
        return `${binStart} - ${binEnd}`;
    });

    // Determine colors for bins
    const colors = binMeans.map(mean => interpolateColor(mean, min, max));

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: bins,
          backgroundColor: colors,
          borderColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Categories of Mean Temperatures in Cities'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            title: {
              display: true,
              text: 'Number of Cities'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Mean Temperature (°C)'
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const binCities = binData[index];
            const binTemps = binCities.map(city => city.mean_temperature);
            const binMin = Math.min(...binTemps);
            const binMax = Math.max(...binTemps);
            const binMean = (binTemps.reduce((sum, temp) => sum + temp, 0) / binTemps.length).toFixed(1);
            const minTempCity = Object.keys(data).find(city => data[city].mean_temperature === binMin);
            const maxTempCity = Object.keys(data).find(city => data[city].mean_temperature === binMax);
            const cityNames = binCities.map(city => Object.keys(data).find(key => data[key] === city)).join(', ');

            // Display the associated cities and statistics
            const infoText = `
              <p><strong>Selected Category: ${labels[index]}</strong></p>
              <p>Lowest Mean Temperature: ${binMin} (City: ${minTempCity})</p>
              <p>Average Mean Temperature of this Category: ${binMean}</p>
              <p>Highest Mean Temperature: ${binMax} (City: ${maxTempCity})</p>
              <p>Cities in this Category: ${cityNames}</p>
            `;
            document.getElementById('infoText').innerHTML = infoText;
          }
        }
      }
    });
}

document.getElementById('binInput').addEventListener('input', (event) => {
    const binCount = parseInt(event.target.value, 10);
    if (binCount > 0) {
        updateChart(binCount);
    }
});

// Initial chart update
updateChart(3);