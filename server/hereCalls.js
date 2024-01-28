id = process.env.HERE_APP_ID
key = process.env.HERE_API_KEY

const axios = require('axios');
const getTransitRoute = (olat,olong,dlat, dlong) => {
    const url = `https://transit.router.hereapi.com/v8/routes?apiKey=UHT5OnmZHUiiC-l7zWE5QZygiQ8010mvx53M12e0Pxw&origin=${olat},${olong}&destination=${dlat},${dlong}&return=travelSummary`
    return axios.get(url)
        .then(response => {
            return sumUpSections(response.data.routes[0].sections)
        })
        .catch(error => {
            console.log(error)
        })
}

const sumUpSections = (sections) => {
    let emissionsSum = 0;
    let distanceSum = 0;
    let timeSum = 0;
    for (let i = 0; i < sections.length; i++){
        if (sections[i].transport.mode == "bus"){
            emissionsSum += 299 *(sections[i].travelSummary.length/1609.34)
        }
        if (sections[i].transport.mode == "subway"){
            emissionsSum += 177 *(sections[i].travelSummary.length/1609.34)
        }
        if (sections[i].transport.mode == "train"){
            emissionsSum += 177 *(sections[i].travelSummary.length/1609.34)
        }
        distanceSum += sections[i].travelSummary.length;
        timeSum += sections[i].travelSummary.duration;
    }
    let dtime = sections[0].departure.time
    let atime = sections[sections.length-1].arrival.time

    return {
        distanceSum,
        emissionsSum,
        timeSum,
        dtime,
        atime
    }
    
}
module.exports = {
    getTransitRoute,
}