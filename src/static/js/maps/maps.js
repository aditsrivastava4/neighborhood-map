/**
 * @description maps.js Handle's Google Maps API
 */

let map; // store the map object
let markers = []; // store markers
let placesList = []; // store list of places

// for infoWindow related operation
let prevMarker = null;
let infowindow = null;
let self;

/**
 * @description initialize the google map
 */
function initMap() {
    // get map center from localStorage else it returns null
    let mapCenter = getMapCenter();
    if(mapCenter == null) {
        mapCenter = new google.maps.LatLng(
            parseFloat(18.52043),
            parseFloat(73.856744)
        );
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 15
    });

    // autoComplete field for Place
    let autoComplete = new google.maps.places.Autocomplete(document.getElementById('filterOption'));
    if(placesList.length == 0) {
        init();
    } else {
        // create markers if their is any data in localStorage
        createMarkers();
    }
}

/**
 * @description Initial Result
 */
function init() {
    if(getLS_data() == undefined || getLS_data().length == 0) {
        placeservice(self);
    }
}

/**
 * @description Search the location by geocoding
 */
function search() {
    // get the place name from autocomplete field
    let searchPlace = {
        address: document.getElementById('filterOption').value
    };
    // remove all previous markers
    removeMarkers();
    let getLatLng = new google.maps.Geocoder();

    getLatLng.geocode(
        searchPlace,
        function(responseData, status) {
            if(status == 'ZERO_RESULTS') {
                // if ZERO_RESULTS show No Result Found
                if(!self.userError()) {
                    self.userError(true);
                }
            }
            else if(status == 'OK') {
                if(self.userError()) {
                    self.userError(false);
                }
                let mapCenter = responseData[0].geometry.location;
                map.setCenter(mapCenter);
                createMapCenter(mapCenter);
                placeservice();
            }
        }
    );
}

/**
 * @description Creating markers for placeList elements
 */
function createMarkers() {
    if(placesList.length != 0) {
        let bounds = new google.maps.LatLngBounds();
        infowindow = new google.maps.InfoWindow();
        placesList.forEach(function(place) {
            let result = createMarker(place);
            let marker = result.marker;

            marker.addListener('click', function() {
                // adding event Listener to open InfoWindow
                createInfoWindow(this, infowindow, place);
            });
            marker.addListener('mouseover',function() {
                // adding event Listener to change marker icon on mouseover
                let icon = {
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new google.maps.Size(42,48)
                };
                marker.setIcon(icon);
            })

            marker.addListener('mouseout',function() {
                // adding event Listener to change icon back to default
                marker.setIcon(result.icon);
            })

            bounds.extend(marker.position);
            markers.push(marker);
        });
        // to show all the markers
        map.fitBounds(bounds);
    }
}

/**
 * @description Creating a Marker
 * @param {Object} place - Details of the place
 * @returns {Object} it contains a marker object and a icon object
 */
function createMarker(place) {
    // Will create marker on location passed
    let icon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(30,28)
    };
    // setting default icon for the marker

    // creating a marker object
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

/**
* @description Creating InfoWindow for every Marker
* @param {Object} marker - Marker Information
* @param {Object} infoWindow
* @param {Object} place - Details of the place
*/
function createInfoWindow(marker, infowindow, place) {
    // check for same marker
    if(infowindow.marker != marker) {
        if(prevMarker != null) {
            // stopping previous marker animation
            prevMarker.setAnimation(null);
        }

        marker.setAnimation(google.maps.Animation.BOUNCE);

        // InfoWindow Template
        let infoTemplate = "<div class='infoWindow'><h5>" + marker.title + "</h3>" +
            "<p>"+ place.rating +
            "&nbsp<span style='color: red;' class='glyphicon glyphicon-star'></span></p>" +
            "<p style='word-wrap: break-word;'>" + place.address + "</p>" +
            "<img id='infoImg' src=" + place.photo + " alt=" + marker.title + ">" +
            "<footer><strong>Source</strong>: Foursquare API</footer></div>";

        infowindow.marker = marker;
        infowindow.setContent(infoTemplate);
        infowindow.open(map, marker);
        prevMarker = marker;

        infowindow.addListener('closeclick',function(){
            // adding event Listener to close a marker
            marker.setAnimation(null);
            prevMarker = null;
            infowindow.marker = null;
        });
        prev_infowindow = infowindow;
    }
}


/**
 * @description Removing All the markers
 */
function removeMarkers() {
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];
}