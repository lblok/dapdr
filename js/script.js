

// This script demonstrates some simple things one can do with leaflet.js


var map = L.map('map').setView([40.71,-73.93], 11);

// set a tile layer to be CartoDB tiles 
var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

// add these tiles to our map
map.addLayer(Stamen_Toner);


// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
// let's add the subway lines
$.getJSON( "geojson/MTA_subway_lines.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dataset = data;
    // draw the dataset on the map
    //L.geoJson(dataset).addTo(map);
});

// let's add neighborhood data
$.getJSON( "geojson/NYC_neighborhood_data.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dataset = data;
    // draw the dataset on the map
    //L.geoJson(dataset).addTo(map);
});

var salesGeoJSON

// let's add sales data
$.getJSON( "geojson/sales.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var sales = data;

    console.log(sales)

    // dots
    var salesDisplay = function (feature, latlng){
        var salesMarker = L.circleMarker(latlng, {
            stroke: false,
            fillColor: '#2ca25f',
            fillOpacity: 0.5
        });
        
        return salesMarker;  
    }

    var salesClick = function (feature, layer) {

        // let's bind some feature properties to a pop up
        layer.bindPopup("<strong>BBL:</strong> " + feature.properties.BBL + 
        "<br /><strong>Address:</strong> " + feature.properties.pluto_addr +
        "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
        "<br /><strong>Sale Date:</strong> " + feature.properties._saledate +
        "<br /><strong>Sale Price:</strong> " + feature.properties.price +
        "<br /><strong>Price Per Gross Sq Ft ($/gsf):</strong> " + feature.properties.ppgsf3
    );
    }

    salesGeoJSON = L.geoJson(sales, {
        pointToLayer: salesDisplay,
        onEachFeature: salesClick
    }).addTo(map);


});



var hpdcomplaintsGeoJSON

// let's add DOB complaints data
$.getJSON( "geojson/hpdcomplaints.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var hpdcomplaints = data;

    console.log(hpdcomplaints)

    // dots
    var hpdcomplaintsDisplay = function (feature, latlng){
        var hpdcomplaintsMarker = L.circleMarker(latlng, {
            stroke: false,
            fillColor: '#b53fa3',
            fillOpacity: 0.5,
            radius: 2
        });
        
        return hpdcomplaintsMarker;  
    }

    var hpdcomplaintsClick = function (feature, layer) {

        // let's bind some feature properties to a pop up
        layer.bindPopup("<strong>BBL:</strong> " + feature.properties.BBL + 
        "<br /><strong>Address:</strong> " + feature.properties.pluto_addr +
        "<br /><strong>HPD Complaints:</strong> " + feature.properties._hpdcompla
    
    );
    }

    hpdomplaintsGeoJSON = L.geoJson(hpdcomplaints, {
        pointToLayer: hpdcomplaintsDisplay,
        onEachFeature: hpdcomplaintsClick
    }).addTo(map);


});




var dobcomplaintsGeoJSON

// let's add DOB complaints data
$.getJSON( "geojson/dobcomplaints.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dobcomplaints = data;

    console.log(dobcomplaints)

    // dots
    var dobcomplaintsDisplay = function (feature, latlng){
        var dobcomplaintsMarker = L.circleMarker(latlng, {
            stroke: false,
            fillColor: '#3f74b5',
            fillOpacity: 0.5
        });
        
        return dobcomplaintsMarker;  
    }

    var dobcomplaintsClick = function (feature, layer) {

        // let's bind some feature properties to a pop up
        layer.bindPopup("<strong>BBL:</strong> " + feature.properties.BBL + 
        "<br /><strong>Address:</strong> " + feature.properties.pluto_addr +
        "<br /><strong>DOB Complaints:</strong> " + feature.properties._dobcompla
    
    );
    }

    dobcomplaintsGeoJSON = L.geoJson(dobcomplaints, {
        pointToLayer: dobcomplaintsDisplay,
        onEachFeature: dobcomplaintsClick
    }).addTo(map);


});


