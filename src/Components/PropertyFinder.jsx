import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

export class PropertyFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  render() {
    const { state } = this;
    const { loading } = state;

    return (
      <div className="card">
        <div className="card-header card-header-primary">
          <h4 className="card-title ">Simple Table</h4>
          <p className="card-category"> Here is a subtitle for this table</p>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className=" text-primary">
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>City</th>
                <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Dakota Rice</td>
                  <td>Niger</td>
                  <td>Oud-Turnhout</td>
                  <td className="text-primary">$36,738</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyFinder;
