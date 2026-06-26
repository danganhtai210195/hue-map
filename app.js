// kiểm tra xem thư viện có load không
if (typeof ol === "undefined") {
  alert("Không tải được OpenLayers (Internet bị chặn hoặc lỗi mạng)");
}

// tạo bản đồ
const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([107.585, 16.463]), // Huế
    zoom: 11
  })
});

// test marker
const marker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([107.585, 16.463])
  )
});

const vectorSource = new ol.source.Vector({
  features: [marker]
});

const vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

map.addLayer(vectorLayer);