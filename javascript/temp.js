var coffee = [], bar = [], cafeteria = [],
    college = [], deli = [], fastfood = [], restaurant = [], grocery = [],
    seafood = [], carry = [], bakery = [];
function isNot(obj) {
    if (obj.category == 'N/A' || obj.category == 'Private School'
        || obj.category == 'Public School' || obj.category == 'Fire/Community Hall' || obj.category == 'Banquet Hall/Ballroom' ||
        obj.category == 'Casino' || obj.category == 'Church/Temple/Mosque' || obj.category == 'Health Care Facility' ||
        obj.category == 'Dollar Store' || obj.category == 'Convenience Store' || obj.category == 'Full Service' ||
        obj.category == 'Gas Station Store' || obj.category == 'Ice Cream' || obj.category == 'Catering Only' ||
        obj.category == 'Group Home' || obj.category == 'Meat/Poultry Market' || obj.category == 'Pre-Packaged Only' ||
        obj.category == 'Snack Bar/Concession Stand' || obj.category == 'Multiple Facilities' || obj.category == 'Hotel' ||
        obj.category == 'Limited Service' || obj.category == 'Private Club' || obj.category == 'Stadium/Amusement Park') {
        return false;
    }
    return true;
}
function pushToArray(arr, obj) {
    const index = arr.findIndex((e) => e.establishment_id === obj.establishment_id);
    if (isNot(obj)) {
        if (obj.inspection_date) {
            if (index === -1) {
                arr.push(obj);
            } else {

                if (arr[index].inspection_date > obj.inspection_date) {
                    arr[index] = obj;
                }
            }
        }
    }

    return arr;
}
function compliance(property) {
    if (property == 'Compliant - No Health Risk') {
        return 'green'
    }
    return 'red'
}
function imgType(category) {
    if (category == 'Cafeteria' || category == 'Carry-out') {
        return '.png'
    }
    return '.gif'
}
function iconHandler(property) {

    var imgtype = imgType(property.category);

    if (property.category == 'Bakery' || property.category == 'Bakery/Catering') {
        return 'images/' + 'Bakery' + compliance(property.inspection_results) + imgtype;
    }
    else if (property.category == 'Bar/Tavern/Lounge') {
        return 'images/' + 'bar' + compliance(property.inspection_results) + imgtype;
    }
    else if (property.category == 'College/University') {
        return 'images/' + 'college' + compliance(property.inspection_results) + imgtype
    }
    else {
        return 'images/' + property.category + compliance(property.inspection_results) + imgtype
    }


}
var clusterOptions = { showCoverageOnHover: false, maxClusterRadius: 50, spiderfyOnMaxZoom: true };
var baseUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var baseAttribution = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>';
var maxZoom = 20;
var opacity = 1.0;
var subdomains = 'abc';
var basemap = new L.TileLayer(baseUrl, { maxZoom: maxZoom, attribution: baseAttribution, subdomains: subdomains, opacity: opacity });
var map = new L.Map('mapid', {
    center:new L.LatLng(38.7849, -76.872),
    zoom: 10,
    maxZoom: maxZoom,
    layers: [basemap],
});
map.setView([38.7849, -76.872], 10);
var clusterOptions = { showCoverageOnHover: false, maxClusterRadius: 50, spiderfyOnMaxZoom: true };
var data = $.ajax({
    url: "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json",
    dataType: "json",
    success: console.log("Data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})
var popupOpts = {
    autoPanPadding: new L.Point(5, 50),
    autoPan: true
};
$.when(data).done(function () {
    var unclean = data.responseJSON;
    var clean = [];
    console.log(unclean);
    for (let i = 0; i < unclean.length; i++) {
        var temp = unclean[i];
        clean = pushToArray(clean, temp);
    }
    var mcg = new L.MarkerClusterGroup(clusterOptions).addTo(map);
    var coffeeGroup = L.featureGroup.subGroup(mcg);
    var barGroup = L.featureGroup.subGroup(mcg);
    var carryGroup = L.featureGroup.subGroup(mcg);
    var cafeteriaGroup = L.featureGroup.subGroup(mcg);
    var seafoodGroup = L.featureGroup.subGroup(mcg);
    var restaurantGroup = L.featureGroup.subGroup(mcg);
    var groceryGroup = L.featureGroup.subGroup(mcg);
    var deliGroup = L.featureGroup.subGroup(mcg);
    var collegeGroup = L.featureGroup.subGroup(mcg);
    var fastfoodGroup = L.featureGroup.subGroup(mcg);
    var bakeryGroup = L.featureGroup.subGroup(mcg);
    for (let i = 0; i < clean.length; i++) {
        point = clean[i];
        if (point.hasOwnProperty('geocoded_column_1')) {
            var popup = '<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
            popup += '<tr><th>' + point.name + '</th><td>' + '</td></tr>';
            popup += "</table></popup-content>";
            
            var lat=point.geocoded_column_1.coordinates[1];
            var lng=point.geocoded_column_1.coordinates[0];
            console.log(point.geocoded_column_1.coordinates);
            marker = L.marker([lat,lng], {
                icon: L.icon({
                    iconUrl: iconHandler(point),
                    iconSize: [20, 20]
                })
            });
            marker.bindPopup(popup, popupOpts);
            switch (point.category) {
                    case 'Carry-out':
                        marker.addTo(carryGroup)
                        break;
                    case 'Fast Food':
                        marker.addTo(fastfoodGroup)
                        break;
                    case 'Coffee Shop':
                        marker.addTo(coffeeGroup);
                        break;
                    case 'Seafood':
                        marker.addTo(seafoodGroup)
                        break;
                    case 'Deli':
                        marker.addTo(deliGroup)
                        break;
                    case 'Grocery Store':
                        marker.addTo(groceryGroup)
                        break;
                    case 'Cafeteria':
                        marker.addTo(cafeteriaGroup)
                        break;
                    case 'Bakery':
                        marker.addTo(bakeryGroup)
                        break;
                    case 'Bakery/Catering':
                      marker.addTo(bakeryGroup)
                        break;
                    case 'Restaurant':
                        marker.addTo(bakeryGroup);
                        break;
                    case 'College/University':
                        marker.addTo(collegeGroup);
                        break;
                    case 'Bar/Tavern/Lounge':
                       marker.addTo(barGroup);
                        break;
                
            }
        }
    }
    /*
 

/*
control.addOverlay(cafeteriaGroup, 'Cafeteria');
control.addOverlay(collegeGroup, 'College');
control.addOverlay(carryGroup, 'Carry');
control.addOverlay(fastfoodGroup, 'Fast food');
control.addOverlay(deliGroup, 'Deli');
control.addOverlay(groceryGroup, 'Groceries');
control.addOverlay(barGroup, 'Bar');
control.addOverlay(bakeryGroup, 'Bakery');
control.addOverlay(seafoodGroup, 'Seafood');
control.addOverlay(restaurantGroup, 'Restaurant');
*/
var overlays={};
overlays["Bakery"]=bakeryGroup;
overlays["Bar"]=barGroup;
overlays["Cafeteria"]=cafeteriaGroup;
overlays["Carry-out"]=carryGroup;
overlays["Coffeee"]=coffeeGroup;
overlays["College"]=collegeGroup;
overlays["Deli"]=deliGroup;
overlays["Fast Food"]=fastfoodGroup;
overlays["Groceries"]=groceryGroup;
overlays["Restaurant"]=restaurantGroup;
overlays["Seafood"]=seafoodGroup;
  
  var control = L.control.layers(null, overlays, {collapsed: true });;
  map.addControl(control);
  
/*
carryGroup.addTo(map);
cafeteriaGroup.addTo(map);
seafoodGroup.addTo(map);
bakeryGroup.addTo(map); 
deliGroup.addTo(map);
restaurantGroup.addTo(map);
fastfoodGroup.addTo(map);
collegeGroup.addTo(map); 
groceryGroup.addTo(map);
barGroup.addTo(map);
*/
});

