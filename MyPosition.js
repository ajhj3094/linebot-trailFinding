// let map, marker, lat, lng
export default (map, marker, lat, lng) => {
  navigator.geolocation.watchPosition((position) => {
    // < script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAsBu6-iiVdTzOBBoiYTkuZtsptnRKJsTI&callback=initMap' async defer ></ script >
    // google.maps.Map.url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAsBu6-iiVdTzOBBoiYTkuZtsptnRKJsTI&callback=initMap'
    console.log(position.coords)
    lat = position.coords.latitude
    lng = position.coords.longitude
    // 初始化地圖
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: { lat: lat, lng: lng }
    })
    marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map
    })
  })
}
