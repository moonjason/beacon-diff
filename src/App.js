import { Component } from "react";
import "./App.css";
import SimpleTabs from "./Tabs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev_control: localStorage.prev_control ?
      JSON.parse(localStorage.prev_control).length > 10 ?
        JSON.parse(localStorage.prev_control).slice(JSON.parse(localStorage.prev_control).length - 10)
        : JSON.parse(localStorage.prev_control)
      : [],
      prev_variant: localStorage.prev_variant ?
      JSON.parse(localStorage.prev_variant).length > 10 ?
        JSON.parse(localStorage.prev_variant).slice(JSON.parse(localStorage.prev_variant).length - 10)
        : JSON.parse(localStorage.prev_variant)
      : [],
      control: localStorage.control ? JSON.parse(localStorage.control) : {
        raw: "",
        decoded: "",
      },
      variant: localStorage.variant ? JSON.parse(localStorage.variant) : {
        raw: "",
        decoded: "",
      },
    };
    this.decode = this.decode.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
    this.update = this.update.bind(this);
  }
  decode(beacon) {
    const replacedBeacon = beacon.replace(/&D=/g, "&D||");
    const aBeacon = replacedBeacon.split("&");
    //An array of the prefix to be used if found in the beacon. If a key ends with a "."
    const aPrefixes = [];
    //Contains the cleanedup key/value pairs
    const oCleanedVals = {};
    for (var i = 0; i < aBeacon.length; i++) {
      const aPairs = aBeacon[i].split(/=(.+)/);
      const prefixStart = /\w+\.$/gi;
      const prefixEnd = /^\.\w+/gi;
      if (aPairs[0] !== "c." && prefixStart.test(aPairs[0])) {
        aPrefixes.push(aPairs[0]);
      }
      if (prefixEnd.test(aPairs[0])) {
        aPrefixes.pop();
      }

      if (typeof aPairs[1] != "undefined") {
        const key = aPrefixes.join("") + aPairs[0];
        const val = aPairs[1].replace("D||", "D=");
        oCleanedVals[key] = decodeURIComponent(val);
      }
    }
    return oCleanedVals;
  }
  updateStorage() {
    localStorage.prev_control = JSON.stringify(this.state.prev_control);
    localStorage.prev_variant = JSON.stringify(this.state.prev_variant);
    localStorage.control = JSON.stringify(this.state.control);
    localStorage.variant = JSON.stringify(this.state.variant);
  }
  update(controlOrVariant, beacon) {
    if(this.state[controlOrVariant].raw.length === 0) {
      this.setState({
        [`prev_${controlOrVariant}`]: [
          ...this.state[`prev_${controlOrVariant}`]
        ],
        [controlOrVariant]: {
          raw: beacon,
          decoded: this.decode(beacon),
        },
      }, this.updateStorage);
    } else {
      this.setState({
        [`prev_${controlOrVariant}`]: [
          ...this.state[`prev_${controlOrVariant}`],
          this.state[controlOrVariant]
        ],
        [controlOrVariant]: {
          raw: beacon,
          decoded: this.decode(beacon),
        },
      }, this.updateStorage);
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <SimpleTabs
          update={this.update}
          control={this.state.control}
          variant={this.state.variant}
        />
      </div>
    );
  }
}

export default App;
