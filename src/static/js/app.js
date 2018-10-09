function viewModel() {
    let self = this;
    self.searchPlace = function() {
        if(self.selectedFilter() == 'Select' || (self.other() && self.otherFilter() == '')) {
            alert('Select/Enter a filter');
        }
        else {
            search(self);
        }
    };
    self.listOptions = ko.observableArray([
        'Select',
        'Tourist Places',
        'Pizza Places',
        'Cafe',
        'Library',
        'Restaurants',
        'Gym',
        'Other'
    ]);
    self.selectedFilter = ko.observable('Select');
    self.otherFilter = ko.observable('');

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

    // usererror
    self.userError = ko.observable(false);
    self.userErrorMsg = ko.observable('Place Not Found');
}



ko.applyBindings(new viewModel());