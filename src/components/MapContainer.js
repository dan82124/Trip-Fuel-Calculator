import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// import "../css/MapContainer.css"

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      gotDistance:false,
      distance:undefined
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.google !== this.props.google) {
      this.loadMap(0);
    }
    if(prevProps.origin !== this.props.origin || prevProps.destination !== this.props.destination){
      this.loadMap(0);
      this.loadMap(1);
    }
  }

  loadMap(state) {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node
      var directionsService = new maps.DirectionsService();
      var directionsDisplay = new maps.DirectionsRenderer();

      if(state===0){
        const mapConfig = Object.assign({}, {
          center: {lat: 49.204524,lng: -122.938073}, // sets center of google map to NYC.
          zoom: 11, // sets zoom. Lower numbers are zoomed further out.
          gestureHandling: "none",
          styles: [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ], // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
          disableDefaultUI: true
        })
        this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      }else if(state===1){
        directionsDisplay.setMap(this.map);
        findAndDisplayRoute(this, this.props.origin, this.props.destination, directionsService, directionsDisplay);
      }
    }

    function findAndDisplayRoute(self, fromPlace, toPlace,directionsService,directionsDisplay) {
      var distance;
      directionsService.route({
        origin: fromPlace,
        destination: toPlace,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          self.props.onDistance(caculateTravelDistance(response));
          // console.log("Function within: "+distance);
          return distance;
        } else {
          window.alert('Directions request failed due to ' + status);
          return null;
        }
      });
    }

    function caculateTravelDistance(result) {
      var total = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      total = total / 1000;
      return total;
    }
  }



  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '100%',
      height: '100%'
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}
