const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const routeObj = require('./routeObj.js')
const goCalls = require('./goCalls.js')
const hereCalls = require('./hereCalls.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let withoutTime = 0;

app.post('/route', (req, response) => {

    const origin = { lat: req.body.start_lat, long: req.body.start_long };
    const destination = { lat: req.body.end_lat, long: req.body.end_long };

    console.log(`Starting: ${origin.lat},${origin.long}, Ending: ${destination.lat},${destination.long}`);
    goCalls.getOptimisticRoute(origin, destination)
    .then(response => {
        routeObj.driving.without.distance = response.routes[0].distanceMeters;

        routeObj.driving.without.time = response.routes[0].duration;
        withoutTime = routeObj.driving.without.time;
        routeObj.driving.without.emissions = (Number(routeObj.driving.without.time.slice(0,routeObj.driving.without.time.length-1)) * 404)/1836;
        routeObj.driving.without.route = response.routes[0].polyline;
    })
    goCalls.getTrafficRoute(origin, destination)
    .then(response => {
        routeObj.driving.with.route = response.routes[0].polyline
        routeObj.driving.with.distance = response.routes[0].distanceMeters;
        routeObj.driving.with.time = response.routes[0].duration;
        const withTime = Number(routeObj.driving.with.time.slice(0,routeObj.driving.with.time.length-1))
        routeObj.driving.with.emissions = ((routeObj.driving.with.distance * 404) + ((withTime - withoutTime) * 377))/1836;
    })
    hereCalls.getTransitRoute(origin.lat,origin.long, destination.lat, destination.long)
    .then(response => {
        console.log(response);
        routeObj.transit = {
            'route': null,
            'distance': response.distanceSum,
            'emissions': response.emissionsSum/1836,
            'emissionsFactor': 177,
            'time': response.timeSum,
            'departureTime': response.dtime,
            'arrivalTime': response.atime,
        }
    })
    goCalls.getWalkingRoute(origin, destination)
    .then(response => {
        routeObj.walking.route = response.routes[0].polyline;
        routeObj.walking.distance = response.routes[0].distanceMeters;
        routeObj.walking.time = response.routes[0].duration;
        routeObj.walking.emissions = 0;
    })
    goCalls.getCyclingRoute(origin, destination)
    .then(response => {
        routeObj.cycling.distance = response.routes[0].distanceMeters;
        routeObj.cycling.time = response.routes[0].duration;
        routeObj.cycling.route = response.routes[0].polyline;
        routeObj.cycling.emissions = routeObj.cycling.distance * routeObj.cycling.emissionsFactor;
    })
    .then(sendBack = async() => {
       await delay(5000) ;
       response.json(routeObj);
       console.log("Success")
    })
    .catch(error => {
        console.log(error);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
