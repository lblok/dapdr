

$(function(){



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

    //style variables
    var diamondlen = 40
    var diamondwid = 6
    var fillopac = 0.9
    var salespurple = '#9354BC'
    var hpdcompyellow = '#FED766'
    var hpdviolblue = '#157AA5'
    var dobcomplgreen = '#66D13C'
    var dobjobsred = '#EA1943'

    var salesGeoJSON

    // let's add sales data
    $.getJSON( "geojson/sales.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var sales = data;

        // dots
        var salesDisplay = function (feature, latlng){
            var salesMarker = new L.RegularPolygonMarker(latlng,{
                numberOfSides: 4,
                rotation: 0,
                radiusX: diamondlen,
                radiusY: diamondwid,
                fillOpacity: fillopac,
                fillColor: salespurple,
                stroke: false,
                opacity: 0.8,
                color: salespurple,
                gradient: false
            });

            return salesMarker;  
        }

        var popup = new L.Popup();

        function popups (feature, layer) {

            // let's bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
            layer.on("mouseover", function (e) {
            var bounds = layer.getBounds();
            var popupContent = 
            "<strong><font size='3'>Sales</strong>" + 
            "<br /><font size='2'><strong>Address:</strong> " + feature.properties.pluto_addr +
            "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
            "<br /><strong>Sale Date:</strong> " + feature.properties._saledate + 
            "<br /><strong>Sale Price:</strong> " + feature.properties.price +
            "<br /><strong>Price / Gross Sq Ft:</strong> " + feature.properties.ppgsf3;
            popup.setLatLng(bounds.getCenter());
            popup.setContent(popupContent);
            map.openPopup(popup);
            });

            layer.on("mouseout", function (e) {
                map.closePopup(popup);
                });

            layer.on("click", function(event) {
                $('#sidebar').html("<font size ='2' ><div style='margin-bottom: 10';>BBL:  " + feature.properties.BBL + 
                "</div><br /><font size='4' class='popupfont'><u>Sales</u> " +             
                "</div><br /><font size='2'>" + feature.properties.pluto_addr +
                "<br /><font size= '3'>Residential Units:  " + feature.properties.pluto_resu +
                "<br />Sale Date:  " + feature.properties._saledate +
                "<br />Sale Price:  " + feature.properties.price +
                "<br />Price / Gross Sq Ft:  " + feature.properties.ppgsf3)
                })
        };

        salesGeoJSON = L.geoJson(sales, {
            pointToLayer: salesDisplay,
            onEachFeature: popups
        }).addTo(map);
        

    });


    var hpdcomplaintsGeoJSON

    // let's add DOB complaints data
    $.getJSON( "geojson/hpdcomplaints.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var hpdcomplaints = data;


        // dots
        var hpdcomplaintsDisplay = function (feature, latlng){
            var hpdcomplaintsMarker = new L.RegularPolygonMarker(latlng,{
                numberOfSides: 4,
                rotation: 72,
                radiusX: diamondlen,
                radiusY: diamondwid,
                fillOpacity: fillopac,
                fillColor: hpdcompyellow,
                stroke: false,
                opacity: 0.8,
                color: hpdcompyellow,
                gradient: false
            });
            
            return hpdcomplaintsMarker;  
        }

        var popup = new L.Popup();
        
            function popups (feature, layer) {
        
                // let's bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
                layer.on("mouseover", function (e) {
                var bounds = layer.getBounds();
                var popupContent = 
                "<strong><font size='3'>HPD Complaints</strong>" + 
                "<br /><font size='2'><strong>Address:</strong> " + feature.properties.pluto_addr +
                "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
                "<br /><strong>Complaints:</strong> " + feature.properties._hpdcompla;
                popup.setLatLng(bounds.getCenter());
                popup.setContent(popupContent);
                map.openPopup(popup);
                });
        
                layer.on("mouseout", function (e) {
                    map.closePopup(popup);
                    });
        
                layer.on("click", function(event) {
                    $('#sidebar').html
                    ("<font size ='2' ><div style='margin-bottom: 10';>BBL:  " + feature.properties.BBL + 
                    "</div><br /><font size='4' class='popupfont'><u>HPD Complaints</u> " +             
                    "</div><br /><font size='2'>" + feature.properties.pluto_addr +
                    "<br /><font size= '3'>Residential Units:  " + feature.properties.pluto_resu +
                    "<br />Complaints:  " + feature.properties._hpdcompla)
                    })
            };

        hpdomplaintsGeoJSON = L.geoJson(hpdcomplaints, {
            pointToLayer: hpdcomplaintsDisplay,
            onEachFeature: popups
        }).addTo(map);

        setUpListeners();
        

    });

    var hpdviolsGeoJSON

    // let's add DOB complaints data
    $.getJSON( "geojson/hpdviols.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var hpdviols = data;


        // dots
        var hpdviolsDisplay = function (feature, latlng){
            var hpdviolsMarker = new L.RegularPolygonMarker(latlng,{
                numberOfSides: 4,
                rotation: 144.0,
                radiusX: diamondlen,
                radiusY: diamondwid,
                fillOpacity: fillopac,
                fillColor: hpdviolblue,
                stroke: false,
                opacity: 0.8,
                color: hpdviolblue,
                gradient: false
            });
            
            
            return hpdviolsMarker;  
        
        }

        var popup = new L.Popup();
        
            function popups (feature, layer) {
        
                // let's bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
                layer.on("mouseover", function (e) {
                var bounds = layer.getBounds();
                var popupContent = 
                "<strong><font size='3'>HPD Violations</strong>" + 
                "<br /><font size='2'><strong>Address:</strong> " + feature.properties.pluto_addr +
                "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
                "<br /><strong>Class A:</strong> " + feature.properties.v_class_a + 
                "<br /><strong>Class B:</strong> " + feature.properties.v_class_b +
                "<br /><strong>Class C:</strong> " + feature.properties.v_class_c +
                "<br /><strong>Total:</strong> " + feature.properties.v_total 
                
                
                popup.setLatLng(bounds.getCenter());
                popup.setContent(popupContent);
                map.openPopup(popup);
                });
        
                layer.on("mouseout", function (e) {
                    map.closePopup(popup);
                    });
        
                layer.on("click", function(event) {
                    $('#sidebar').html("<font size ='2'><div style='margin-bottom: 10';>BBL:  " + feature.properties.BBL + 
                    "</div><br /><font size='4' class='popupfont'><u>HPD Violations</u> " +             
                    "</div><br /><font size='2'>" + feature.properties.pluto_addr +
                    "<br /><font size = '3'>Residential Units: " + feature.properties.pluto_resu +
                    "<br />Class A:  " + feature.properties.v_class_a +
                    "<br />Class B:  " + feature.properties.v_class_b + 
                    "<br />Class C:  " + feature.properties.v_class_b + 
                    "<br />Total:  " + feature.properties.v_total 
                ) 
                    })
            };

        hpdviolsGeoJSON = L.geoJson(hpdviols, {
            pointToLayer: hpdviolsDisplay,
            onEachFeature: popups
        }).addTo(map);


    });


    var dobcomplaintsGeoJSON

    // let's add DOB complaints data
    $.getJSON( "geojson/dobcomplaints.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var dobcomplaints = data;


        // dots
        var dobcomplaintsDisplay = function (feature, latlng){
            var dobcomplaintsMarker = new L.RegularPolygonMarker(latlng,{
                numberOfSides: 4,
                rotation: 216.0,
                radiusX: diamondlen,
                radiusY: diamondwid,
                fillOpacity: fillopac,
                fillColor: dobcomplgreen,
                stroke: false,
                opacity: 0.8,
                color: dobcomplgreen,
                gradient: false
            });

            
            return dobcomplaintsMarker;  
        }

        var popup = new L.Popup();
        
            function popups (feature, layer) {
        
                // let's bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
                layer.on("mouseover", function (e) {
                var bounds = layer.getBounds();
                var popupContent = 
                "<strong><font size='3'>DOB Complaints</strong>" + 
                "<br /><font size='2'><strong>Address:</strong> " + feature.properties.pluto_addr +
                "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
                "<br /><strong>Complaints:</strong> " + feature.properties._dobcompla;
                popup.setLatLng(bounds.getCenter());
                popup.setContent(popupContent);
                map.openPopup(popup);
                });
        
                layer.on("mouseout", function (e) {
                    map.closePopup(popup);
                    });
        
                layer.on("click", function(event) {
                    $('#sidebar').html
                    ("<font size ='2' ><div style='margin-bottom: 10';>BBL:  " + feature.properties.BBL + 
                    "</div><br /><font size='4' class='popupfont'><u>DOB Complaints</u> " +             
                    "</div><br /><font size='2'>" + feature.properties.pluto_addr +
                    "<br /><font size= '3'>Residential Units:  " + feature.properties.pluto_resu +
                    "<br />Complaints:  " + feature.properties._dobcompla)
                    })
            };


        dobcomplaintsGeoJSON = L.geoJson(dobcomplaints, {
            pointToLayer: dobcomplaintsDisplay,
            onEachFeature: popups
        }).addTo(map);


    });


    var dobjobsGeoJSON

    // let's add DOB jobs data
    $.getJSON( "geojson/dobjobs.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var dobjobs = data;


        // dots
        var dobjobsDisplay = function (feature, latlng){
            var dobjobsMarker = new L.RegularPolygonMarker(latlng,{
                numberOfSides: 4,
                rotation: 216.0,
                radiusX: diamondlen,
                radiusY: diamondwid,
                fillOpacity: fillopac,
                fillColor: dobjobsred,
                stroke: false,
                opacity: 0.8,
                color: dobjobsred,
                gradient: false
            });

            
            return dobjobsMarker;  
        }


        var popup = new L.Popup();
        
            function popups (feature, layer) {
        
                // let's bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
                layer.on("mouseover", function (e) {
                var bounds = layer.getBounds();
                var popupContent = 
                "<strong><font size='3'>DOB Permit Applications</strong>" + 
                "<br /><font size='2'><strong>Address:</strong> " + feature.properties.pluto_addr +
                "<br /><strong>Residential Units:</strong> " + feature.properties.pluto_resu +
                "<br /><strong>Alt 1:</strong> " + feature.properties._a1 +
                "<br /><strong>Alt 2:</strong> " + feature.properties._a2 +
                "<br /><strong>Demolition:</strong> " + feature.properties._dm
                
                ;
                popup.setLatLng(bounds.getCenter());
                popup.setContent(popupContent);
                map.openPopup(popup);
                });
        
                layer.on("mouseout", function (e) {
                    map.closePopup(popup);
                    });
        
                layer.on("click", function(event) {
                    $('#sidebar').html
                    ("<font size ='2' ><div style='margin-bottom: 10';>BBL:  " + feature.properties.BBL + 
                    "</div><br /><font size='3' class='popupfont'><u>DOB Permit Applications</u> " +             
                    "</div><br /><font size='2'>" + feature.properties.pluto_addr +
                    "<br /><font size= '3'>Residential Units:  " + feature.properties.pluto_resu +
                    "<br />Alt 1:  " + feature.properties._a1 +
                    "<br />Alt 2:  " + feature.properties._a2 +
                    "<br />Demolition:  " + feature.properties._dm
                )
                    })
            };



        dobjobsGeoJSON = L.geoJson(dobjobs, {
            pointToLayer: dobjobsDisplay,
            onEachFeature: popups
        }).addTo(map);




    });


    function setUpListeners() {
        $('#salesData').click(function(){
            if(map.hasLayer(salesGeoJSON)) {
                map.removeLayer(salesGeoJSON)
            } else {
                map.addLayer(salesGeoJSON);
            }
        });
    
        $('#hpdcomplaintsData').click(function(){
            if(map.hasLayer(hpdcomplaintsGeoJSON)) {
                map.removeLayer(hpdcomplaintsGeoJSON)
            } else {
                map.addLayer(hpdcomplaintsGeoJSON);
                
            }
        });
    }



})