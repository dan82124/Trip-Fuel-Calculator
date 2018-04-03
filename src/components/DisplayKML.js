import React, { Component } from 'react';
import $ from 'jquery';

//https://www.fueleconomy.gov/ws/rest/vehicle/#Id
const vehicleLUWithID = "https://www.fueleconomy.gov/ws/rest/vehicle/";
const MPG_TO_KML = 235.215;

export default class DisplayKML extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gotId:false,
      gotMPG:false,
      cityMPG:undefined,
      highwayMPG:undefined,
      error:undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(vehicleId){
    const self = this;
    //if(!this.state.gotYear){
      $.ajax({
        type: 'GET',
        url: vehicleLUWithID+vehicleId,
        dataType: 'json',
        success: function(response){
          try{
            const cityMPG_buff = response.city08U;
            const highwayMPG_buff = response.highway08U;
            // console.log("cityMPG_buff: "+cityMPG_buff);
            // console.log("highwayMPG_buff: "+highwayMPG_buff);
            self.setState({
              gotId: true,
              gotMpg:true,
              cityMPG: cityMPG_buff,
              highwayMPG: highwayMPG_buff
            });
            // if(!self.state.gotId){
            // self.props.onMpg(cityMPG_buff);
            // }
          }catch(err){
            //self.props.onError(true);
            self.setState({
              error:"No Data Found. Please Reload!"
            });
          }
        },
        // error: function(xhr, textStatus, errorThrown){
        //   self.props.onError(true);
        //   self.setState({
        //     error:"No Data Found. Please Reload!"
        //   });
        // }
      });
    //}
  }

  handleChange(e){
    e.preventDefault();
    // this.setState({
    //   seletcedMake: e.target.value
    // });
    // console.log(e.target.value);
    this.props.onSelectFuel(e.target.value);
    this.props.onMpg(this.state.cityMPG);
  }

  render() {
    const vehicleId = this.props.selectedId;
    const error = this.props.errorStatus;
    if(!this.state.gotId && vehicleId && !error){
      this.handleClick(vehicleId);
    }
    const cityKML = MPG_TO_KML/this.state.cityMPG;
    const highwayKML = MPG_TO_KML/this.state.highwayMPG;
    // console.log("City: "+cityKML );
    // console.log("highway: "+highwayKML   );

    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>City (Km/100L)</label>
            <div className="form-control"><p className="result">{isNaN(cityKML)? '---' : Number(cityKML).toFixed(1)}</p></div>
          </div>
          <div className="form-group col-md-4">
            <label>Highway (Km/100L)</label>
            <div className="form-control"><p className="result">{isNaN(highwayKML)? '---' : Number(highwayKML).toFixed(1)}</p></div>
          </div>
          <div className="form-group col-md-4">
            <label>Fuel Type</label>
            <select className="form-control" onChange={this.handleChange} value={this.state.SelectFuel} >
              <option value=""></option>
              <option value="3.03">Diesel</option>
              <option value="2.56">Regular</option>
              <option value="2.84">Mid-Grade</option>
              <option value="3.08">Premium</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
