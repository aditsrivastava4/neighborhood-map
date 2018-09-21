function viewModel() {
    let self = this;
    self.searchPlace = function() {
        search(self);
    };
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
    
    self.other = ko.observable(false);
    self.otherOption = function() {
        if(self.selectedFilter() == 'Other'){
            self.selectedFilter();
            self.other(true);
        }
        else {
            self.other(false);
        }
    };
    
    

    self.result = ko.observableArray(getLS_data());
    placesList = self.result();

    self.favClick = ko.observable(false);

    self.markFav = function(element, event) {
        console.log(element);
        if(self.favClick()) {
            self.favClick(false);
        }
        else {
            self.favClick(true);
        }
    };

    self.remove = function() {
        removeMarkers();
        emptyLocalStorage();
        self.result([]);
    }
}



ko.applyBindings(new viewModel());