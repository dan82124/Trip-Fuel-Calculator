import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Title from './components/Title';
import MapContainer from './components/MapContainer';
import Form from './components/Form'
import Vehicle from './components/Vehicle'
import './css/App.css';

const API_KEY = "AIzaSyCgQv-cZLKGrbtbaupLYhGgieNpuiBXgAk";

class App extends Component {
  constructor(props){
    super(props);
    this.getDirection = this.getDirection.bind(this);
    this.state = {
      origin:undefined,
      destination:undefined,
      distance:undefined,
      error:undefined,
    };
    this.handleDistance = this.handleDistance.bind(this);
  }

  handleDistance(distanceVal){
    this.setState({
      distance:distanceVal
    })
  }

  getDirection(e) {
    e.preventDefault();
    const origin = e.target.elements.from.value;
    const destination = e.target.elements.to.value;
    if(origin && destination){
      this.setState({
        origin: e.target.elements.from.value,
        destination: e.target.elements.to.value,
        error: "",
      })
    }else{
      this.setState({
        origin: undefined,
        destination: undefined,
        error: "Please enter your destination",
      })
    }
  }

  render() {
    const distance = this.state.distance;
    // console.log("App distance: "+distance);
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col col-xs-4 title-container">
                <Title/>
                <Form getDirection={this.getDirection}/>
                {this.state.error && <span id="error">{this.state.error}</span>}
                <Vehicle calculatedDist={distance}/>
              </div>
              <div className="col col-xs-8 form-container">
                <MapContainer google={this.props.google} origin={this.state.origin} destination={this.state.destination} onDistance={this.handleDistance}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(App)
