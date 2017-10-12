

// This script demonstrates some simple things one can do with leaflet.js


var map = L.map('map').setView([40.71,-73.93], 14);




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

var diamondlen = 40
var diamondwid = 6
var fillopac = 0.9

var salesGeoJSON

// let's add sales data
$.getJSON( "geojson/sales.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var sales = data;

    console.log(sales)

    // dots
    var salesDisplay = function (feature, latlng){
        var salesMarker = new L.RegularPolygonMarker(latlng,{
            numberOfSides: 4,
            rotation: 0,
            radiusX: diamondlen,
            radiusY: diamondwid,
            fillOpacity: fillopac,
            fillColor: '#9354BC',
            stroke: false,
            opacity: 0.8,
            color: '#9354BC',
            gradient: false
        });
        
        

        return salesMarker;  
    }

    
    var sidebarpopup (feature, layer) {

        // let's bind some feature properties to a pop up
        layer.on("block", function(event) {
        $("<strong>BBL:</strong> " + feature.properties.BBL + 
        "<br /><strong>Address:</strong> " + feature.properties.pluto_addr +
        "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
        "<br /><strong>Sale Date:</strong> " + feature.properties._saledate +
        "<br /><strong>Sale Price:</strong> " + feature.properties.price +
        "<br /><strong>Price Per Gross Sq Ft ($/gsf):</strong> " + feature.properties.ppgsf3
        )}
    );
    

    salesGeoJSON = L.geoJson(sales, {
        pointToLayer: salesDisplay,
        onEachFeature: sidebarpopup
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
        var hpdcomplaintsMarker = new L.RegularPolygonMarker(latlng,{
            numberOfSides: 4,
            rotation: 72,
            radiusX: diamondlen,
            radiusY: diamondwid,
            fillOpacity: fillopac,
            fillColor: '#FED766',
            stroke: false,
            opacity: 0.8,
            color: '#FED766',
            gradient: false
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
            rotation: 144.0,
            radiusX: diamondlen,
            radiusY: diamondwid,
            fillOpacity: fillopac,
            fillColor: '#157AA5',
            stroke: false,
            opacity: 0.8,
            color: '#157AA5',
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
        var dobcomplaintsMarker = new L.RegularPolygonMarker(latlng,{
            numberOfSides: 4,
            rotation: 216.0,
            radiusX: diamondlen,
            radiusY: diamondwid,
            fillOpacity: fillopac,
            fillColor: '#66D13C',
            stroke: false,
            opacity: 0.8,
            color: '#66D13C',
            gradient: false
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


var dobjobsGeoJSON

// let's add DOB jobs data
$.getJSON( "geojson/dobjobs.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dobjobs = data;

    console.log(dobcjobs)

    // dots
    var dobjobsDisplay = function (feature, latlng){
        var dobjobsMarker = new L.RegularPolygonMarker(latlng,{
            numberOfSides: 4,
            rotation: 216.0,
            radiusX: diamondlen,
            radiusY: diamondwid,
            fillOpacity: fillopac,
            fillColor: '#EA1943',
            stroke: false,
            opacity: 0.8,
            color: '#EA1943',
            gradient: false
        });

        
        return dobjobsMarker;  
    }

    var dobjobsClick = function (feature, layer) {

        // let's bind some feature properties to a pop up
        layer.bindPopup("<strong>BBL:</strong> " + feature.properties.BBL + 
        "<br /><strong>Address:</strong> " + feature.properties.pluto_addr +
        "<br /><strong>DOB Complaints:</strong> " + feature.properties._dobcompla
    
    );
    }

    dobjobsGeoJSON = L.geoJson(dobjobs, {
        pointToLayer: dobjobsDisplay,
        onEachFeature: dobjobsClick
    }).addTo(map);


});
