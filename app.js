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


// 📍 Marker Huế
new maplibregl.Marker()
  .setLngLat([107.585, 16.463])
  .setPopup(new maplibregl.Popup().setText("TP Huế"))
  .addTo(map);


// 🗺️ Load ranh giới phường/xã
fetch('/hue-boundary.geojson')
  .then(res => res.json())
  .then(data => {

    map.addSource('hue', {
      type: 'geojson',
      data: data
    });

    // 🟧 vùng phường (làm đậm hơn, không bị mờ)
    map.addLayer({
      id: 'hue-fill',
      type: 'fill',
      source: 'hue',
      paint: {
        'fill-color': '#ff5500',
        'fill-opacity': 0.55
      }
    });

    // ⬛ viền rõ ràng
    map.addLayer({
      id: 'hue-line',
      type: 'line',
      source: 'hue',
      paint: {
        'line-color': '#000000',
        'line-width': 3
      }
    });

    // 🖱️ click xem tên phường
    map.on('click', 'hue-fill', (e) => {
      const name = e.features[0].properties.name;

      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<b>${name}</b>`)
        .addTo(map);
    });

    // 🖱️ đổi con trỏ khi hover
    map.on('mouseenter', 'hue-fill', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'hue-fill', () => {
      map.getCanvas().style.cursor = '';
    });

  });
