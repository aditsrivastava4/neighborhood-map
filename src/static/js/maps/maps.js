// Handle Google Maps API
let map;
let ll;
let markers = [];
let placesList = [];
let prevMarker = null;
let infowindow = null;

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
    let searchPlace = document.getElementById('filterOption').value;
    removeMarkers();
    let getLatLng = new google.maps.Geocoder();

    getLatLng.geocode(
        {
            address: searchPlace
        },
        function(responseData, status) {
            if(status=='ZERO_RESULTS') {
                if(!self.userError()) {
                    self.userError(true);
                }
            }
            else if(status=='OK') {
                if(self.userError()) {
                    self.userError(false);
                }
                let mapCenter = responseData[0].geometry.location;
                ll = mapCenter;
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
        infowindow = new google.maps.InfoWindow();
        placesList.forEach(function(place) {
            let result = createMarker(place);
            let marker = result.marker;

            marker.addListener('click', function() {
                createInfoWindow(this, infowindow, place);
            });
            marker.addListener('mouseover',function() {
                let icon = {
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new google.maps.Size(42,48)
                };
                marker.setIcon(icon);
            })

            marker.addListener('mouseout',function() {
                marker.setIcon(result.icon);
            })

            bounds.extend(marker.position);
            markers.push(marker);
        });
        map.fitBounds(bounds);
    }
}

function createMarker(place) {
    // Will create marker on location passed
    let icon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(30,28)
    };

    let marker = new google.maps.Marker({
        position: place.location,
        map: map,
        title: place.name,
        icon: icon,
        animation: google.maps.Animation.DROP
    });
    return {
        marker: marker,
        icon: icon
    };
}

function createInfoWindow(marker, infowindow, place) {
    if(infowindow.marker != marker) {
        if(prevMarker != null) {
            prevMarker.setAnimation(null);
        }

        marker.setAnimation(google.maps.Animation.BOUNCE);
        let infoTemplate = "<div class='infoWindow'><h5>" + marker.title + "</h3>" +
            "<p>"+ place.rating +
            "&nbsp<span style='color: red;' class='glyphicon glyphicon-star'></span></p>" +
            "<p style='word-wrap: break-word;'>" + place.address + "</p>" +
            "<img id='infoImg' src=" + place.photo + " alt=" + marker.title + ">" +
            "</div><footer><strong>Source</strong>: Foursquare API</footer>";

        infowindow.marker = marker;
        infowindow.setContent(infoTemplate);
        infowindow.open(map, marker);
        prevMarker = marker;

        infowindow.addListener('closeclick',function(){
            marker.setAnimation(null);
            prevMarker = null;
            infowindow.marker = null;
        });
        prev_infowindow = infowindow;
    }
}

function removeMarkers() {
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];
}