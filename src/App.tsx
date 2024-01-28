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
import Moment from 'react-moment';

import {
  setKey,
  setLanguage,
  setRegion,
  fromAddress
} from "react-geocode";

function App() {
  setKey("AIzaSyChKNFPCFAMU6Pv_aiHHlHao_kXMKi6Zjo"); // Replace with your actual API key
  setLanguage("en");
  setRegion("es");
  
  let someNestedValue;

  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const [Starting_lat, setSL] = useState(1);
  const [Starting_long, SetSLO] = useState(1);
  const [Ending_lat, setEL] = useState(1);
  const [Ending_long, setElO] = useState(1);
  const [showMap, setShowMap] = useState(1); // New state variable for controlling map visibility

  const [Rdata, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/message')
      .then(response => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then(data => {
        console.log(data);
      })

      .catch(error => {
        console.error('There was a problem fetching the data: ', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount


  const handleStartChange = (event) => {
    setStarting(event.target.value);
    fromAddress(event.target.value)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setSL(lat);
        SetSLO(lng);
        console.log("changed");
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
      setShowMap(0)
      const response = await axios.post('http://localhost:5000/route', { 'start_lat': Starting_lat, 'start_long': Starting_long, 'end_lat':Ending_lat, 'end_long':Ending_long });
      console.log(response.data);
      setData(response.data)
      someNestedValue = response.data?.['driving']?.['without']?.['emission'];

    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  // ... (rest of your imports)
  // ... (rest of your state and functions)

  return (
    <div className="App">
      <div className="header">
        <h1 className="titletext">Welcome to EcoWay</h1>
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
          
          {Rdata && (
                <div className="route-info">
                <h3 style={{position:"relative", left:0}}>Route Information</h3> <br></br>
                <div className="info-row">
                  <img src={carImage} alt="Bike" style={{height:75, paddingLeft:35, paddingRight: 37}}/>
                  
                  <div>
                    <p className="infoText">Distance: {(Rdata.driving?.with?.distance/1609).toFixed(2)} miles</p>
                    <p className="infoText">Time: {((Rdata.driving?.with?.time).substring(0, Rdata.driving?.with?.time.length - 1)/60).toFixed(2)} mins</p>
                    <p className="infoText">Emission: {((Rdata.driving?.with?.distance * 404) + (((((Rdata.driving?.with?.time).substring(0, Rdata.driving?.with?.time.length - 1)/60) - ((Rdata.driving?.without?.time).substring(0, Rdata.driving?.without?.time.length - 1))) * 377)/60)/1000).toFixed(2) }</p>
                  </div>
                </div>
                <div className="info-row">
                  <img src={trainImage} alt="Bike" style={{height:100, paddingLeft:22, paddingRight: 22}} />
        
                  <div>
                    <p className="infoText">Distance: {((Rdata.transit?.distance)/1609).toFixed(2)} miles</p>
                    <p className="infoText">Time: {((Rdata.transit?.time)/60).toFixed(2)} mins</p>
                    <p className="infoText">Emission:  {Rdata.transit?.emissions.toFixed(2)}</p>
                    <div className="infoText">
                    
                    <Moment format="MMM D YYYY, h:mm a">{(Rdata.transit?.departureTime)}</Moment>
                    </div>
                    <div className="infoText">
              
                    <Moment format="MMM D YYYY, h:mm a">{Rdata.transit?.arrivalTime}</Moment>
                    </div>
                  </div>
                </div>
                <div className="info-row">
                  <img src={bikeImage} alt="Bike" style={{height:100, paddingLeft:1, paddingRight: 2}} />

                  <div>
                  <p className="infoText">Distance: {(Rdata.cycling?.distance/1609).toFixed(2)} miles</p>
                    <p className="infoText">Time: {((Rdata.cycling?.time).substring(0, Rdata.driving?.with?.time.length - 1)/60).toFixed(2)} mins</p>
                    <p className="infoText">Emission: 0</p>
                  </div>
                </div>
                <div className="info-row">
                  <img src={walkingImage} alt="Bike" style={{height:100, paddingLeft:22, paddingRight: 22}}/>
         
                  <div>
                  <p className="infoText">Distance: {(Rdata.walking?.distance/1609).toFixed(2)} miles</p>
                    <p className="infoText">Time: {((Rdata.walking?.time).substring(0, Rdata.walking?.time.length - 1)/60).toFixed(2)} mins</p>
                    <p className="infoText">Emission: 0</p>
                  </div>
                </div>
              </div>
              
          )}
              
    
      
    </div>
  );
}

export default App;
