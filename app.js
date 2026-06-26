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
    layers: [{
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }]
  },
  center: [107.585, 16.463],
  zoom: 10.5
});

// marker Huế
new maplibregl.Marker()
  .setLngLat([107.585, 16.463])
  .setPopup(new maplibregl.Popup().setText("TP Huế"))
  .addTo(map);


// 🔥 LOAD RANH GIỚI THẬT (KHÔNG VẼ TAY)
fetch('hue-boundary.geojson')
  .then(res => res.json())
  .then(data => {

    map.addSource('hue', {
      type: 'geojson',
      data: data
    });

    map.addLayer({
      id: 'hue-fill',
      type: 'fill',
      source: 'hue',
      paint: {
        'fill-color': '#ff4d00',
        'fill-opacity': 0.45
      }
    });

    map.addLayer({
      id: 'hue-line',
      type: 'line',
      source: 'hue',
      paint: {
        'line-color': '#000',
        'line-width': 2
      }
    });

    map.on('click', 'hue-fill', (e) => {
      const name = e.features[0].properties.name;
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<b>${name}</b>`)
        .addTo(map);
    });

  });
