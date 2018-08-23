function viewModel() {
    let self = this;
    self.searchPlace = function() {
        search(self);
    };
    self.listOptions = ko.observableArray([
        'Tourist Places',
        'Pizza Places',
        'Cafe',
        'Library'
    ]);
    self.selectedFilter = ko.observable('Tourist Places');

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

    this.remove = function(element) {
        console.log(element);
    }
}



ko.applyBindings(new viewModel());