import React, { Component } from 'react';

export default class Form extends Component{
  render() {
    return (
      <div className="form-group">
        <div >
          <form onSubmit = {this.props.getDirection} autocomplete="off">
              <div className="form-group">
                <input className="form-control" type="text" name="from" placeholder="From..."></input>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" name="to" placeholder="To..."></input>
              </div>
              <button className="form-group btn btn-default">Search</button>
          </form>
        </div>
      </div>
    );
  }
}
