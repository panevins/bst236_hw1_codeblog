const data = {
    "Abha": {
      "median": 18.0,
      "std": 10.0
    },
    "Abidjan": {
      "median": 26.0,
      "std": 10.0
    },
    "Ab\u00e9ch\u00e9": {
      "median": 29.4,
      "std": 10.0
    },
    "Accra": {
      "median": 26.4,
      "std": 10.0
    }
  };
  
  // Extract temperatures
  const values = Object.values(data).map(row => row.median);
  
  // Determine the range of the data
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  const ctx = document.getElementById('myChart5').getContext('2d');
  let myChart;
  
  function updateChart(binCount) {
      const binSize = (max - min) / binCount;
  
      // Create bins
      const bins = Array(binCount).fill(0);
      const binData = Array(binCount).fill().map(() => []);
      values.forEach((value, index) => {
          const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
          bins[binIndex]++;
          binData[binIndex].push(Object.entries(data)[index][1]);
      });
  
      // Create labels for bins
      const labels = bins.map((_, index) => {
          const binStart = (min + index * binSize).toFixed(1);
          const binEnd = (min + (index + 1) * binSize).toFixed(1);
          return `${binStart} - ${binEnd}`;
      });
  
      if (myChart) {
          myChart.destroy();
      }
  
      myChart = new Chart(ctx, {
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
          plugins: {
            title: {
              display: true,
              text: 'Median Temperature of Cities'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const binCities = binData[index];
              const binTemps = binCities.map(city => city.median);
              const binMin = Math.min(...binTemps);
              const binMax = Math.max(...binTemps);
              const binMean = (binTemps.reduce((sum, temp) => sum + temp, 0) / binTemps.length).toFixed(1);
              const minTempCity = Object.keys(data).find(city => data[city].median === binMin);
              const maxTempCity = Object.keys(data).find(city => data[city].median === binMax);
              const cityNames = binCities.map(city => Object.keys(data).find(key => data[key] === city)).join(', ');
  
              // Display the associated cities and statistics
              const infoText = `
                <p><strong>Selected Category: ${labels[index]}</strong></p>
                <p>Lowest Median Temperature: ${binMin} (City: ${minTempCity})</p>
                <p>Average Median Temperature of this Category: ${binMean}</p>
                <p>Highest Median Temperature: ${binMax} (City: ${maxTempCity})</p>
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