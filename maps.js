var map = L.map('map', {
    minZoom: 2.3,
    maxZoom: 19,
    attributionControl: false
});
var toggle = false;
var layer = L.geoJSON();
var southWest = L.latLng(-89.98155760646617, -180), northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});
map.setView([20, 0], 2.3);
map.doubleClickZoom.disable();
map.zoomControl.disable();
map.removeControl(map.zoomControl);

var tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://carto.com/">carto.com</a> contributors'
}).addTo(map);

function style(feature) {
     return {
         fillColor: "#00FF00",
         weight: 2,
         opacity: 1,
         color: 'white',
         dashArray: '3',
         fillOpacity: 0.2
     };
}

L.easyButton('fa-home', function(btn, map){
    document.documentElement.webkitRequestFullScreen();
    map.setView([20, 0], 2.3);
 }).addTo( map );

L.easyButton('fa-star', function(btn, map){
    if (!toggle){
        fetch("./data/data.json")
        .then((res) => res.json())
        .then((data) => {
            layer = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(map);
        });
        toggle = true
    }
    else{
       layer.clearLayers();
       toggle = false;
    //    layer.addTo(map);
    }

}).addTo( map );

var popup = L.popup();

// var photoImg = '<img src="https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg" height="1500px" width="1500px"/>';
var imgPathes = ["./data/visited/PER/index3.jpg", "./data/visited/PER/index2.jpg", "./data/visited/PER/index5.jpg", "./data/visited/PER/index4.jpg"];



// some list bullshit i dont really know what this does.
//
// var popupContent = '<ul>'
// imgPathes.forEach(path => popupContent += `<li><img src="${path}" height="150px" width="150px"/></li>`)
// popupContent += '</ul>'


function onEachFeature(feature, layer) {
    layer.on('click', function (e) {

        // var popupContent = '<table><tbody>'
        // imgPathes.forEach(path => popupContent += `<tr><td><img src="${path}" height="150px" width="150px"/></td></tr>`)
        // popupContent += '</tbody></table>'
        // popup
        //     .setLatLng(e.latlng)
        //     .setContent(popupContent)
        //     .openOn(map);
        axios
            .get('http://127.0.0.1:3000/')
            .then(function (response) {
                console.log(response);
            });

        console.log(e["sourceTarget"]["feature"]["properties"]["ISO_A3"]);

    });

}