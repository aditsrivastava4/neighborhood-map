function placeservice(self) {
    let placeService = new google.maps.places.PlacesService(map);
    let option = self.selectedFilter();
    if(option == 'Other') {
        option = self.otherFilter();
    }
    // emptying result ko.observableArray for every search
    self.result.removeAll();
    placesList = [];

    placeService.textSearch(
        {
            query: (option+' in '+searchPlace),
            location: map.center,
            radius: '1'
        },
        function(results, status) {
            if(status == 'OK') {
                results.forEach(function(place) {
                    if(typeof(place) != 'undefined') {
                        let photoURL;
                        if(place.hasOwnProperty('photos')) {
                            photoURL = place.photos[0].getUrl({
                                'maxWidth': 250,
                                'maxHeight': 250
                            });
                        }
                        else {
                            photoURL = 'Photo_404';
                        }
                        // console.log(place);
                        let result = {
                            name: place.name,
                            address: place.formatted_address,
                            location: place.geometry.location,
                            photo: photoURL,
                            rating: place.rating
                        };
                        self.result.push(result);
                        placesList.push(result);
                    }
                });
            }
            else if(status == 'ZERO_RESULTS') {
                alert('No Place Found');
            }
            createLocalStorage();
            createMarkers();
        }
    );
}