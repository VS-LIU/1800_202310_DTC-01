
// Function that adds pins to the Firestore collection maps
function addMapPins(lat, lng, name, passed_address, passed_uid) {

    var mapReference = db.collection("map") //keep name???

    mapReference.add({
        name: name,
        owner: passed_uid,
        latitude: lat,
        longitude: lng,
        address: passed_address,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    })
        .then((docRef) => {
            console.log("New pin added with ID: ", docRef.id);
            alert("Pin added!");
            location.reload();
        })
        .catch((error) => {
            console.error("Error adding new pin: ", error);
        });
}


// Adds map pin ID to a user's collection
// function saveMapPinID(userID, mapPinID){
//     db.collection("users").doc(userID).update({
//         maps: firebase.firestore.FieldValue.arrayUnion(mapPinID)
//     })
//     .then(()=> console.log("Map pin saved to user's document"))
//     .catch((error) =>{
//         console.log("Error adding map pin to user: ", error);
//     });
// }


function showMap() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const userID = user.uid;
            // Defines basic mapbox data
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
            const map = new mapboxgl.Map({
                container: 'map', // Container ID
                style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
                center: [-122.964274, 49.236082], // Starting position
                zoom: 8 // Starting zoom
            });

            // Add user controls to map
            map.addControl(new mapboxgl.NavigationControl());

            // Adds map features
            map.on('load', () => {
                // Defines map pin icon for events
                map.loadImage(
                    'https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png',
                    (error, image) => {
                        if (error) throw error;

                        // Add the image to the map style.
                        map.addImage('eventpin', image); // Pin Icon

                        // READING information from "events" collection in Firestore
                        db.collection('map').get().then(allEvents => {
                            const features = []; // Defines an empty array for information to be added to

                            allEvents.forEach(doc => {
                                lat = doc.data().latitude;
                                lng = doc.data().longitude;
                                console.log(lat, lng);
                                coordinates = [lng, lat];
                                // Coordinates
                                pin_name = doc.data().name; // pin Name
                                pin_address = doc.data().address;

                                // THIS IS STUFF WE DON'T NEED BUT MIGHT USE LATER!

                                // preview = doc.data().details; // Text Preview
                                // img = doc.data().posterurl; // Image
                                // url = doc.data().link; // URL

                                // Pushes information into the features array
                                features.push({
                                    'type': 'Feature',
                                    'properties': {
                                        'description': `<strong>${pin_name}</strong> <br> <p>${pin_address}</p>`
                                        //<a href="/map.html?id=${doc.id}" target="_blank" title="Opens in a new window">Read more</a><br>`
                                    },
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': coordinates
                                    }
                                });
                            });

                            // Adds features as a source to the map
                            map.addSource('places', {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': features
                                }
                            });

                            // Creates a layer above the map displaying the pins
                            map.addLayer({
                                'id': 'places',
                                'type': 'symbol',
                                // source: 'places',
                                'source': 'places',
                                'layout': {
                                    'icon-image': 'eventpin', // Pin Icon
                                    'icon-size': 0.1, // Pin Size
                                    'icon-allow-overlap': true // Allows icons to overlap
                                }
                            });

                            // Map On Click function that creates a popup, displaying previously defined information from "events" collection in Firestore
                            map.on('click', 'places', (e) => {
                                clickOnPin = true;
                                // Copy coordinates array.
                                const coordinates = e.features[0].geometry.coordinates.slice();
                                const description = e.features[0].properties.description;

                                // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
                                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                                }

                                new mapboxgl.Popup()
                                    .setLngLat(coordinates)
                                    .setHTML(description)
                                    .addTo(map);
                            });


                            // Change the cursor to a pointer when the mouse is over the places layer.
                            map.on('mouseenter', 'places', () => {
                                map.getCanvas().style.cursor = 'pointer';
                            });

                            // Defaults cursor when not hovering over the places layer
                            map.on('mouseleave', 'places', () => {
                                map.getCanvas().style.cursor = '';
                            });

                        });
                    }
                );

                let clickOnPin = false;
                // Add the image to the map style.
                map.loadImage(
                    'https://cdn-icons-png.flaticon.com/512/61/61168.png',
                    (error, image) => {
                        if (error) throw error;

                        // Add the image to the map style with width and height values
                        map.addImage('userpin', image, { width: 10, height: 10 });

                        // Adds user's current location as a source to the map
                        navigator.geolocation.getCurrentPosition(position => {
                            const userLocation = [position.coords.longitude, position.coords.latitude];
                            console.log(userLocation);
                            if (userLocation) {
                                map.addSource('userLocation', {
                                    'type': 'geojson',
                                    'data': {
                                        'type': 'FeatureCollection',
                                        'features': [{
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'Point',
                                                'coordinates': userLocation
                                            },
                                            'properties': {
                                                'description': 'Your location'
                                            }
                                        }]
                                    }
                                });

                                // Creates a layer above the map displaying the user's location
                                map.addLayer({
                                    'id': 'userLocation',
                                    'type': 'symbol',
                                    'source': 'userLocation',
                                    'layout': {
                                        'icon-image': 'userpin', // Pin Icon
                                        'icon-size': 0.05, // Pin Size
                                        'icon-allow-overlap': true // Allows icons to overlap
                                    }
                                });

                                // Map On Click function that creates a popup displaying the user's location
                                map.on('click', 'userLocation', (e) => {
                                    // Copy coordinates array.
                                    const coordinates = e.features[0].geometry.coordinates.slice();
                                    const description = e.features[0].properties.description;

                                    new mapboxgl.Popup()
                                        .setLngLat(coordinates)
                                        .setHTML(description)
                                        .addTo(map);
                                });

                                // This portion allows users to add a pin on map
                                map.on('click', (e) => {
                                    if (clickOnPin) {
                                        clickOnPin = false;
                                        return;
                                    }

                                    // Define a search radius in pixels
                                    const radiusInPixels = 10;

                                    // Query features within the radius around the click point
                                    const features = map.queryRenderedFeatures(e.point, { layers: ['places'], radius: radiusInPixels });

                                    // If no features are found within the search radius, create a new pin
                                    if (features.length === 0) {
                                        const lat = e.lngLat.lat;
                                        const lng = e.lngLat.lng;
                                        // call the Mapbox Geocoding API to get the address
                                        var geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + lng + ',' + lat + '.json?access_token=pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
                                        function getAddress(callback) {
                                            let addressGetter = fetch(geocodingUrl)
                                                .then(response => response.json())
                                                .then(data => {
                                                    // get the first result from the response
                                                    const addressData = data.features[0].place_name;
                                                    callback(addressData);
                                                });
                                        }

                                        finalizedAddress = getAddress(function (address) {
                                            // prompt user to enter a name and then pass arguments to addMapPins()
                                            const name = prompt("Enter a name for the new pin:");

                                            if (name) {
                                                // Call the save map pin function
                                                addMapPins(lat, lng, name, address, userID);
                                            }
                                        });

                                        // attempt to add map pins to user document
                                        //saveMapPinID(userID, doc.id);
                                    }
                                });



                                // Change the cursor to a pointer when the mouse is over the userLocation layer.
                                map.on('mouseenter', 'userLocation', () => {
                                    map.getCanvas().style.cursor = 'pointer';
                                });

                                // Defaults
                                // Defaults cursor when not hovering over the userLocation layer
                                map.on('mouseleave', 'userLocation', () => {
                                    map.getCanvas().style.cursor = '';
                                });
                            }
                        });
                    }
                );
            });
        }
    })
}

// Call the function to display the map with the user's location and event pins
showMap();
