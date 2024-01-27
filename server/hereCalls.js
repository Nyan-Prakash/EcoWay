id = process.env.HERE_APP_ID
key = process.env.HERE_API_KEY

const axios = require('axios');
const getTransitRoute = (origin, destination) => {
    const url = `https://transit.router.hereapi.com/v8/routes?apiKey=${key}&origin=${origin}&destination=${destination}&return=summary`
    return axios.get(url)
        .then(response => {
            return response.data.routes[0]
        })
        .catch(error => {
            console.log(error)
        })
}

const getNextDeparture= (origin, destination) => {
    const url = `https://transit.router.hereapi.com/v8/departures?apiKey=${key}&origin=${origin}&destination=${destination}&return=summary`
    return axios.get(url)
        .then(response => {
            return response.data.boards.departures
        })
        .catch(error => {
            console.log(error)
        })
}

const calculateEmissions = (route) => {
    const emissionsPerMile = 177
    const distance = route.sections[0].summary.length
    return distance * emissionsPerMile
}