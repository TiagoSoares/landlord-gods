import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import axios from "axios";

const defaultCoords = {
  lat: 53.48079660000001,
  lng: -2.246576138623027
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: { ...defaultCoords },
      llProps: [],
      loadingLLProps: true
    };
  }

  componentDidMount() {
    this.loadProps();
  }

  loadProps = () => {
    const { coords: {lat, lng} } = this.state;

    const headers = {
      "x-fs-Token": "YWRNFU4PJAZBAE33CKP1GVCPAIFER5GPN2VDENGNNA1ON3PV",
      "x-user-id": "5d051234cbff2700016df755",
      "x-app-version-code": "141",
      "x-app-version": "2.8.1",
      "x-app-platform": "Android",
      "x-app-id": "com.landlordgame.tycoon",
      "x-app-flavor": "prod",
      "Content-Type": "application/json",
      "User-Agent": "Android",
      "x-coordinates": `${lat},${lng}`
    };

    const params = {
      location: {
        lat,
        lon: lng
      },
      query: "house"
    };

    axios
      .post("/landlord/assets/nearby", params, { headers: headers })
      .then(({ data: { response } }) => {
        this.setState({
          propsList: response,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  updateProprieties = ({ latLng: { lat, lng } }) => {
    this.setState({ coords: {lat: lat(), lng: lng() }});
    this.loadProps();
  };

  render() {
    const { coords, llProps, loadingLLProps } = this.state;

    const GoogleMapExample = withGoogleMap(() => (
      <GoogleMap
        defaultCenter={{...coords}}
        defaultZoom={13}
      >
        <Marker
          position={{...coords}}
          draggable={!loadingLLProps}
          onDragEnd={e => this.updateProprieties(e)}
        />
      </GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {loadingLLProps ? <div>loading...</div> : <div>Good Shit</div>}
      </div>
    );
  }
}

export default MapContainer;
