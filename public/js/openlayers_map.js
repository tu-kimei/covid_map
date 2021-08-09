class mapClass {
  constructor() {
    this.map = {};
  }
  
  init(lat, long) {
    this.map = new ol.Map({
      target: 'map',
      layers: [new ol.layer.Tile({
          source: new ol.source.OSM()
        })],
      view: new ol.View({
        center: ol.proj.fromLonLat([long,lat]),
        zoom: 10
      })
    });
  }


  markupHelper(helpers){
    let iconFeatures = [];
    
    for (let i = 0; i < helpers.length; i++) {
      var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([helpers[i].longitude,helpers[i].latitude]))
      });

      console.log(helpers[i]);

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'http://localhost:3000/image/red-flag.png',
        }),
      });

      iconFeature.setStyle(iconStyle);

      iconFeatures.push(iconFeature);
    }
    


    const vectorSource = new ol.source.Vector({
      features: iconFeatures,
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });

    this.map.addLayer(vectorLayer);
  }
}

var mapCla = new mapClass();