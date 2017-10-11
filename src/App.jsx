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
      icons: []
    };

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  componentDidMount = () => {
    this._importIcons();
    this._getheadingPosition();
  };

  // helper
  _getRandomCoords = i => {
    const quad = Math.round(i % 4) + 1;

    const half_height = this.height / 2;
    const half_width = this.width / 2;

    const x_state = Math.round(quad / 2) - 1;
    const y_state = quad % 2 === 0 ? 1 : 0;

    const xAxis = x_state * half_width + Math.random() * half_width;
    const yAxis = y_state * half_height + Math.random() * half_height;

    // console.log("quad", quad, x_state, y_state);

    return { xAxis, yAxis };
  };

  _getheadingPosition = () => {
    const heading = document.querySelector(".heading");
    const heading_height = heading.clientHeight;
    const heading_offset = heading.offsetTop;
    console.log({heading_height, heading_offset });
  };

  //TODO: have a fcntion to make sure it is not coinciding with the heading. . .
  _moveBitch = ({ xAxis, yAxis }) => {
    return { xAxis, yAxis };
  };

  renderImage = (icon, i) => {
    const { xAxis, yAxis } = this._getRandomCoords(i);

    const style = { top: yAxis, left: xAxis };
    const zIndex = sample(zIndexs)

    // console.log({
    //   top: `${yAxis} out of ${this.height / 2}/${this.height}`,
    //   left: `${xAxis} out of ${this.width / 2}/${this.width}`
    // });

    return (
      <img key={i} style={style} className="space-icon" src={icon} alt="" />
    );
  };

  _importIcons = async () => {
    icons = sampleSize(icons, random(7, 12));
    icons = await Promise.all([
      ...icons.map(async icon => await require(`./images/space-icons/${icon}`))
    ]);

    // console.log({ icons });
    this.setState({ icons });
  };

  render() {
    return (
      <div className="contain-all">
        <section className="coming-soon">
          <div className="container">
            {/* <img src={logo} className="app-logo" alt="logo" /> */}
            <div className="card">
              <h1 className="heading">Sample Text here</h1>
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
