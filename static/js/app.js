var viewModel = function() {
    this.api = ko.observable('mainText()');
    this.result = ko.observable('');
    this.searchPlace = function() {
        search(this);
    };

}

ko.applyBindings(new viewModel());