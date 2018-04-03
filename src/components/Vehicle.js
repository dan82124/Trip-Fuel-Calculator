import React, { Component } from 'react';
import SelectYear from './SelectYear';
import SelectMake from './SelectMake';
import SelectModel from './SelectModel';
import SelectOptions from './SelectOptions';
// import SelectVehicle from './SelectVehicle';
import DisplayKML from './DisplayKML';
// import $ from 'jquery';

const MPG_TO_KML = 235.215;

export default class Vehicle extends Component{
  constructor(props) {
    super(props);
    this.state = {
      year:undefined,

      make:undefined,
      model:undefined,
      options:undefined,
      fuel: undefined,
      mpg:undefined,
      error:""
    };
    this.handleReset=this.handleReset.bind(this);
    this.handleYear=this.handleYear.bind(this);
    this.handleMake=this.handleMake.bind(this);
    this.handleModel=this.handleModel.bind(this);
    this.handleOptions=this.handleOptions.bind(this);
    this.handleFuel=this.handleFuel.bind(this);
    this.handleMpg=this.handleMpg.bind(this);
    this.handleError=this.handleError.bind(this);
  }

  handleReset(){
    window.location.reload();
  }

  handleYear(yearVal) {
    this.setState({
      year:yearVal,
    });
    // console.log(yearVal);
  }

  handleMake(makeVal) {
    this.setState({
      make:makeVal
    });
    // console.log(makeVal);
  }

  handleModel(modelVal) {
    this.setState({
      model:modelVal
    });
  }

  handleOptions(optionsVal) {
    this.setState({
      options:optionsVal
    });
  }

  handleFuel(fuelVal) {
    this.setState({
      fuel:fuelVal
    });
  }

  handleMpg(mpgVal) {
    this.setState({
      mpg:mpgVal
    });
  }

  handleError(errorVal) {
    this.setState({
      error:errorVal
    });
  }

  render() {
    // const year = this.state.year;
    // const make = this.state.make;
    // const model = this.state.model;
    // const vehicleId = this.state.options;
    // const error = this.state.error;
    const kml = MPG_TO_KML/this.state.mpg;
    const fuelPrice = Number(this.state.fuel*2.2*26.4172).toFixed(0);
    const calculatedDist = Number(this.props.calculatedDist).toFixed(2);
    const fuelUsed = Number(calculatedDist/kml).toFixed(2);
    const tripCost = Number(fuelPrice*fuelUsed/100).toFixed(2);

    // console.log("calculatedDist: "+ calculatedDist);
    return (
      <div>
        <h3>Vehicle Info...</h3>
        <div className="form-group">
          <div className="form-row">
            <SelectYear ref="Year" onSelectYear={this.handleYear} onChangeYear={this}/>
            <SelectMake ref="Make"onSelectMake={this.handleMake} selectedYear={this.state.year} errorStatus={this.state.error}/>
          </div>
          <div className="form-row">
            <SelectModel onSelectModel={this.handleModel} selectedMake={this.state.make} selectedYear={this.state.year} errorStatus={this.state.error}/>
            <SelectOptions onSelectOptions={this.handleOptions} selectedModel={this.state.model} selectedMake={this.state.make} selectedYear={this.state.year} errorStatus={this.state.error}/>
          </div>
          <button className="form-group btn btn-default" onClick={this.handleReset}>Reset</button>
          <div className="form-group">
            <DisplayKML onSelectFuel={this.handleFuel} onMpg={this.handleMpg} selectedId={this.state.options} errorStatus={this.state.error}/>
            <div className="form-control">
              <label>Total Trip Cost</label>
              <div><p className="result">$ {isNaN(tripCost) ? "---" : tripCost}</p></div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="form-control">
                  <label>Traveled Distance</label>
                  <div><p className="result">{isNaN(calculatedDist) ? "---" : calculatedDist} Km</p></div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <div className="form-control align-self-stretch">
                  <label>Fuel Used</label>
                  <div><p className="result">{isNaN(fuelUsed) ? "---" : fuelUsed} L</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
