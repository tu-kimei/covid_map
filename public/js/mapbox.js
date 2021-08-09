mapboxgl.accessToken ='pk.eyJ1IjoibXJ0dWt1dGkiLCJhIjoiY2tyeDBmMjlnMGx3cjJvbzdvY2pxN3NjayJ9.FGhCyy9w1uriZC8L8XefBw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [106.6315,10.8037],
    zoom: 13
});

// Add the control to the map.
map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
);

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    })
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());





// Create a marker and add it to the map.
for (let ii = 0; ii < helper_locations.length; ii++) {
    let marker = new mapboxgl.Marker();
    marker.setLngLat([helper_locations[ii].longitude,helper_locations[ii].latitude]).addTo(map);
}
for (let ii = 0; ii < receiver_locations.length; ii++) {
    let marker = new mapboxgl.Marker({
        color: '#F84C4C'
    });
    marker.setLngLat([receiver_locations[ii].longitude,receiver_locations[ii].latitude]).addTo(map);
}


$('.add-helper-button').on('click', {typeof: 'helper'}, addHelper);
$('.add-receiver-button').on('click', {typeof: 'receiver'}, addHelper);
function addHelper(event){
    $('#inputTypeOf').attr('value', event.data.typeof);
    if (event.data.typeof == "helper") {
        $('.modal-title').text('Bạn có đồ chia sẻ?');
    } else {
        $('.modal-title').text('Bạn cần trợ giúp?');
    }

    var lat = 10.8037;
    var long = 106.6315;

    if ("geolocation" in navigator) { 
        navigator.geolocation.getCurrentPosition(position => { 
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
        }); 
    }

    $('#map-view').empty();
    var mapView = new mapboxgl.Map({
        container: 'map-view',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [long,lat],
        zoom: 15
    });

    

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'country,region,place,postcode,locality,neighborhood',
        marker: {
            color: 'orange'
        },
    });
    $('#geocoder').empty();
    geocoder.addTo('#geocoder');
    $('#geocoder').find('input').attr('name','address');
    geocoder.on('result', function (e) {
        if (mapView.getLayer('point')) mapView.removeLayer('point');
        if (mapView.getSource('point')) mapView.removeSource('point');

        $('#address #add-lat').attr('value', e.result.center[1]);
        $('#address #add-long').attr('value', e.result.center[0]);
        
        mapView.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'Point',
                'coordinates': e.result.center
            }
        });
         
        mapView.addLayer({
            'id': 'point',
            'source': 'point',
            'type': 'circle',
            'paint': {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
        });
        mapView.flyTo({
            center: e.result.center,
            zoom: 15
        });

    });


    $.getJSON('/item_list',function(result){
        $('.item_list').empty();
        $.each(result, function(i, item){
            let formGroupHTML = '<div class="form-group row">';
            formGroupHTML += '    <label class="col-sm-4 col-form-label" for="exampleInputEmail1">'+item.name+'</label>'
            formGroupHTML += '    <input type="text" class="col-sm-6 form-control" id="'+item._id+'" placeholder="Enter quantity" name="item-'+item._id+'" data-name="'+item.name+'" data-unit="'+item.unit+'">';
            formGroupHTML += '    <label class="col-sm-2 col-form-label" >'+item.unit+'</label>'
            formGroupHTML += '</div>';

            $('.item_list').append(formGroupHTML);
        });
    });

    $('#addHelperModal').modal('show');
}


$('.submit-helper-form').click( function() {
    let data = $('#add-helper-form').serialize();
    let items = [];
    $('.item_list').find('input').each(function(index, item){
        if($(item).val()){
            items.push(
                {
                    id: $(item).attr('id'),
                    name: $(item).data('name'),
                    unit: $(item).data('unit'),
                    quantity: $(item).val()
                }
            );
        }
    });
    data += "&items="+JSON.stringify(items);

    $.ajax({
        url: '/helper/create',
        type: 'post',
        dataType: 'json',
        data: data,
        success: function(res) {
            // ... do something with the data...
            console.log(JSON.parse(res.status));
            console.log(JSON.parse(res));
        }
    });
});