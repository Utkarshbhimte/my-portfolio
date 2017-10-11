import React, { Component } from "react";
import logo from "./logo.svg";
import "./ComingSoon.css";

class App extends Component {
  render() {
    return (
      <div className="contain-all">
        <section className="coming-soon">
          <div className="container">
            {/* <img src={logo} className="app-logo" alt="logo" /> */}
            <div className="card">
              <h1>The Universe of Utkarsh Bhimte</h1>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
