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

    self.favClick = ko.observable(false);

    self.markFav = function() {
        if(self.favClick()) {
            self.favClick(false);
        }
        else {
            self.favClick(true);
        }
    };
}



ko.applyBindings(new viewModel());