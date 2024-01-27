import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapWithRoute from './MapWithRoute';
import MyMapComponent from './MyMapComponent'; // Ensure the file name is correct
import bikeImage from './bike.jpg';
import carImage from './car.png';
import trainImage from './train.png';
import walkingImage from './walking.png';
import {
  setKey,
  setLanguage,
  setRegion,
  fromAddress
} from "react-geocode";

function App() {
  setKey("AIzaSyBVz2mqxc_sY4fsLefkHaSGNHValpgnaTE"); // Replace with your actual API key
  setLanguage("en");
  setRegion("es");
  
  const [message, setMessage] = useState("");
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const [Starting_lat, setSL] = useState(1);
  const [Starting_long, SetSLO] = useState(1);
  const [Ending_lat, setEL] = useState(1);
  const [Ending_long, setElO] = useState(1);
  const [showMap, setShowMap] = useState(1); // New state variable for controlling map visibility

  useEffect(() => {
    fetch("http://localhost:9000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const handleStartChange = (event) => {
    setStarting(event.target.value);
    fromAddress(event.target.value)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setSL(lat);
        SetSLO(lng);
      })
      .catch(console.error);
  };

  const handleEndChange = (event) => {
    setEnding(event.target.value);
    fromAddress(event.target.value)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setEL(lat);
        setElO(lng);
      })
      .catch(console.error);
  };

  const handleClick = async () => {
    try {

      setShowMap(0); // Show the map after getting the response

      const response = await axios.post('http://localhost:5000/route', { 'start_lat': Starting_lat, 'start_long': Starting_long, 'end_lat':Ending_lat, 'end_long':Ending_long });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  // ... (rest of your imports)
  // ... (rest of your state and functions)

  return (
    <div className="App">
      <div className="header">
        <h1>Welcome to EcoWay</h1>
        <h3>Our program uses Google Maps API to find the route find the smallest carbon footprint!</h3>
      </div>
      <div className="content">
        <div className="form-container">
          <label>Starting Point:</label>
          <input type="text" id="starting" name="starting" value={starting} onChange={handleStartChange}></input>
          <label>End Point:</label>
          <input type="text" id="ending" name="ending" value={ending} onChange={handleEndChange}></input>
          <br></br>
          <br></br>
          <Button variant="success" onClick={handleClick}>Calculate</Button>

          <br></br>
          <br></br>
          {/* You might consider commenting out or styling these debug values */}
          <p>Starting: {starting}</p>
          <p>Ending: {ending}</p> 
          <p>slat: {Starting_lat}</p>
          <p>slong: {Starting_long}</p>
          <p>elat: {Ending_lat}</p>
          <p>elong: {Ending_long}</p>
          <p>yes: {showMap}</p>
        </div>
        <div className="map-container">
          {showMap === 0 && Starting_lat !== 1 && Starting_long !== 1 && Ending_lat !== 1 && Ending_long !== 1 && (
            <MapWithRoute
              origin={{ lat: Starting_lat, lng: Starting_long }}
              destination={{ lat: Ending_lat, lng: Ending_long }}
            />
          )}
        </div>
      </div>
      <div className="route-info">
  <h3 style={{position:"relative", left:-200}}>Route Information</h3> <br></br>
  <div className="info-row">
    <img src={carImage} alt="Bike" style={{height:75, paddingLeft:35, paddingRight: 37}}/>
    <div>
      <p>Driving:</p>
    </div>
    <div>
      <p>More info</p>
    </div>
  </div>
  <div className="info-row">
    <img src={trainImage} alt="Bike" style={{height:100, paddingLeft:22, paddingRight: 22}} />
    <div>
      <p>Train:</p>
    </div>
    <div>
      <p>More info</p>
    </div>
  </div>
  <div className="info-row">
    <img src={bikeImage} alt="Bike" />
    <div>
      <p>Biking:</p>
    </div>
    <div>
      <p>More info</p>
    </div>
  </div>
  <div className="info-row">
    <img src={walkingImage} alt="Bike" style={{height:100, paddingLeft:22, paddingRight: 22}}/>
    <div>
      <p>Walking:</p>
    </div>
    <div>
      <p>More info</p>
    </div>
  </div>
</div>

    
      
    </div>
  );
}

export default App;
