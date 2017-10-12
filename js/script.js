

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

// create control for geocoding
L.Control.geocoder().addTo(map);



var salesGeoJSON

// let's add sales data
$.getJSON( "geojson/sales.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var sales = data;

    console.log(sales)

    // dots
    var salesDisplay = function (feature, latlng){
        var salesMarker = L.circleMarker(latlng, {
            stroke: 3,
            color: '#2ca25f',
            radius: 11,
            // fillColor: '#2ca25f',
            // fillOpacity: 0.5
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
            stroke: 3,
            color:'#b53fa3',
            opacity: 1,
            // fillColor: '#b53fa3',
            // fillOpacity: 0.5,
            radius: 7
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

var hpdviolsGeoJSON

// let's add DOB complaints data
$.getJSON( "geojson/hpdviols.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var hpdviols = data;

    console.log(hpdviols)

    // dots
    var hpdviolsDisplay = function (feature, latlng){
        var hpdviolsMarker = new L.RegularPolygonMarker(latlng,{
            numberOfSides: 4,
            rotation: 45.0,
            radiusX: 25,
            radiusY: 4,
            fillOpacity: 0.8,
            fillColor: '#ea1943',
            weight: 2,
            opacity: 0.8,
            color: '#ea1943',
            gradient: false
        });
        
        
        return hpdviolsMarker;  
    
    }

    var hpdviolsClick = function (feature, layer) {

        // let's bind some feature properties to a pop up
        layer.bindPopup("<strong>BBL:</strong> " + feature.properties.BBL + 
        "<br /><strong>Address:</strong> " + feature.properties.pluto_addr +
        "<br /><strong>Class A Violations:</strong> " + feature.properties.v_class_a +
        "<br /><strong>Class B Violations:</strong> " + feature.properties.v_class_b +
        "<br /><strong>Class C Violations:</strong> " + feature.properties.v_class_c +
        "<br /><strong>Total Violations:</strong> " + feature.properties.v_total 
        
    
    );
    }

    hpdviolsGeoJSON = L.geoJson(hpdviols, {
        pointToLayer: hpdviolsDisplay,
        onEachFeature: hpdviolsClick
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
            stroke: 2,
            color: '#3f74b5',
            radius: 8
            // fillColor: '#3f74b5',
            // fillOpacity: 0.5
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


