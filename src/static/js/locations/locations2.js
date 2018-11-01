function placeservice(self) {
    let option = self.selectedFilter();
    if(option == 'Other') {
        option = self.otherFilter();
    }
    // emptying result ko.observableArray for every search
    self.result.removeAll();
    placesList = [];
    // let results;

    let foursquare_data = getClient();
    
    let url = 'https://api.foursquare.com/v2/venues/search?';
    foursquare_data['query'] = option;
    foursquare_data['ll'] = getLatLng();
    console.log(foursquare_data)
    $.ajax({
        url: url,
        data: foursquare_data,
        success: function(results) {
            let venuesId = getVenueID(results);
            getVenueDetail(venuesId);
        }
    });

}

function getVenueID(results) {
    results = results.response.venues;
    let venueId = [];
    results.forEach(function(venue) {
        venueId.push(venue.id);
    });
    return venueId;
}

function getVenueDetail(venuesId) {
    venuesId.forEach(function(venue) {
        let url = 'https://api.foursquare.com/v2/venues/' + venue;
        let data = getClient();
        $.ajax({
            url: url,
            data: data,
            success: function(result) {
                console.log(result)
                let a = filterVenueDetail(result.response.venue);
            }
        })
    });
}

function filterVenueDetail(detail) {
    let venue = {
        name: detail.name,
        rating: detail.rating,
        fav: false
    };
    venue['latLng'] = {
        lat: detail.location.lat,
        lng: detail.location.lng
    };
    venue['address'] = detail.location.formattedAddress.join();
    venue['photo'] = detail.bestPhoto.prefix + '250x250' + detail.bestPhoto.suffix;
    console.log(venue)
    return venue;
}

// {
//     results.forEach(function(place, index) {
//         if(typeof(place) != 'undefined') {
//             let photoURL;
//             if(place.hasOwnProperty('photos')) {
//                 photoURL = place.photos[0].getUrl({
//                     'maxWidth': 250,
//                     'maxHeight': 250
//                 });
//             }
//             else {
//                 photoURL = 'Photo_404';
//             }
//             // console.log(place);
//             let result = {
//                 name: place.name,
//                 address: place.formatted_address,
//                 location: place.geometry.location,
//                 photo: photoURL,
//                 rating: place.rating,
//                 listId: 'listId'+ index,
//                 fav: false
//             };
//             // console.log(result);
//             self.result.push(result);
//             placesList.push(result);
//         }
//     });
//         createLocalStorage();
//         createMarkers();
//     }
// }

function getClient() {
    // return the client
    return {
        "client_id": "AU5IAQ2HUZSE3FUVXYZT4DHU2BYNO45B12BFULGNWWMG1UEE",
        "client_secret": "ZHMESEJHZ005FZRJBLMU4S5MFTIIQKELMJOXUAM0I043NXR2",
        "v": "20180323"
    }
}

function getLatLng() {
    return ll.lat() + ',' + ll.lng();
}