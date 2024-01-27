//A function that takes two locations as parameters and sends a request to the Google Maps API to get the distance between them
// write the function here
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
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&traffic_model=optimistic&key=${process.env.GOOGLE_MAPS_API_KEY}`
    return axios.get(url)
        .then(response => {
            response.data.routes[0]
            //return response.data.routes[0].legs[0].steps
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