import { Component } from "react";
import "./App.css";
import SimpleTabs from "./Tabs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      control: {
        raw: "",
        decoded: "",
      },
      variant: {
        raw: "",
        decoded: "",
      },
    };
    this.decode = this.decode.bind(this);
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
  update(controlOrVariant, beacon) {
    this.setState({
      [controlOrVariant]: {
        raw: beacon,
        decoded: this.decode(beacon),
      },
    });
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
