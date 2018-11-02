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

function createLocalStorage(callback = null) {
    localStorage.setItem(
        'locations',
        JSON.stringify(placesList)
    );
    if(callback != null) {
        callback();
    }
}

function getLS_data() {
    let locations = localStorage.getItem('locations');
    if(locations != null) {
        return JSON.parse(locations);
    }
}

function getMapCenter() {
    let mapCenter = localStorage.getItem('mapCenter');
    if(mapCenter != null) {
        return JSON.parse(mapCenter);
    }
    else {
        return null;
    }
}

function createMapCenter(mapCenter) {
    localStorage.setItem(
        'mapCenter',
        JSON.stringify(mapCenter)
    );
}

function emptyLocalStorage() {
    localStorage.clear();
}