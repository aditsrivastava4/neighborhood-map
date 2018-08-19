function removeLS(place) {
    // let locations = JSON.parse(localStorage.getItem('locations'));
    let indexOfPlace = placesList.indexOf(place);
    if(indexOfPlace > -1) {
        placesList.splice(indexOfPlace, 1);
    }

    localStorage.setItem(
        'locations',
        JSON.stringify(placesList)
    );
}

function createLocalStorage() {
    localStorage.setItem(
        'locations',
        JSON.stringify(placesList)
    );
}

function getLS_data() {
    let locations = localStorage.getItem('locations');
    if(locations != null) {
        return JSON.parse(locations);
    }
}

