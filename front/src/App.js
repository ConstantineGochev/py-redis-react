import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props){
      super()
      this.state = {
          resp: ''
      }
  }
  componentDidMount() {
      let _this = this;
      fetch("http://" + window.location.hostname+":5000").then(function(resp) {
          console.log(resp);
         // console.log(resp.text())
          resp.text().then(str => {
              _this.setState((state, props) => {return{resp:str}})
          })
      })
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {this.state.resp}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
