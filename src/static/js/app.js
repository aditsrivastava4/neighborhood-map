var viewModel = function() {
    this.searchPlace = function() {
        search(this);
    };
    this.options = ko.observable( new typeOfOptions() );
}

ko.applyBindings(new viewModel());