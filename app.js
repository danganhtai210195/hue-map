const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256
      }
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }
    ]
  },
  center: [107.585, 16.463],
  zoom: 10.5
});

// 📍 marker Huế
new maplibregl.Marker()
  .setLngLat([107.585, 16.463])
  .setPopup(new maplibregl.Popup().setText("Thành phố Huế"))
  .addTo(map);

// 🟧 VÙNG HUẾ (KHÔNG GIẢ LẬP Ô VUÔNG NHỎ NỮA)
const huePolygon = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Khu vực TP Huế" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [107.40, 16.65],
          [107.75, 16.65],
          [107.75, 16.25],
          [107.40, 16.25],
          [107.40, 16.65]
        ]]
      }
    }
  ]
};

map.on('load', () => {

  map.addSource('hue', {
    type: 'geojson',
    data: huePolygon
  });

  // fill rõ ràng
  map.addLayer({
    id: 'hue-fill',
    type: 'fill',
    source: 'hue',
    paint: {
      'fill-color': '#ff3b00',
      'fill-opacity': 0.45
    }
  });

  // viền đậm
  map.addLayer({
    id: 'hue-line',
    type: 'line',
    source: 'hue',
    paint: {
      'line-color': '#000000',
      'line-width': 3
    }
  });

  // click popup
  map.on('click', 'hue-fill', (e) => {
    const name = e.features[0].properties.name;

    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<b>${name}</b>`)
      .addTo(map);
  });

});
