
googKey = process.env.GOOGLE_MAPS_API_KEY
let drive = "DRIVE"
let walk = "WALK"
let bike = "BICYCLE"
let opt = "OPTIMISTIC"

const axios = require('axios');

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
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
            trafficModel: 'OPTIMISTIC',
        },{
        headers: { 
            'Content-Type': 'application/json',
            'X-Goog-Api-Key' : 'AIzaSyChKNFPCFAMU6Pv_aiHHlHao_kXMKi6Zjo',
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
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
            trafficModel: 'PESSIMISTIC',
        },{
        headers: { 
            'Content-Type': 'application/json',
            'X-Goog-Api-Key' : 'AIzaSyChKNFPCFAMU6Pv_aiHHlHao_kXMKi6Zjo',
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

const getWalkingRoute = (origin, destination) => {
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
            travelMode: 'WALK',
        },{
        headers: { 
            'Content-Type': 'application/json',
            'X-Goog-Api-Key' : 'AIzaSyChKNFPCFAMU6Pv_aiHHlHao_kXMKi6Zjo',
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

const getCyclingRoute = (origin, destination) => {
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
            travelMode: 'BICYCLE',
        },{
        headers: { 
            'Content-Type': 'application/json',
            'X-Goog-Api-Key' : 'AIzaSyChKNFPCFAMU6Pv_aiHHlHao_kXMKi6Zjo',
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
module.exports = {
    getOptimisticRoute,
    getTrafficRoute,
    getWalkingRoute,
    getCyclingRoute,
}