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
  zoom: 9.5
});

// -----------------------------
// 🌊 DỮ LIỆU THỜI TIẾT (GIẢ LẬP CÓ THỂ NỐI SAU)
// -----------------------------
const data = {
  water: 1.4,   // mực nước (m)
  rain: 95,     // mm
  storm: "không"
};

// -----------------------------
// 🎨 MÀU CẢNH BÁO
// -----------------------------
function color(water, rain) {
  if (water > 2 || rain > 150) return "#d60000";
  if (water > 1 || rain > 80) return "#ff9d00";
  return "#00b050";
}

// -----------------------------
// 🌍 LẤY RANH GIỚI HUẾ THẬT (OSM)
// -----------------------------
fetch("https://nominatim.openstreetmap.org/search.php?q=Thua+Thien+Hue&polygon_geojson=1&format=geojson")
  .then(r => r.json())
  .then(g => {

    const feature = g.features[0];
    feature.properties = {
      name: "Thành phố Huế",
      water: data.water,
      rain: data.rain,
      storm: data.storm
    };

    map.addSource('hue', {
      type: 'geojson',
      data: feature
    });

    // 🟧 vùng màu
    map.addLayer({
      id: 'hue-fill',
      type: 'fill',
      source: 'hue',
      paint: {
        'fill-color': color(data.water, data.rain),
        'fill-opacity': 0.55
      }
    });

    // ⬛ viền rõ
    map.addLayer({
      id: 'hue-line',
      type: 'line',
      source: 'hue',
      paint: {
        'line-color': '#000',
        'line-width': 2
      }
    });

    // 📌 click popup
    map.on('click', 'hue-fill', (e) => {
      const p = e.features[0].properties;

      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`
          <b>${p.name}</b><br>
          🌊 Mực nước: ${p.water}m<br>
          🌧️ Mưa: ${p.rain}mm<br>
          🌀 Bão: ${p.storm}
        `)
        .addTo(map);
    });

    // 📊 panel
    document.getElementById('panel').innerHTML = `
      <b>Huế - Cảnh báo</b><br>
      🌊 Mực nước: ${data.water}m<br>
      🌧️ Mưa: ${data.rain}mm<br>
      🌀 Bão: ${data.storm}
    `;
  });
