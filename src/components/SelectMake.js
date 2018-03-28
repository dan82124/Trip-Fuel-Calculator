import React, { Component } from 'react';
import $ from 'jquery';

//https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year= #year
const carMakeLU = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=";

export default class SelectMake extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gotMake:false,
      makeOptionList:[],
      selectedMake:undefined,
      error:undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(year){
    const self = this;
    //if(!this.state.gotYear){
      $.ajax({
        type: 'GET',
        url: carMakeLU+year,
        dataType: 'json',
        success: function(response){
          // console.log("Make: "+response);
          const result = response.menuItem;
          // console.log("Make Res: "+result);
          try{
            const resultTag = result.map((tagObj)=>
              <option value={tagObj.value}>{tagObj.value}</option>
            );
            // console.log(resultTag);
            self.setState({
              gotMake: true,
              makeOptionList: resultTag
            });
          }catch(err){
            //self.props.onError(true);
            self.setState({
              error:"No Data Found. Please Reset!"
            });
          }
        },
        error: function(xhr, textStatus, errorThrown){
          //self.props.onError(true);
          self.setState({
            error:"No Data Found. Please Reset!"
          });
        }
      });
    //}
  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      seletcedMake: e.target.value
    });
    // console.log(e.target.value);
    $('#selectMake').prop('disabled', true);
    this.props.onSelectMake(e.target.value);
  }

  render() {
    const year = this.props.selectedYear;
    const error = this.props.errorStatus;

    if(!this.state.gotMake && year && !error){
      this.handleClick(year);
      console.log("Make refreshed!");
    }
    return (
      <div className="form-group col-6">
        <select id="selectMake" className="form-control custom-select"  onChange={this.handleChange} value={this.state.SelectedMake} >
          <option value="">Make...</option>
          {this.state.makeOptionList}
        </select>
        {this.state.error && <p id="error">{this.state.error}</p>}{this.state.error && <p id="error">{this.state.error}</p>}
      </div>
    );
  }
}
