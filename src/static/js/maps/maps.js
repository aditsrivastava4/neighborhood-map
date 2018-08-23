// Handle Google Maps API
let map;
let searchPlace;
let markers = [];
let placesList = [];

function initMap() {
    let mapCenter = getMapCenter();
    if(mapCenter == null) {
        mapCenter = {
            lat: 18.52043,
            lng: 73.856744
        };
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 15
    });
    createMarkers();
    var autoComplete = new google.maps.places.Autocomplete(document.getElementById('filterOption'));
}

function search(self) {
    // Search for the place 
    searchPlace = document.getElementById('filterOption').value;
    if(searchPlace == "") {
        removeMarkers();
        return;
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
                let mapCenter = responseData[0].geometry.location;
                map.setCenter(mapCenter);
                createMapCenter(mapCenter);
                placeservice(self);
            }
        }
    );
}

function createMarkers() {
    if(placesList.length != 0) {
        let bounds = new google.maps.LatLngBounds();
        let infowindow = new google.maps.InfoWindow();
        placesList.forEach(function(place) {
            let marker = createMarker(place);

            marker.addListener('click', function() {
                createInfoWindow(this, infowindow, place.photo);
            });

            bounds.extend(marker.position);
            markers.push(marker);
        });
        map.fitBounds(bounds);
    }
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


function createInfoWindow(marker, infowindow, photo) {
    

    if(infowindow.marker != marker) {
        let infoTemplate = "<h5>" + marker.title + "</h3>" +
            "<img src="+photo+" alt="+marker.title+">";
        infowindow.marker = marker;
        infowindow.setContent(infoTemplate);
        infowindow.open(map, marker);
    }
}