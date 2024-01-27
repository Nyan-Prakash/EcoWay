const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const routeObj = require('./routeObj.js')
const goCalls = require('./goCalls.js')
const hereCalls = require('./hereCalls.js');
const RouteProps = require('./goType.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/route', (req, response) => {
    /*
    RouteProps.origin = { lat: req.body.start_lat, long: req.body.start_long };
    RouteProps.destination = { lat: req.body.end_lat, long: req.body.end_long };

    console.log(`Starting: ${RouteProps.origin.lat},${RouteProps.origin.long}, Ending: ${RouteProps.destination.lat},${RouteProps.destination.long}`);
    routeObj.driving.without.route = (origin, destination) => {
        goCalls.getOptimisticRoute(RouteProps.origin, RouteProps.destination)
    .then(response => {
        routeObj.driving.without.distance = response.legs[0].distance.value;
        routeObj.driving.without.time = response.legs[0].duration.value;
        routeObj.driving.without.emissions = routeObj.driving.without.distance * routeObj.driving.without.emissionsFactor;
    }, error => {
        console.log(error);
    })
    .then(routeObj.driving.with.route = goCalls.getTrafficRoute(origin, destination))
    .then(response => {
        routeObj.driving.with.distance = response.legs[0].distance.value;
        routeObj.driving.with.time = response.legs[0].duration.value;
        routeObj.driving.with.emissions = (routeObj.driving.with.distance * routeObj.driving.with.emissionsFactor)+((routeObj.driving.with.time-routeObj.driving.without.time)*routeObj.driving.with.idleEmissions);
    }, error => {
        console.log(error);
    })
    .then(routeObj.transit.route = hereCalls.getTransitRoute(origin, destination))
    .then(response => {
        routeObj.transit.distance = response.legs[0].distance.value;
        routeObj.transit.time = response.legs[0].duration.value;
        routeObj.transit.emissions = route.transit.distance * route.transit.emissionsFactor;
        routeObj.transit.departureTime = response.departure_time.value;
        routeObj.transit.arrivalTime = response.arrival_time.value;
    }, error => {
        console.log(error);
    })
    .then(routeObj.walking.route = hereCalls.getWalkingRoute(origin, destination))
    .then(response => {
        routeObj.walking.distance = response.legs[0].distance.value;
        routeObj.walking.time = response.legs[0].duration.value;
        routeObj.walking.emissions = routeObj.walking.distance * routeObj.walking.emissionsFactor;
    }, error => {
        console.log(error);
    })
    .then(routeObj.cycling.route = hereCalls.getCyclingRoute(origin, destination))
    .then(response => {
        routeObj.cycling.distance = response.legs[0].distance.value;
        routeObj.cycling.time = response.legs[0].duration.value;
        routeObj.cycling.emissions = routeObj.cycling.distance * routeObj.cycling.emissionsFactor;
    }, error => {   
        console.log(error);
    });
}

    // Process the data as needed and send a response
    console.log(routeObj);
    res.send(routeObj);
    */
    const origin = { lat: req.body.start_lat, long: req.body.start_long };
    const destination = { lat: req.body.end_lat, long: req.body.end_long };

    console.log(`Starting: ${origin.lat},${origin.long}, Ending: ${destination.lat},${destination.long}`);

    goCalls.getOptimisticRoute(origin, destination)
    .then(response => {
        console.log(response.routes[0].distanceMeters);
        routeObj.driving.without.distance = response.routes[0].distanceMeters;

        routeObj.driving.without.time = response.routes[0].duration;
        console.log(response.routes[0].duration);
        routeObj.driving.without.emissions = routeObj.driving.without.distance * routeObj.driving.without.emissionsFactor;
    })
    .catch(error => {
        console.log(error);
    });
    
    //    return goCalls.getTrafficRoute(origin, destination);
    })/*
    .then(response => {
        routeObj.driving.with.distance = response.legs[0].distance.value;
        routeObj.driving.with.time = response.legs[0].duration.value;
        routeObj.driving.with.emissions = (routeObj.driving.with.distance * routeObj.driving.with.emissionsFactor) + ((routeObj.driving.with.time - routeObj.driving.without.time) * routeObj.driving.with.idleEmissions);

        return hereCalls.getTransitRoute(origin, destination);
    })
    .then(response => {
        routeObj.transit.distance = response.legs[0].distance.value;
        routeObj.transit.time = response.legs[0].duration.value;
        routeObj.transit.emissions = route.transit.distance * route.transit.emissionsFactor;
        routeObj.transit.departureTime = response.departure_time.value;
        routeObj.transit.arrivalTime = response.arrival_time.value;

        return hereCalls.getWalkingRoute(origin, destination);
    })
    .then(response => {
        routeObj.walking.distance = response.legs[0].distance.value;
        routeObj.walking.time = response.legs[0].duration.value;
        routeObj.walking.emissions = routeObj.walking.distance * routeObj.walking.emissionsFactor;

        return hereCalls.getCyclingRoute(origin, destination);
    })
    .then(response => {
        routeObj.cycling.distance = response.legs[0].distance.value;
        routeObj.cycling.time = response.legs[0].duration.value;
        routeObj.cycling.emissions = routeObj.cycling.distance * routeObj.cycling.emissionsFactor;

        // Send the modified routeObj as response
        console.log(routeObj);
        res.send(routeObj);
    })
    */
    //.catch(error => {
     //   console.log(error);
    //    res.status(500).send("Error processing the route");
    //});
//});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
