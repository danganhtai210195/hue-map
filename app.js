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
  .setPopup(new maplibregl.Popup().setText("TP Huế"))
  .addTo(map);

// 📊 dữ liệu mực nước (GIẢ LẬP TỪ EXCEL)
const waterData = {
  "Khu vực Huế 1": 0.8,
  "Khu vực Huế 2": 1.3
};

function getColor(v) {
  if (v > 2) return "#e60000";
  if (v > 1) return "#ff9900";
  return "#00b050";
}

// 🗺️ load GeoJSON
fetch('./hue-boundary.geojson')
  .then(res => res.json())
  .then(data => {

    // gắn mực nước vào từng vùng
    data.features.forEach(f => {
      const name = f.properties.name;
      f.properties.muc = waterData[name] || 0;
    });

    map.addSource('hue', {
      type: 'geojson',
      data: data
    });

    // fill màu theo mực nước
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
        'fill-opacity': 0.65
      }
    });

    // viền rõ
    map.addLayer({
      id: 'hue-line',
      type: 'line',
      source: 'hue',
      paint: {
        'line-color': '#000',
        'line-width': 2
      }
    });

    // click popup
    map.on('click', 'hue-fill', (e) => {
      const f = e.features[0];
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<b>${f.properties.name}</b><br>Mực nước: ${f.properties.muc}m`
        )
        .addTo(map);
    });

    map.on('mouseenter', 'hue-fill', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'hue-fill', () => {
      map.getCanvas().style.cursor = '';
    });

  });
