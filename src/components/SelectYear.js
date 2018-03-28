import React, { Component } from 'react';
import $ from 'jquery';

//https://www.fueleconomy.gov/ws/rest/vehicle/menu/year
const carYearLU = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";

export default class SelectYear extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gotYear:false,
      YearOptionList:[],
      selectedYear:undefined,
      error:undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(){
    var self = this;
    //if(!this.state.gotYear){
      $.ajax({
        type: 'GET',
        url: carYearLU,
        dataType: 'json',
        success: function(response){
          // console.log("Year: "+response);
          const result = response.menuItem;
          // console.log(result);
          try{
            const resultTag = result.map((tagObj)=>
              <option value={tagObj.value}>{tagObj.value}</option>
            );
            // console.log(resultTag);
            self.setState({
              gotYear: true,
              yearOptionList: resultTag
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
      seletcedYear: e.target.value
    });
    // console.log(e.target.value);
    $('#selectYear').prop('disabled', true);
    this.props.onSelectYear(e.target.value);
  }

  render() {
    if(!this.state.gotYear){
      this.handleClick();
    }

    return (
      <div className="form-group col-6">
        <select id="selectYear" className="form-control custom-select"  onChange={this.handleChange} value={this.state.selectedYear}>
          <option value="">Year...</option>
          {this.state.yearOptionList}
        </select>
        {this.state.error && <p className="error">{this.state.error}</p>}
      </div>
    );
  }
}
