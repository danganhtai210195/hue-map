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
fetch('/muc_nuoc_hue.xlsx')
  .then(() => fetch('https://opensheet.elk.sh/demo/demo')) 
  .catch(() => null);

// 👉 tạm dùng dữ liệu giả (vì Excel cần convert sang Sheets sau)
const waterData = {
  "Khu vực Huế 1": 0.8,
  "Khu vực Huế 2": 1.3,
  "Khu vực Huế 3": 2.1,
  "Khu vực Huế 4": 0.5,
  "Khu vực Huế 5": 2.8,
  "Khu vực Huế 6": 1.7
};

function getColor(value) {
  if (value > 2) return "#e60000";   // đỏ
  if (value > 1) return "#ff9900";   // cam
  return "#00b050";                  // xanh
}
