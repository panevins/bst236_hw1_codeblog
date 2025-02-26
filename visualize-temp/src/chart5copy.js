fetch('./combined_cities.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }) // Parse JSON
    .then(jsondata => {
        console.log(jsondata);
        const data = jsondata;
        // Extract temperatures
        const values = Object.values(data).map(row => row.mean_temperature);
        
        // Determine the range of the data
        const min = Math.min(...values);
        const max = Math.max(...values);
        const mean = (values.reduce((sum, temp) => sum + temp, 0) / values.length).toFixed(1);
        
        // Set initial info text
        const initialInfoText = `
          <p><strong>Overall Statistics:</strong></p>
          <p>Lowest Mean Temperature: ${min}</p>
          <p>Average Mean Temperature: ${mean}</p>
          <p>Highest Mean Temperature: ${max}</p>
        `;
        document.getElementById('infoText').innerHTML = initialInfoText;
        
        const ctx = document.getElementById('myChart5copy').getContext('2d');
        let myChart;
        let map;
        let markers = [];
        
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
                binData[binIndex].push(Object.entries(data)[index]);
            });
        
            // Calculate mean for each bin
            binData.forEach((bin, index) => {
                if (bin.length > 0) {
                    const mean = bin.reduce((sum, city) => sum + city[1].mean_temperature, 0) / bin.length;
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
                    const binTemps = binCities.map(city => city[1].mean_temperature);
                    const binMin = Math.min(...binTemps);
                    const binMax = Math.max(...binTemps);
                    const binMean = (binTemps.reduce((sum, temp) => sum + temp, 0) / binTemps.length).toFixed(1);
                    const minTempCity = binCities.find(city => city[1].mean_temperature === binMin)[0];
                    const maxTempCity = binCities.find(city => city[1].mean_temperature === binMax)[0];
                    const cityNames = binCities.map(city => city[0]);
        
                    // Display the associated cities and statistics
                    let infoText = `
                      <p><strong>Selected Category: ${labels[index]}</strong></p>
                      <p>Lowest Mean Temperature: ${binMin}°C (City: ${minTempCity})</p>
                      <p>Average Mean Temperature of this Category: ${binMean}°C</p>
                      <p>Highest Mean Temperature: ${binMax}°C (City: ${maxTempCity})</p>
                      <p>Cities in this Category: `;
                    const firstTenCities = cityNames.slice(0, 10);
                    firstTenCities.forEach((city, index) => {
                      if (index === firstTenCities.length - 1) {
                        infoText += `${city}.`;
                      } else {
                        infoText += `${city}, `;
                      }
                    });
                    if (cityNames.length > 10) {
                      infoText += ` <a href="#" id="seeAllLink">See all</a>`;
                    }
                    document.getElementById('infoText').innerHTML = infoText;
        
                    // Add event listener for "see all" link
                    if (cityNames.length > 10) {
                        document.getElementById('seeAllLink').addEventListener('click', (e) => {
                            e.preventDefault();
                            let fullList = `All Cities in this Category: `;
                            cityNames.forEach(city => {
                                fullList += `${city}, `;
                            });
                            fullList += ` `;
                            alert(`${fullList}`); // Display the full list in a pop-up 
                        });
                    }
        
                    // Clear existing markers
                    markers.forEach(marker => map.removeLayer(marker));
                    markers = [];
        
                    // Add markers to the map
                    binCities.forEach(city => {
                        const marker = L.circleMarker([city[1].latitude, city[1].longitude], {
                            color: 'black',
                            radius: 5
                        }).addTo(map);
                        marker.bindPopup(`<b>${city[0]}</b><br>Mean Temperature: ${city[1].mean_temperature}°C`);
                        markers.push(marker);
                    });
        
                    // Fit the map to the markers
                    const group = new L.featureGroup(markers);
                    map.fitBounds(group.getBounds());
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
        
        // Initialize the map
        map = L.map('map').setView([0, 0], 2);
        
        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Initial chart update
        updateChart(10);
    }) // Work with JSON data
    .catch(error => console.error('Error fetching JSON:', error));

