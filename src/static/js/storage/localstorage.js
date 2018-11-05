/**
 * @description localstorage.js manages localStorage and its operations
 */

/**
 * @description Remove a place from localStorage
 * @param {Object} place - place to remove from localStorage 
 */
function removeLS(place) {
    let indexOfPlace = placesList.indexOf(place);
    if(indexOfPlace > -1) {
        placesList.splice(indexOfPlace, 1);
    }

    localStorage.setItem(
        'locations',
        JSON.stringify(placesList)
    );
}

/**
 * @description Creates a localStorage
 * @callback createMarkers
 * @param {createMarkers} callback - default null if no callback
 */
function createLocalStorage(callback = null) {
    localStorage.setItem(
        'locations',
        JSON.stringify(placesList)
    );
    if(callback != null) {
        callback();
    }
}

/**
 * @description Get data from localStorage
 * @returns {Object[]} data from localStorage
 */
function getLS_data() {
    let locations = localStorage.getItem('locations');
    if(locations != null) {
        return JSON.parse(locations);
    }
}

/**
 * @description Get map center from localStorage
 * @returns {Object} map center from localStorage or null
 */
function getMapCenter() {
    let mapCenter = localStorage.getItem('mapCenter');
    if(mapCenter != null) {
        return JSON.parse(mapCenter);
    }
    else {
        return null;
    }
}

/**
 * @description Store map center in localStorage
 * @param {Object} mapCenter 
 */
function createMapCenter(mapCenter) {
    localStorage.setItem(
        'mapCenter',
        JSON.stringify(mapCenter)
    );
}

/**
 * @description clear localStorage
 */
function emptyLocalStorage() {
    localStorage.clear();
}