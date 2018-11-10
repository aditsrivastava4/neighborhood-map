/**
 * @description locations.js handle's Foursquare API
 */

/**
 * @description Searching Venues for the location wrt to the option
 */
function placeservice() {
    // for pre-defined filter
    let option = self.selectedFilter();
    if(option == 'Other') {
        // for user's custom filter
        option = self.otherFilter();
    }
    // emptying self.result and placesList for every search
    self.result.removeAll();
    placesList = [];

    let foursquare_data = getClient();

    let url = 'https://api.foursquare.com/v2/venues/search?';
    foursquare_data['query'] = option;
    foursquare_data['ll'] = getLatLng();

    // request to get list of venues
    $.ajax({
        url: url,
        data: foursquare_data,
        success: function(results) {
            if(results.response.venues.length != 0) {
                if(self.userError()) {
                    self.userError(false);
                }
                let venuesId = getVenueID(results);
                getVenueDetail(venuesId, function() {
                    // callback to store data in localstorage
                    createLocalStorage(function() {
                        // callback to create markers for the result locations
                        createMarkers();
                    });
                });
            } else {
                // if no result
                self.userError(true);
            }
        },
        error: function(xhr) {
            if(xhr.status == 429) {
                alert('Foursquare API Request Quota Exceeded');
            } else {
                alert('Internal Server Error');
            }
        }
    });

}

/**
 * @description Extracting the venue ID
 * @param {Object[]} results - Result from foursquare search venue API
 * @returns {string[]} list of venue ID
 */
function getVenueID(results) {
    results = results.response.venues;
    let venueId = [];
    results.forEach(function(venue) {
        venueId.push(venue.id);
    });
    return venueId;
}

/**
 * @description Getting venue detail from foursquare API
 * @callback createLocalStorage
 * @param {string[]} venuesId
 * @param {createLocalStorage} callback
 */
function getVenueDetail(venuesId, callback) {
    venuesId.forEach(function(venue, arr_index) {
        let url = 'https://api.foursquare.com/v2/venues/' + venue;
        let data = getClient();
        $.ajax({
            url: url,
            data: data,
            success: function(result, index) {
                let venueDetail = filterVenueDetail(result.response.venue, arr_index);
                self.result.push(venueDetail);
                placesList.push(venueDetail);

                // callback to function createLocalStorage()
                if(placesList.length == venuesId.length) {
                    callback();
                }
            },
            error: function(xhr) {
                if(xhr.status == 429) {
                    if(placesList.length == 0 && arr_index == (venuesId.length - 1)) {
                        alert('Foursquare API Request Quota Exceeded');
                    } else {
                        /**
                        * if their are few results before API calls limit is reached
                        * do a callback to function createLocalStorage()
                        */
                        callback();
                    }
                } else {
                    if(arr_index == (venuesId.length - 1)) {
                        alert('Internal Server Error');
                    }
                }
            }
        });
    });
}

/**
 * @description Filtering the venue detail result
 * @param {Object} detail - details of the the place
 * @param {number} index - Index of the array
 */
function filterVenueDetail(detail, index) {
    let venue = {
        name: detail.name,
        fav: false,
        listId: 'listId' + index
    };
    if(detail.rating == undefined) {
        // if their is no rating for the place
        venue['rating'] = 0.0;
    }
    else {
        venue['rating'] = detail.rating;
    }

    // converting lat lng to a LatLng object
    venue['location'] = new google.maps.LatLng(
        parseFloat(detail.location.lat),
        parseFloat(detail.location.lng)
    );
    venue['address'] = detail.location.formattedAddress.join();

    // getting the photo url
    if(detail.photos.count != 0) {
        try {
            /**
            * try catch for rare cases in which count is not 0
            * and their is no link
            */
            venue['photo'] = detail.bestPhoto.prefix + '250x250' + detail.bestPhoto.suffix;
        }
        catch(err) {
            venue['photo'] = 'Photo_404';
        }
    }
    else {
        venue['photo'] = 'Photo_404';
    }
    // Photo_404 provides a link to 404 image
    return venue;
}

/**
 * @returns {Object} foursquare client detail
 */
function getClient() {
    // return the client
    return {
        "client_id": "0WGUGR5Z3J2BU4LS53JX2T5C003D1A2S3MM1LYWQYDQIQPHN",
        "client_secret": "QFDKBNHSD2Q00C0GTHYZHUOAEHYPLDXTQ1FSZJQR2V2FSYKG",
        "v": "20180323"
    }
}

/**
 * @returns {string} lat and lng in string format
 */
function getLatLng() {
    return map.center.lat() + ',' + map.center.lng();
}