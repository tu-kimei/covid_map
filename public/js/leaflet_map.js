var greenIcon = L.icon({
    iconUrl: 'image/red-flag.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([40.7914, -73.94951], {icon: greenIcon}).addTo(map).bindPopup("I am a red leaf.");

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.getJSON('/maplayers',function(result){
    $.each(result, function(i, mlayer){
        $.getJSON('/mapjson/' + mlayer.name, function(data) { addLayer(data, mlayer.name ) });
    });
});

function addLayer(layer, name) {
    var leaf_layer;
    if (layer.type == "MultiPoint") {
        leaf_layer = L.geoJson(layer, { pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, layer.style); }})
        leaf_layer.bindPopup(layer.type);
    } else if (layer.type == "MultiLineString") {
        leaf_layer = L.geoJson(layer, {style: layer.style });
        leaf_layer.bindPopup(layer.type);
    } else  {
        leaf_layer = L.geoJson(layer, {
            style: function(feature) {
                switch (feature.properties.style) {
                case 'Orange': return {color: "#ff0000"};
                case 'Blue': return {color: "#0000ff"};
            }
            },
            onEachFeature: function (feature, layer) {
                 layer.bindPopup(feature.properties.name);
             }
         });
    }
    leaf_layer.addTo(map);
    
    $('#' + name).click(function(e) {
        
        if (map.hasLayer(leaf_layer)) {
            map.removeLayer(leaf_layer);
        } else {
            map.addLayer(leaf_layer);
        }
    });
}
