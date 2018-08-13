let typeOfOptions = function() {
    this.listOptions = ko.observableArray([
        'Tourist Places',
        'Pizza Places',
        'Cafe',
        'Library'
    ]);
}


function placeservice() {
    let abc = new google.maps.places.PlacesService(map);
    abc.textSearch(
        {
            query: ('Tourist Places cafe in '+searchPlace),
            location: map.center,
            radius: '200'
        },
        function(result, status, c) {
            console.log(result)
        }
    );
}