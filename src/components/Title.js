import React, { Component } from 'react';

export default class Title extends Component{
  render(){
    return(
      <div>
        <h1 className="title-container__title ">Trip Fuel Calculator</h1>
        <p className="title-container__subtitle">Find out the cost for fuel and more...</p>
      </div>
    )
  }
}
