function viewModel() {
    this.searchPlace = function() {
        search(this);
    };
    this.listOptions = ko.observableArray([
        'Tourist Places',
        'Pizza Places',
        'Cafe',
        'Library'
    ]);
    this.selectedFilter = ko.observable('Tourist Places');

    this.result = ko.observableArray();
}



ko.applyBindings(new viewModel());