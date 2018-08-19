function removeLS(place) {
    // let locations = JSON.parse(localStorage.getItem('locations'));
    let indexOfPlace = markers.indexOf(place);
    if(indexOfPlace > -1) {
        markers.splice(indexOfPlace, 1);
    }

    localStorage.setItem(
        'locations',
        JSON.stringify(markers)
    );
}

function createLocalStorage() {
    localStorage.setItem(
        'locations',
        JSON.stringify(markers)
    );
}

function getLS_data() {
    let locations = localStorage.getItem('locations');
    if(locations != null) {
        return JSON.parse(locations);
    }
}

