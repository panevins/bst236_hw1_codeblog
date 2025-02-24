// Function to fetch data from measuretest.txt and create a histogram with 20 bins
import Chart from 'chart.js/auto'
fetch('measuretest.txt')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const values = [];

        rows.forEach(row => {
            const [, temperature] = row.split(';');
            values.push(parseFloat(temperature));
        });

        // Determine the range of the data
        const min = Math.min(...values);
        const max = Math.max(...values);
        const binSize = (max - min) / 20;

        // Create bins
        const bins = Array(20).fill(0);
        values.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binSize), 19);
            bins[binIndex]++;
        });

        // Create labels for bins
        const labels = bins.map((_, index) => {
            const binStart = (min + index * binSize).toFixed(2);
            const binEnd = (min + (index + 1) * binSize).toFixed(2);
            return `${binStart} - ${binEnd}`;
        });

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
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
                }
            }
        });
    })
    .catch(error => console.error('Error fetching the measurements:', error));