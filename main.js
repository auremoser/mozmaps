window.onload = function() {
    var vizjson_url = 'https://team.cartodb.com/u/aureliamoser/api/v2/viz/9521c006-7e95-11e5-970b-0e3ff518bd15/viz.json'; // <-- Paste viz.json URL between quotes

    var options = {
           sql: "SELECT * FROM citylots_sf",
           // cartocss: ""
       }

       var sublayers = [];

       // instantiate map object from Leaflet
       var mapObj = new L.Map(map, {  // <-- Replace map_id with your #id for rendering
           center: [37.760000, -122.389433], // San Francisco, California
           zoom: 13 // zoom projection to adjust starting point zoom
       });

       // add basemap tiles
       L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
       }).addTo(mapObj);

       // add data tile layers here (if you have multiple layers, you can manipulate them in js here)
       cartodb.createLayer(mapObj,vizjson_url)
           .addTo(mapObj)
           .done(function(layer) {
               console.log("Map successfully created.");
               sublayers[0] = layer.getSubLayer(0);
               sublayers[1] = layer.getSubLayer(1);
               sublayers[0].set(options); // altering the SQL and CartoCSS; see above
           })
           .error(function(err) {
               console.log("Map not created: " + err);
           });
    }