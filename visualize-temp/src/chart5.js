fetch('combined_cities.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }) // Parse JSON
    .then(jsondata => {
        console.log(jsondata);
        const data = jsondata;
        
        // Function to extract temperatures based on selected type
        function extractTemperatures(type) {
            return Object.values(data).map(row => row[type]);
        }
        
        // Function to update the chart
        function updateChart(binCount, temperatureType) {
            const values = extractTemperatures(temperatureType);
            const min = Math.min(...values);
            const max = Math.max(...values);
            const mean = (values.reduce((sum, temp) => sum + temp, 0) / values.length).toFixed(1);
            
            // Set initial info text
            const initialInfoText = `
              <p><strong>Overall Statistics:</strong></p>
              <p>Lowest ${temperatureType.replace('_', ' ')}: ${min}</p>
              <p>Average ${temperatureType.replace('_', ' ')}: ${mean}</p>
              <p>Highest ${temperatureType.replace('_', ' ')}: ${max}</p>
            `;
            document.getElementById('infoText').innerHTML = initialInfoText;
            
            const binSize = (max - min) / binCount;
            const bins = Array(binCount).fill(0);
            const binData = Array(binCount).fill().map(() => []);
            const binMeans = Array(binCount).fill(0);
            values.forEach((value, index) => {
                const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
                bins[binIndex]++;
                binData[binIndex].push(Object.entries(data)[index]);
            });
        
            binData.forEach((bin, index) => {
                if (bin.length > 0) {
                    const mean = bin.reduce((sum, city) => sum + city[1][temperatureType], 0) / bin.length;
                    binMeans[index] = mean;
                }
            });
        
            const labels = bins.map((_, index) => {
                const binStart = (min + index * binSize).toFixed(1);
                const binEnd = (min + (index + 1) * binSize).toFixed(1);
                return `${binStart} - ${binEnd}`;
            });
        
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
                    text: `Categories of ${temperatureType.replace('_', ' ')} in Cities`
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
                      text: `${temperatureType.replace('_', ' ')} (°C)`
                    }
                  }
                },
                onClick: (event, elements) => {
                  if (elements.length > 0) {
                    const index = elements[0].index;
                    const binCities = binData[index];
                    const binTemps = binCities.map(city => city[1][temperatureType]);
                    const binMin = Math.min(...binTemps);
                    const binMax = Math.max(...binTemps);
                    const binMean = (binTemps.reduce((sum, temp) => sum + temp, 0) / binTemps.length).toFixed(1);
                    const minTempCity = binCities.find(city => city[1][temperatureType] === binMin)[0];
                    const maxTempCity = binCities.find(city => city[1][temperatureType] === binMax)[0];
                    const cityNames = binCities.map(city => city[0]);
        
                    let infoText = `
                      <p><strong>Selected Category: ${labels[index]}</strong></p>
                      <p>Lowest ${temperatureType.replace('_', ' ')}: ${binMin}°C (City: ${minTempCity})</p>
                      <p>Average ${temperatureType.replace('_', ' ')} of this Category: ${binMean}°C</p>
                      <p>Highest ${temperatureType.replace('_', ' ')}: ${binMax}°C (City: ${maxTempCity})</p>
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
        
                    if (cityNames.length > 10) {
                        document.getElementById('seeAllLink').addEventListener('click', (e) => {
                            e.preventDefault();
                            let fullList = `All Cities in this Category: `;
                            cityNames.forEach(city => {
                                fullList += `${city}, `;
                            });
                            fullList += ` `;
                            alert(`${fullList}`);
                        });
                    }
        
                    markers.forEach(marker => map.removeLayer(marker));
                    markers = [];
        
                    binCities.forEach(city => {
                        const marker = L.circleMarker([city[1].latitude, city[1].longitude], {
                            color: 'black',
                            radius: 5
                        }).addTo(map);
                        marker.bindPopup(`<b>${city[0]}</b><br>${temperatureType.replace('_', ' ')}: ${city[1][temperatureType]}°C`);
                        markers.push(marker);
                    });
        
                    const group = new L.featureGroup(markers);
                    map.fitBounds(group.getBounds());
                  }
                }
              }
            });
        }
        
        document.getElementById('binInput').addEventListener('input', (event) => {
            const binCount = parseInt(event.target.value, 10);
            const temperatureType = document.getElementById('temperatureType').value;
            if (binCount > 0) {
                updateChart(binCount, temperatureType);
            }
        });
        
        document.getElementById('temperatureType').addEventListener('change', (event) => {
            const binCount = parseInt(document.getElementById('binInput').value, 10) || 10;
            const temperatureType = event.target.value;
            updateChart(binCount, temperatureType);
        });
        
        const ctx = document.getElementById('myChart5').getContext('2d');
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
        
        // Initialize the map
        map = L.map('map').setView([0, 0], 2);
        
        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Initial chart update
        updateChart(10, 'mean_temperature');
    }) // Work with JSON data
    .catch(error => console.error('Error fetching JSON:', error));

