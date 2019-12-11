import React, { Component } from "react";
import _ from "lodash";
import "./Stylesheets/material-dashboard.css";
import sidebackBG from "./Assets/sidebar.jpg";
import Marketplace from "./Components/Marketplace";
import PropertyFinder from "./Components/PropertyFinder";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: "marketplace"
    };
  }
  render() {
    const { selectedPage } = this.state;
    const navLinks = [
      {
        name: "Marketplace",
        accessor: "marketplace",
        icon: "trending_up"
      },
      {
        name: "Find Properties",
        accessor: "find_properties",
        icon: "find_in_page"
      }
    ];
    return (
      <div className="wrapper">
        <div
          className="sidebar"
          data-color="rose"
          data-background-color="black"
          data-image={sidebackBG}
        >
          <div className="logo">
            <a href="/" className="simple-text logo-normal">
              Lanlord Gods
            </a>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {_.map(navLinks, (nl, key) => (
                <li
                  key={key}
                  className={`nav-item ${
                    nl.accessor === selectedPage ? "active" : null
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => this.setState({ selectedPage: nl.accessor })}
                  >
                    <i className="material-icons">{nl.icon}</i>
                    <p>{nl.name}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="main-panel">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {selectedPage === "marketplace" && <Marketplace />}
                  {selectedPage === "find_properties" && <PropertyFinder />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
