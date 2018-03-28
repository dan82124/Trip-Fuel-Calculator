import React, { Component } from 'react';
import $ from 'jquery';

export default class SelectModel extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gotModel:false,
      modelOptionList:[],
      selectedModel:undefined,
      error:undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(year,make){
    const self = this;
    //if(!this.state.gotYear){
      $.ajax({
        type: 'GET',
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`,
        dataType: 'json',
        success: function(response){
          // console.log("Model: "+response);
          const result = response.menuItem;
          // console.log("Model Res: "+result);
          try{
            const resultTag = result.map((tagObj)=>
              <option value={tagObj.value}>{tagObj.value}</option>
            );
            // console.log(resultTag);
            self.setState({
              gotModel: true,
              modelOptionList: resultTag
            });
          }catch(err){
            //self.props.onError(true);
            self.setState({
              error:"No Data Found. Please Reset!"
            });
          }
        },
        error: function(xhr, textStatus, errorThrown){
          //this.props.onError(true);
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
      selectedModel: e.target.value
    });
    // console.log(e.target.value);
    $('#selectModel').prop('disabled', true);
    this.props.onSelectModel(e.target.value);
  }

  render() {
    const year = this.props.selectedYear;
    const make = this.props.selectedMake;
    const error = this.props.errorStatus;
    if(!this.state.gotModel && year && make && !error){
      this.handleClick(year,make);
    }
    return (
      <div className="form-group col-6">
        <select id="selectModel" className="form-control custom-select" onChange={this.handleChange} value={this.state.SelectModel} >
          <option value="">Model...</option>
          {this.state.modelOptionList}
        </select>
        {this.state.error && <p className="error">{this.state.error}</p>}
      </div>
    );
  }
}
