// Function to fetch data from measurements.txt and create a histogram
fetch('visualize-temp/measurements.txt')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const labels = [];
        const values = [];

        rows.forEach(row => {
            const [name, temperature] = row.split(';');
            labels.push(name);
            values.push(parseFloat(temperature));
        });

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Temperature',
                    data: values,
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