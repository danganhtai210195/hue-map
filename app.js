fetch("https://nominatim.openstreetmap.org/search.php?q=Thua+Thien+Hue&polygon_geojson=1&format=geojson")
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
        'fill-opacity': 0.35
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
