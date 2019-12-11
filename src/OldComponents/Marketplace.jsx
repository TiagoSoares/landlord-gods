import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

export class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      loading: true
    };
  }

  componentDidMount() {
    this.loadMarketplace();
  }

  loadMarketplace = () => {
    const headers = {
      "x-fs-token": "YWRNFU4PJAZBAE33CKP1GVCPAIFER5GPN2VDENGNNA1ON3PV",
      "x-user-id": "5d051234cbff2700016df755",
      "x-app-version-code": "141",
      "x-app-version": "2.8.1",
      "x-app-platform": "Android",
      "x-app-id": "com.landlordgame.tycoon",
      "x-app-flavor": "prod",
      "Content-Type": "application/json",
      "User-Agent": "Android"
    };
    axios
      .get("/landlord/marketplace", { params: {}, headers })
      .then(({ data: { response } }) => {
        this.setState({
          properties: response,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  setSorting = (field, direction) => {
      this.setState({
        field, direction
      })
  }

  render() {
    const { setSorting, state } = this;
    const { properties, loading, field, direction } = state;

    return loading ? (
      <div>loading...</div>
    ) : (
      <div className="row">
        <div className="col-3 text-right">
          <div
            className="btn-group-vertical"
            role="group"
            aria-label="Basic example"
          >
            <h5>Sort By:</h5>
            <button
              type="button"
              onClick={() => setSorting("valuation", "desc")}
              className="btn btn-secondary"
            >
              Valuation (Highest to Lowest)
            </button>
            <button
              type="button"
              onClick={() => setSorting("valuation", "asc")}
              className="btn btn-secondary"
            >
              Valuation (Lowest to Highest)
            </button>
            <button
              type="button"
              onClick={() => setSorting("highestBid", "desc")}
              className="btn btn-secondary"
            >
              Highest Bid (Highest to Lowest)
            </button>
            <button
              type="button"
              onClick={() => setSorting("highestBid", "asc")}
              className="btn btn-secondary"
            >
              Highest Bid (Lowest to Highest)
            </button>
            <button
              type="button"
              onClick={() => setSorting("auctionEndsIn", "asc")}
              className="btn btn-secondary"
            >
              End Of Auction (Soon to A Long Time)
            </button>
            <button
              type="button"
              onClick={() => setSorting("auctionEndsIn", "desc")}
              className="btn btn-secondary"
            >
              End Of Auction (A Long Time to Soon)
            </button>
          </div>
        </div>
        <div className="col-8">
          <table className="table table-sm table-dark text-right">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Valuation</th>
                <th scope="col">Highest bid</th>
                <th scope="col">Percentage</th>
                <th scope="col">Bids</th>
                <th scope="col">End of auction</th>
              </tr>
            </thead>
            <tbody>
              {_.map(
                _.orderBy(properties, field, direction),
                ({
                  venue: { name },
                  valuation,
                  numBids,
                  auctionEndsIn,
                  highestBid,
                  sharesForSale
                }) => (
                  <tr>
                    <th scope="row">{name}</th>
                    <td>
                      ${" "}
                      {valuation
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}
                    </td>
                    <td>
                      ${" "}
                      {highestBid
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}
                    </td>
                    <td>{parseFloat(sharesForSale)/10} %</td>
                    <td>{numBids}</td>
                    <td>{auctionEndsIn > 60 ? `${Math.floor(parseInt(auctionEndsIn)/60)} minutes` : auctionEndsIn + 'seconds'}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Marketplace;
// process.env.REACT_APP_GOOGLE_KEY
