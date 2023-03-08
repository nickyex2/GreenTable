
// Callback function for Google Maps API
// Calls search in Catalog.py 
// If success, calls initMap() to display map
function initialise() {
    let query = event.target.value
    console.log("initialise() running")
    var url = `http://127.0.0.1:5000/catalog/` + query;
    $.ajax({
        type: `GET`,
        url: url,
        success: function(response) {
            console.log(response)
            initMap(response);
        }
    });
}


function initMap(data) {
    console.log("initMap() running")
    let lat = data.geometry.location.lat
    let lng = data.geometry.location.lng
    console.log(lat, lng)

    let center = {lat: lat, lng: lng}
    let map = new google.maps.Map(document.getElementById('map'), {center: center,
    zoom: 20
    })
    console.log(map)

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: data.name
    });

    google.maps.event.addListener(marker, 'click', (function (marker) {
        return function () {
            infowindow.setContent(`${data.name}<br><br><br>Address: ${e[data.formatted_address]}`);
            infowindow.open(map, marker);
        }
    })(marker));

}


