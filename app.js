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

// 📍 Huế center
new maplibregl.Marker()
  .setLngLat([107.585, 16.463])
  .setPopup(new maplibregl.Popup().setText("TP Huế"))
  .addTo(map);

// 🌊 dữ liệu mực nước (giả lập để bạn nối Sheets sau)
const waterData = {
  "Huế": 1.2
};

// 🎯 lấy ranh giới thật từ OpenStreetMap (KHÔNG vẽ tay)
fetch("https://nominatim.openstreetmap.org/search.php?q=Thua+Thien+Hue&polygon_geojson=1&format=geojson")
  .then(res => res.json())
  .then(data => {

    // gán mực nước vào feature
    data.features.forEach(f => {
      f.properties.muc = waterData["Huế"] || 0;
      f.properties.name = "Thành phố Huế";
    });

    map.addSource('hue', {
      type: 'geojson',
      data: data
    });

    // 🟢🟡🔴 màu theo mực nước
    map.addLayer({
      id: 'hue-fill',
      type: 'fill',
      source: 'hue',
      paint: {
        'fill-color': [
          'case',
          ['>', ['get', 'muc'], 2], '#e60000',
          ['>', ['get', 'muc'], 1], '#ff9900',
          '#00b050'
        ],
        'fill-opacity': 0.5
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
      const f = e.features[0];
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<b>${f.properties.name}</b><br>Mực nước: ${f.properties.muc}m`)
        .addTo(map);
    });

  });
