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
            results.forEach(function(x) {
                console.log(x.name)
                let result = {
                    name: x.name,
                    address: x.formatted_address,
                    location: x.geometry.location
                };
                self.result.push(result);
            });
        }
    );
}