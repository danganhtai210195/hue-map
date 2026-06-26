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
  zoom: 11
});

// marker Huế
new maplibregl.Marker()
  .setLngLat([107.585, 16.463])
  .setPopup(new maplibregl.Popup().setText("TP Huế"))
  .addTo(map);

// load ranh giới phường
fetch('/hue-boundary.geojson')
  .then(res => res.json())
  .then(data => {

    map.addSource('hue', {
      type: 'geojson',
      data: data
    });

    // viền phường
    map.addLayer({
      id: 'hue-fill',
      type: 'fill',
      source: 'hue',
      paint: {
        'fill-color': '#2b8cbe',
        'fill-opacity': 0.2
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

    // click từng phường
    map.on('click', 'hue-fill', (e) => {
      const name = e.features[0].properties.name;

      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setText(name)
        .addTo(map);
    });

  });
