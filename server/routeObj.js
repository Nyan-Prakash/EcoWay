var routeObj = {
    'driving': {
        'without': {
            'route': null,
            'distance': 0,
            'emissions': 0,
            'emissionsFactor': 404,
            'time': 0,
        },
        'with': {
            'route': {},
            'distance': 0,
            'emissions': 0,
            'emissionsFactor': 404,
            'time': 0,
            'idleEmissions': 377,
        }
    },
    'transit': {
        'route': {},
        'distance': 0,
        'emissions': 0,
        'emissionsFactor': 177,
        'time': 0,
        'departureTime': 0,
        'arrivalTime': 0,
    },
    'walking': {
        'route': {},
        'distance': 0,
        'emissions': 0,
        'emissionsFactor': 0,
        'time': 0,
    },
    'cycling': {
        'route': {},
        'distance': 0,
        'emissions': 0,
        'emissionsFactor': 0,
        'time': 0,
    }
}


module.exports = routeObj;