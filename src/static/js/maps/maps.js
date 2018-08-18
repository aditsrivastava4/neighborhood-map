// Handle Google Maps API
let map;
let searchPlace;

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
                placeservice(self)
            }
        }
    );
}

