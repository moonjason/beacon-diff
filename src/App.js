import { Component } from 'react';
import './App.css';
import SimpleTabs from './Tabs';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      control: {

      },
      variant: {

      }
    }
  }
  render() {
    return (
      <div className="App">
        <SimpleTabs />
      </div>
    );
  }
}

export default App;
