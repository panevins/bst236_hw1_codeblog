// Initialize the map and set its view to the world coordinates and zoom level
var map = L.map('map').setView([20, 0], 2);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// List of cities with their coordinates
var cities = [
    { name: "Abha", coords: [18.2167, 42.5000] },
    { name: "Abidjan", coords: [5.3167, -4.0333] },
    { name: "Abéché", coords: [13.8292, 20.8324] },
    { name: "Accra", coords: [5.5500, -0.2000] },
    { name: "Addis Ababa", coords: [9.0333, 38.7000] },
    // ... other cities ...
];

// Add a blue dot for the first five cities
cities.slice(0, 5).forEach(function(city) {
    L.circleMarker(city.coords, {
        color: 'blue',
        radius: 20
    }).addTo(map).bindPopup(city.name);
});

// Add a marker to the map
var marker = L.marker([20, 0]).addTo(map)
    .bindPopup('Center of the world map.')
    .openPopup();

// Add a popup on click
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);