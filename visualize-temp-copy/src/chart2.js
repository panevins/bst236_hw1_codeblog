
const data = [
        { city: 'Hanoi', temp: 13.2 },
        { city: 'Pyongyang', temp: 18.3 },
        { city: 'George Town', temp: 37.3 },
        { city: 'Lake Havasu City', temp: 4.2 },
        { city: 'Nakhon Ratchasima', temp: 14.3 },
        { city: 'Rabat', temp: 18.5 },
        { city: 'Irkutsk', temp: -2.2 }
    ];

// Get the context of the canvas element we want to select
var ctx = document.getElementById('myChart2').getContext('2d');
    
// Create a new Chart object
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data.map(row => row.city),
        datasets: [
               {
                label: 'Temperature',
                data: data.map(row => row.temp),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
                }
        ]
     },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);
