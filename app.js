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
