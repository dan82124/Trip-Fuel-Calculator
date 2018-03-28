import React, { Component } from 'react';
import $ from 'jquery';

export default class SelectOptions extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gotOptions:false,
      optionsOptionList:[],
      selectedOptions:undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(year, make, model){
    const self = this;
    //if(!this.state.gotYear){
      $.ajax({
        type: 'GET',
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`,
        dataType: 'json',
        success: function(response){
          // console.log("Options: "+response);
          const result = response.menuItem;
          // console.log("Options Res: "+result);
          try{
            const resultTag = result.map((tagObj)=>
              <option value={tagObj.value}>{tagObj.text}</option>
            );
            // console.log(resultTag);
            self.setState({
              gotOptions: true,
              optionsOptionList: resultTag
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
      selectedOptions: e.target.value
    });
    // console.log(e.target.value);
    $('#selectOptions').prop('disabled', true);
    this.props.onSelectOptions(e.target.value);
  }

  render() {
    const year = this.props.selectedYear;
    const make = this.props.selectedMake;
    const model = this.props.selectedModel;
    const error = this.props.errorStatus;

    if(!this.state.gotOptions && year && make && model && !error){
      this.handleClick(year,make,model);
    }
    return (
        <div className="form-group col-6">
          <select id="selectOptions" className="form-control custom-select" onChange={this.handleChange} value={this.state.selectedOptions} >
            <option value="">Option...</option>
            {this.state.optionsOptionList}
          </select>
          {this.state.error && <p id="error">{this.state.error}</p>}
        </div>
    );
  }
}
