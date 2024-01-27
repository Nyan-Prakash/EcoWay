import React from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

type LatLng = {
  lat: number;
  lng: number;
};

type MapWithRouteProps = {
  origin: LatLng;
  destination: LatLng;
};

enum TravelMode {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING",
  TRANSIT = "TRANSIT",
  WALKING = "WALKING"
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ origin, destination }) => {
  const [directionsResponse, setDirectionsResponse] = React.useState(null);

  const directionsCallback = React.useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response);
      } else {
        console.error('response: ', response);
      }
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBVz2mqxc_sY4fsLefkHaSGNHValpgnaTE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {
          (origin && destination) && (
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          )
        }

        {
          directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse
              }}
            />
          )
        }
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapWithRoute);
