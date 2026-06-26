// lấy ranh giới Huế từ OpenStreetMap (Overpass)
fetch("https://overpass-api.de/api/interpreter?data=[out:json];area[name=%22Th%C3%A0nh%20ph%E1%BB%91%20Hu%E1%BA%BF%22];(relation[admin_level=8](area););out%20geom;")
.then(res => res.json())
.then(osm => {

  const geojson = osmtogeojson(osm);

  map.addSource('hue', {
    type: 'geojson',
    data: geojson
  });

  map.addLayer({
    id: 'hue-fill',
    type: 'fill',
    source: 'hue',
    paint: {
      'fill-color': '#2b8cbe',
      'fill-opacity': 0.25
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

});
