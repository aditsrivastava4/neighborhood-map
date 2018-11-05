# Neighbourhood Map Project

This Project is to create a single page website with a map and option to search for a places and filter it as the user require.

## Python Module

* **views.py**

A basic Flask Server which provides Google maps API key and a redirect to a image.


## JavaScript Modules
* **app.js**
* **maps.js**
* **locations.js**
* **localstorage.js**


### 1. app.js
It is a ViewModal created with [Knockout.js](https://knockoutjs.com) Library.
It handles all the dynamic changes to the UI.

### 2. maps.js
It manages all [Google Maps API](https://developers.google.com/maps/documentation/) operations. Like Geocoding, Markers, InfoWindow, etc.

### 3. locations.js
It manages all [Foursquare API](https://developer.foursquare.com/) operations. Like Searching Venue, Venue Details, etc.

### 4. localstorage.js
It manages read/write operations related to localStorage.


## Getting Started

### [Google Maps API](https://developers.google.com/maps/documentation/)
1. Activate [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) and [Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro)
2. Get Google Maps [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
3. Create a **maps_API.json** file in the src directory to store Google Maps API key.


 		{
 		"apikey": "{Your Google Maps API Key}"
 		}


### [Foursquare API](https://developer.foursquare.com/)
1. Create a Foursquare Developres account and register your app.
2. It will provide you ```Client ID``` and ```Client Secret```.
3. Replace the ```Client ID``` and ```Client Secret``` of **locations.js** at ```line no. 170 and 171``` with your ```Client ID``` and ```Client Secret```.

### To Run

* Open terminal and cd to ```~/neighbourhood-map/src```.
* Run the command ```python3 views.py```.

## Acknowledgment

* [StackoverFlow](http://stackoverflow.com)