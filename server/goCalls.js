
googKey = process.env.GOOGLE_MAPS_API_KEY

const axios = require('axios');
const getDistance = (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    return axios.get(url)
        .then(response => {
            return response.data.rows[0].elements[0].distance.text
        })
        .catch(error => {
            console.log(error)
        })
}
const getOptimisticRouteSep = (startingLatitude, startingLongitude, endingLatitude, endingLongitude) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startingLatitude},${startingLongitude}&destination=${endingLatitude},${endingLongitude}&traffic_model=optimistic&key=${process.env.GOOGLE_MAPS_API_KEY}`
    return axios.get(url)
        .then(response => {
            return response.data.routes[0].legs[0].steps
        })
        .catch(error => {
            console.log(error)
        })
}
const getOptimisticRoute = (origin, destination) => {
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`
    return axios.post(url, {
            origin:{
              location:{
                latLng:{
                  latitude: origin.lat,
                  longitude: origin.long
                }
              }
            },
            destination:{
              location:{
                latLng:{
                  latitude: destination.lat,
                  longitude: destination.long
                }
              }
            },
        },{
        headers: { 
            'Content-Type': 'application/json',
            'X-Goog-Api-Key' : 'AIzaSyBVz2mqxc_sY4fsLefkHaSGNHValpgnaTE',
            'X-Goog-FieldMask' : ['routes.duration', 'routes.distanceMeters', 'routes.polyline',].join(','),
        }})
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error)
        })
}

//get a traffic-aware route
const getTrafficRoute = (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${process.env.GOOGLE_MAPS_API_KEY}`
    return axios.get(url)
        .then(response => {
            response.data.routes[0]
           // return response.data.routes[0].legs[0].steps
        })
        .catch(error => {
            console.log(error)
        })
}

const timeInTraffic = (route1, route2) => {
    const time1 = route1.legs[0].duration_in_traffic.value
    const time2 = route2.legs[0].duration_in_traffic.value
    return time1 - time2
}

const extraEmissionsByTime = (route1, route2) => {
    timeInTraffic(route1, route2)
    .next(time => {
        const emissionsPerHour = 404
        return time * emissionsPerHour
    })};


const extraEmissionsByDistance = (route1, route2) => {
    const distance1 = route1.legs[0].distance.value
    const distance2 = route2.legs[0].distance.value
    const emissionsPerMile = 404
    return (distance1 - distance2) * emissionsPerMile
}

//get walking directions if and only if the total distance between origin and destination is less than 2 miles

module.exports = {
    getDistance,
    getOptimisticRoute,
    getTrafficRoute,
    timeInTraffic,
    extraEmissionsByTime,
    extraEmissionsByDistance,
    getOptimisticRouteSep
}