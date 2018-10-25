function placeservice(self) {
    let option = self.selectedFilter();
    if(option == 'Other') {
        option = self.otherFilter();
    }
    // emptying result ko.observableArray for every search
    self.result.removeAll();
    placesList = [];
    // let results;

    console.log('hoal')
    let foursquare_data = getClient().responseJSON;
    console.log(foursquare_data)
    if(foursquare_data != null) {
        console.log('hola')
        let url = 'https://api.foursquare.com/v2/venues/search?';
        foursquare_data['v'] = "20180323";
        foursquare_data['query'] = option;
        foursquare_data['ll'] = ll;
        $.ajax({
            url: url,
            data: foursquare_data,
            success: function(results) {
                console.log(results);
            }
        });
    }







    // results.forEach(function(place, index) {
    //     if(typeof(place) != 'undefined') {
    //         let photoURL;
    //         if(place.hasOwnProperty('photos')) {
    //             photoURL = place.photos[0].getUrl({
    //                 'maxWidth': 250,
    //                 'maxHeight': 250
    //             });
    //         }
    //         else {
    //             photoURL = 'Photo_404';
    //         }
    //         // console.log(place);
    //         let result = {
    //             name: place.name,
    //             address: place.formatted_address,
    //             location: place.geometry.location,
    //             photo: photoURL,
    //             rating: place.rating,
    //             listId: 'listId'+ index,
    //             fav: false
    //         };
    //         // console.log(result);
    //         self.result.push(result);
    //         placesList.push(result);
    //     }
    // });
    //     createLocalStorage();
    //     createMarkers();
    // }
}

function getClient() {
    // let foursquare_key = null;
    $.ajax({
        type: "GET",
        url: '/foursquare'
    });
    // async: false,
        // success: function(data){
        //     foursquare_key = data;
        //     console.log(foursquare_key)
        // }
    // console.log(foursquare_key)
    // return foursquare_key;
}