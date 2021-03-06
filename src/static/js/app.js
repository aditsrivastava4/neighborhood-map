function viewModel() {
    self = this;
    // if clicked on the search
    self.searchPlace = function() {
        if(self.selectedFilter() == 'Select' || (self.other() && self.otherFilter() == '')) {
            alert('Select/Enter a filter');
        }
        else {
            search(self);
        }
    };

    // Pre-defined Filter Options
    self.listOptions = ko.observableArray([
        'Tourist Places',
        'Pizza Places',
        'Cafe',
        'Library',
        'Restaurants',
        'Gym',
        'Other'
    ]);
    self.selectedFilter = ko.observable('Tourist Places');
    // User Defined Filter Option
    self.otherFilter = ko.observable('');

    self.other = ko.observable(false);
    self.otherOption = function() {
        if(self.selectedFilter() == 'Other'){
            self.other(true);
        }
        else {
            self.other(false);
        }
    };

    // Store the search result
    self.result = ko.observableArray(getLS_data());
    placesList = self.result();

    // mark a list item favourite
    self.markFav = function(element, event) {
        let listId = document.getElementById(event.currentTarget.id);

        if(listId.style.color != 'red') {
            listId.style.color = 'red';
            element.fav = true;
        }
        else {
            listId.style.color = 'black';
            element.fav = false;
        }
        createLocalStorage();
    };

    // Remove a Marker
    self.removeMarker = function(element) {
        for(let x = 0; x < markers.length; x++) {
            if(markers[x].title==element.name) {
                markers[x].setMap(null);
                removeLS(element);
                markers.splice(x, 1);
                self.result.splice(x, 1);
                break;
            }
        }
    };

    // Empty the location list and markers
    self.remove = function() {
        removeMarkers();
        emptyLocalStorage();
        placesList = [];
        self.result([]);
    }

    // user error
    self.userError = ko.observable(false);
    self.userErrorMsg = ko.observable('No Result Found');

    // Open InfoWindow if list item clicked.
    self.listMarker = function(data, event) {
        if(infowindow != null) {
            infowindow.close();
            infowindow = null;
        }
        infowindow = new google.maps.InfoWindow();

        for(let x = 0; x < markers.length; x++) {
            if(markers[x].title==data.name) {
                createInfoWindow(
                    markers[x],
                    infowindow,
                    data
                );
                break;
            }
        }
    }
}


ko.applyBindings(new viewModel());