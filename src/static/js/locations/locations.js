function placeservice(self) {
    let placeService = new google.maps.places.PlacesService(map);
    let option = self.selectedFilter();
    // emptying result ko.observableArray for every search
    self.result.removeAll();

    placeService.textSearch(
        {
            query: (option+' in '+searchPlace),
            location: map.center,
            radius: '200'
        },
        function(results, status) {
            results.forEach(function(place) {
                let result = {
                    name: place.name,
                    address: place.formatted_address,
                    location: place.geometry.location
                };
                self.result.push(result);
                markers.push(result);
            });
            createMarkers();
            createLocalStorage();
        }
    );
}