const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

const routeObj = require('./routeObj.js')
const goCalls = require('./goCalls.js')
const hereCalls = require('./hereCalls.js')


let Start_lat;
let Start_long;
let End_lat;
let End_long;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/route', (req, res) => {
    req.body = (origin, destination) => {
        Start_lat = origin.lat;
        Start_long = origin.long;
        End_lat = destination.lat;
        End_long = destination.long;
    };    //const { origin, destination } = req.body;
    console.log(`Starting: ${origin}, Ending: ${destination}`);
    var route = routeObj;
    route.driving.without.route = (origin, destination) => {
        return goCalls.getOptimisticRoute(origin, destination)
    .then(response => {
        route.driving.without.distance = response.legs[0].distance.value;
        route.driving.without.time = response.legs[0].duration.value;
        route.driving.without.emissions = route.driving.without.distance * route.driving.without.emissionsFactor;
    }, error => {
        console.log(error);
    })
    .then(route.driving.with.route = goCalls.getTrafficRoute(origin, destination))
    .then(response => {
        route.driving.with.distance = response.legs[0].distance.value;
        route.driving.with.time = response.legs[0].duration.value;
        route.driving.with.emissions = (route.driving.with.distance * route.driving.with.emissionsFactor)+((route.driving.with.time-route.driving.without.time)*route.driving.with.idleEmissions);
    }, error => {
        console.log(error);
    })
    .then(route.transit.route = hereCalls.getTransitRoute(origin, destination))
    .then(response => {
        route.transit.distance = response.legs[0].distance.value;
        route.transit.time = response.legs[0].duration.value;
        route.transit.emissions = route.transit.distance * route.transit.emissionsFactor;
        route.transit.departureTime = response.departure_time.value;
        route.transit.arrivalTime = response.arrival_time.value;
    }, error => {
        console.log(error);
    })
    .then(route.walking.route = hereCalls.getWalkingRoute(origin, destination))
    .then(response => {
        route.walking.distance = response.legs[0].distance.value;
        route.walking.time = response.legs[0].duration.value;
        route.walking.emissions = route.walking.distance * route.walking.emissionsFactor;
    }, error => {
        console.log(error);
    })
    .then(route.cycling.route = hereCalls.getCyclingRoute(origin, destination))
    .then(response => {
        route.cycling.distance = response.legs[0].distance.value;
        route.cycling.time = response.legs[0].duration.value;
        route.cycling.emissions = route.cycling.distance * route.cycling.emissionsFactor;
    }, error => {   
        console.log(error);
    });
}

    // Process the data as needed and send a response
    res.send(route);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
