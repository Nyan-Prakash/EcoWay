import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapCompnent from './MyMapComponent';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";


function App() {
  setKey("AIzaSyBVz2mqxc_sY4fsLefkHaSGNHValpgnaTE");
  setLanguage("en");
  setRegion("es");
  const [message, setMessage] = useState("");
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  
  const [Starting_lat, setSL] = useState(1);
  const [Starting_long, SetSLO] = useState(1);
  const [Ending_lat, setEL] = useState(1);
  const [Ending_long, setElO] = useState(1);

  
  let lats = 2;
  let lgns = 3;

  useEffect(() => {
    fetch("http://localhost:9000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStarting(event.target.value);
    fromAddress(event.target.value)
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
    setSL(lat);
    SetSLO(lng)
  })
  .catch(console.error);
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnding(event.target.value);
    
    fromAddress(event.target.value)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log(lat, lng);
      setEL(lat);
      setElO(lng);
    })
    .catch(console.error);

  };

  const handleClick = async () => {
    try {
      console.log(lats, ending);
      const response = await axios.post('http://localhost:9000/route', { 'start_lat': Starting_lat, 'start_long': Starting_long, 'end_lat':Ending_lat, 'end_long':Ending_long });
      console.log(response.data);
      // Handle response data here, if needed
    } catch (error) {
      console.error('Error sending POST request:', error);
      // Handle errors here, e.g., setMessage('An error occurred');
    }
  };
  

  return (
    <div className="App">
      <h1 style={{fontSize:100}}>Welcome to EcoWay</h1>
      <h3 style={{color: "gray"}}>Our program uses Google Maps API to find the route find the smallest carbon footprint!</h3>
      <div>
        <label>Starting Point:</label> 
        <input type="text" id="starting" name="starting" value={starting} onChange={handleStartChange}></input><br></br> <br></br>
        <label>End Point:</label>
        <input type="text" id="ending" name="ending" value={ending} onChange={handleEndChange}></input> <br></br><br></br>
        <Button variant="success" onClick={handleClick}>Calculate</Button>
        <p>Starting: {starting}</p>
        <p>Ending: {ending}</p> 
        <p>slat: {Starting_lat}</p>
        <p>slong: {Starting_long}</p>
        <p>elat: {Ending_lat}</p>
        <p>elong: {Ending_long}</p>

      </div>
        <body className="MapDiv">
          <MyMapCompnent></MyMapCompnent>
        </body>
    </div>
  );
}

export default App;
