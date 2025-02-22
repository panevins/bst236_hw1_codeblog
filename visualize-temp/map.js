// Initialize the map and set its view to the world coordinates and zoom level
var map = L.map('map').setView([20, 0], 2);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

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