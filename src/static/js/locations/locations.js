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
            radius: '200'
        },
        function(results, status) {
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
                    
                    let result = {
                        name: place.name,
                        address: place.formatted_address,
                        location: place.geometry.location,
                        photo: photoURL
                    };
                    self.result.push(result);
                    placesList.push(result);
                }
            });
            createLocalStorage();
            createMarkers();
        }
    );
}