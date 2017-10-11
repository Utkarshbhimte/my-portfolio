import React, { Component } from "react";
import ReactSVG from "react-svg";
import logo from "./logo.svg";
import sampleSize from "lodash/sampleSize";
import sample from "lodash/sample";
import random from "lodash/random";
import "./ComingSoon.css";

let icons = [
  "neptune-with-satellite.svg",
  "galaxy-view.svg",
  "spaceport.svg",
  "sputnik-1.svg",
  "big-moon.svg",
  "inclined-satellite.svg",
  "sputnik.svg",
  "big-satellite.svg",
  "international-space-station.svg",
  "jupiter-with-satellite.svg",
  "saturn.svg",
  "ufo.svg",
  "uranus-with-satellite.svg",
  "venus-with-satellite.svg",
  "death-star.svg",
  "mars-with-satellite.svg",
  "space-lander.svg",
  "earth-and-moon.svg"
];

const zIndexs = [
  { class: "front", size: 50 },
  { class: "back", size: 24 },
  { class: "middle", size: 37 }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: [],
      sensor: {}
    };

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  componentDidMount = () => {
    this._importIcons();
    this._getheadingPosition();

    window.addEventListener("deviceorientation", this._handleOrientation, true);
  };

  _handleOrientation = event => {
    // const changeValue = (currValue, newValue) => {
    //   if (Math.abs(currValue - newValue) > 0.1) return newValue;
    //   else currValue || 0;
    // };

    // var absolute = changeValue("absolute");
    // var alpha = changeValue("alpha");
    // var beta = changeValue("beta");
    // var gamma = changeValue("gamma");

    // Do stuff with the new orientation data
    const { absolute, alpha, beta, gamma } = event;

    // const sensor = {
    //   absolute: changeValue(this.state.absolute, absolute),
    //   alpha: changeValue(this.state.alpha, alpha),
    //   beta: changeValue(this.state.beta, beta),
    //   gamma: changeValue(this.state.gamma, gamma)
    // };

    this.setState({ sensor: { absolute, alpha, beta, gamma } });
  };

  // helper
  _getRandomCoords = i => {
    const quad = Math.round(i % 4) + 1;

    const half_height = this.height / 2;
    const half_width = this.width / 2;

    const x_state = Math.round(quad / 2) !== 1 ? true : false;
    const y_state = quad % 2 === 0 ? true : false;

    const xAxis = Math.random() * half_width;
    const yAxis = Math.random() * half_height + 50;

    console.log("quad", quad, x_state, y_state);

    return {
      xAxis,
      yAxis,
      vert: y_state ? "left" : "right",
      hor: x_state ? "top" : "bottom"
    };
  };

  _getheadingPosition = () => {
    const heading = document.querySelector(".heading");
    const heading_height = heading.clientHeight;
    const heading_offset = heading.offsetTop;
    console.log({ heading_height, heading_offset });
  };

  //TODO: have a fcntion to make sure it is not coinciding with the heading. . .
  _moveBitch = ({ xAxis, yAxis }) => {
    return { xAxis, yAxis };
  };

  renderImage = ({ xAxis, yAxis, target, i, hor, vert }) => {
    console.log({ xAxis, yAxis, target, i, hor, vert });
    return (
      <img
        key={i}
        style={{
          [hor]: xAxis,
          [vert]: yAxis,
        }}
        className="space-icon"
        src={target}
        alt=""
      />
    );
  };

  _importIcons = async () => {
    icons = sampleSize(icons, Math.round(Math.random() * 5) + 5);
    icons = await Promise.all([
      ...icons.map(async (icon, i) => ({
        ...this._getRandomCoords(i),
        i,
        target: await require(`./images/space-icons/${icon}`)
      }))
    ]);

    console.log({ icons });
    this.setState({ icons });
  };

  render() {
    return (
      <div className="contain-all">
        <section className="coming-soon">
          <div className="container">
            {/* <img src={logo} className="app-logo" alt="logo" /> */}
            <div className="card">
              <h1 className="heading">Loading. . .</h1>
              <span>
                abs: {this.state.sensor.absolute}, <br /> alpha:{" "}
                {this.state.sensor.alpha},<br /> beta: {this.state.sensor.beta},<br />{" "}
                gamma: {this.state.sensor.gamma}{" "}
              </span>
            </div>

            {this.state.icons.length > 0 &&
              this.state.icons.map(this.renderImage)}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
