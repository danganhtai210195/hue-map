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
// 🌊 DỮ LIỆU GIẢ LẬP (SAU NỐI GOOGLE SHEETS)
// -----------------------------
const weatherData = {
  water: 1.2,   // mực nước
  rain: 85,     // mm mưa
  storm: "không" // bão
};

// -----------------------------
// 🧠 LOGIC MÀU NGUY HIỂM
// -----------------------------
function getColor(water, rain) {
  if (water > 2 || rain > 150) return "#d60000";
  if (water > 1 || rain > 80) return "#ff9d00";
  return "#00b050";
}

// -----------------------------
// 🌍 LẤY HUẾ THẬT (OSM)
// -----------------------------
fetch("https://nominatim.openstreetmap.org/search.php?q=Thua+Thien+Hue&polygon_geojson=1&format=geojson")
  .then(res => res.json())
  .then(data => {

    const feature = data.features[0];

    map.addSource('hue', {
      type: 'geojson',
      data: feature
    });

    // 🎨 màu theo mưa + nước
    map.addLayer({
      id: 'hue-fill',
      type: 'fill',
      source: 'hue',
      paint: {
        'fill-color': getColor(weatherData.water, weatherData.rain),
        'fill-opacity': 0.55
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

    // 📍 popup
    map.on('click', 'hue-fill', () => {
      alert(
        `HUẾ\nMực nước: ${weatherData.water}m\nMưa: ${weatherData.rain}mm\nBão: ${weatherData.storm}`
      );
    });

    // 📊 panel UI
    document.getElementById('info').innerHTML =
      `🌊 Mực nước: ${weatherData.water}m<br>
       🌧️ Mưa: ${weatherData.rain}mm<br>
       🌀 Bão: ${weatherData.storm}`;

  });
