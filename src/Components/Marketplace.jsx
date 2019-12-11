import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

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

export class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      loading: true,
      filter: {
        field: "",
        direction: ""
      }
    };
  }

  componentDidMount() {
    this.loadMarketplace();
    this.updateTimes();
  }

  loadMarketplace = () => {
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

  updateTimes = () => {
    setTimeout(() => {
      this.setState(({ properties }) => {
        const newProperties = _.map(properties, p =>
          Object.assign({}, p, { auctionEndsIn: p.auctionEndsIn - 1 })
        );
        return {
          properties: _.filter(newProperties, p => p.auctionEndsIn > 0)
        };
      });
      this.updateTimes();
    }, 1000);
  };

  toPrice = price => {
    return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}`;
  };

  toPercentage = percentage => {
    return `${parseFloat(percentage) / 10} %`;
  };

  toTime = (d, type) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  render() {
    const { state, toPrice, toTime, toPercentage } = this;
    const { loading, properties, filter } = state;

    const mappedProperties = _.map(
      _.orderBy(properties, filter.field, filter.direction),
      p =>
        Object.assign(
          {},
          {
            name: p.venue.name,
            valuation: toPrice(p.valuation),
            totalBids: p.numBids,
            auctionEnd: toTime(p.auctionEndsIn),
            highestBid: toPrice(p.highestBid),
            sharesForSale: toPercentage(p.sharesForSale)
          }
        )
    );

    const filters = [
      {
        field: "valuation",
        direction: "desc",
        display: "Valuation (Highest to Lowest)"
      },
      {
        field: "valuation",
        direction: "asc",
        display: "Valuation (Lowest to Highest)"
      },
      {
        field: "highestBid",
        direction: "desc",
        display: "Highest Bid (Highest to Lowest)"
      },
      {
        field: "highestBid",
        direction: "asc",
        display: "Highest Bid (Lowest to Highest)"
      },
      {
        field: "auctionEndsIn",
        direction: "asc",
        display: "End Of Auction (Soon to A Long Time)"
      },
      {
        field: "auctionEndsIn",
        direction: "desc",
        display: "End Of Auction (A Long Time to Soon)"
      }
    ];

    return (
      <>
        <div class="row">
          <div class="ml-auto mr-auto">
            <div class="row">
              {_.map(filters, ({ field, direction, display }) => (
                <div class="col">
                  <button
                    class={`btn btn-secondary btn-block ${
                      field === filter.field && direction === filter.direction
                        ? "active"
                        : null
                    }`}
                    onClick={() =>
                      this.setState({ filter: { field, direction } })
                    }
                  >
                    {display}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header card-header-primary">
            <h4 className="card-title ">Marketplace</h4>
            <p className="card-category">
              Here are all the properties in the market right now.
            </p>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {_.isEmpty(mappedProperties) ? (
                <h1 className='text-center'>
                  The properties are currently loading...
                </h1>
                  
              ) : (
                <table className="table text-right">
                  <thead className=" text-primary">
                    <tr>
                      <th className="text-left">Name</th>
                      <th>Valuation</th>
                      <th>Highest bid</th>
                      <th>Percentage</th>
                      <th>Bids</th>
                      <th>End of auction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(
                      mappedProperties,
                      (
                        {
                          name,
                          valuation,
                          highestBid,
                          sharesForSale,
                          totalBids,
                          auctionEnd
                        },
                        index
                      ) => (
                        <tr key={index}>
                          <td className="text-left">{name}</td>
                          <td>{valuation}</td>
                          <td>{highestBid}</td>
                          <td>{sharesForSale}</td>
                          <td>{totalBids}</td>
                          <td>{auctionEnd}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Marketplace;
