const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());





function pushToArray(arr, obj) {
    const index = arr.findIndex((e) => e.properties.establishment_id === obj.properties.establishment_id);
    if (index === -1) {
        arr.push(obj);
    } else {
        if(arr[index].inspection_date>obj.inspection_date){
        arr[index] = obj;
    }
 }
 return arr;
}


app.use(express.static('public'));


   
// var data =$.ajax({
//     url: "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.geojson",
//     dataType: "json",
//     success: console.log("Data successfully loaded."),
//     error: function(xhr) {
//         alert(xhr.statusText)
//     }
// })

// $.when(data).done(function() {
app.get('/api', (req, res) => {
    var baseUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var baseAttribution = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>';
    var center = new L.LatLng(38.7849, -76.872);
    var maxZoom = 20;
    var opacity = 1.0;
    var subdomains = 'abc';
    var basemap = new L.TileLayer(baseUrl, {maxZoom: maxZoom, attribution: baseAttribution, subdomains: subdomains, opacity: opacity });
    var map = new L.Map('mapid', {
        center: center,
        zoom: 10,
        maxZoom: maxZoom,
        layers: [basemap],
    });
map.setView([38.7849, -76.872],10);
    var markers = new L.MarkerClusterGroup();
    var points;
    const baseURL = 'https://api.umd.io/v0/courses/list';
    fetch(baseURL)
        .then((r) => r.json())
        .then(data => {
            var clean=[]
            for(var i=0;i<data.features.length;i++){
                var temp= data.features[i];
                clean= pushToArray(clean,temp,data);
            }
            console.log(clean.length)
            points = L.geoJSON(clean).addTo(map);
            markers.addLayer(points);
            map.addLayer(markers);
        })
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


/*for (var i=0;i<30;i++)
{
    var mark=data[i];
    console.log(data.location);
}*/