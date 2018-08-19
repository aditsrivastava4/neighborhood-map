// Handle Google Maps API
let map;
let searchPlace;
let markers = [];
let placesList = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 18.52043, lng: 73.856744 },
        zoom: 15
    });
    var autoComplete = new google.maps.places.Autocomplete(document.getElementById('filterOption'));
}

function search(self) {
    // Search for the place 
    searchPlace = document.getElementById('filterOption').value;
    if(searchPlace != "") {
        removeMarkers();
    }
    let getLatLng = new google.maps.Geocoder();

    getLatLng.geocode(
        {
            address: searchPlace
        },
        function(responseData, status) {
            if(status=='ZERO_RESULTS') {
                if(!$('#zeroResult').is(':visible')) {
                    $('#zeroResult').show();
                }
                $('#zeroResult').text('Place Not Found');
            }
            else if(status=='OK') {
                if($('#zeroResult').is(':visible')) {
                    $('#zeroResult').hide();
                }
                map.setCenter(responseData[0].geometry.location);
                placeservice(self);
            }
        }
    );
}

function createMarkers(self) {
    let bounds = new google.maps.LatLngBounds();
    self.result().forEach(function(place) {
        let marker = createMarker(place);
        bounds.extend(marker.position);
        markers.push(marker);
    });
    map.fitBounds(bounds);
}

function createMarker(place) {
    // Will create marker on location passed
    let marker = new google.maps.Marker({
        position: place.location,
        map: map,
        title: place.name
    });
    return marker;
}

function removeMarkers() {
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];
}
