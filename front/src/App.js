import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.text(); // parses JSON response into native JavaScript objects
}
class App extends Component {
  constructor(props){
      super()
      this.state = {
          resp: '',
          date: '',
          sec_id: '',
          name: '',
          qty: '',
          last_price: '',
          chg_1d: '',
          obj:{}
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

      fetch("http://" + window.location.hostname+":5000/get").then(data => { data.json().then(obj => {
            console.log(obj)
            _this.setState((state, props) => {return {obj: obj}})
            _this.forceUpdate();
        })
      })
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    postData("http://" + window.location.hostname+":5000/users", this.state).then(resp => {
        //this.setState((state, props) => {return{resp}})
        var _this = this
        if (resp === 'success') {
            fetch("http://" + window.location.hostname+":5000/get").then(data => { data.json().then(obj => {
            console.log(obj)
            _this.setState((state, props) => {return {obj: obj}})
            _this.forceUpdate();
            })
          })
        }
    })
  }
_renderObject(){
    return Object.keys(this.state.obj).map((obj, i) => {
      console.log(obj);
        return (
            <div key={i}>
              obj is: {this.state.obj[obj]}
            </div>
        )
    })
}
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {this.state.resp}
        </p>

      <form onSubmit={this.handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
        </label>

        <label>
          SEC ID:
          <input type="text" name="sec_id" value={this.state.sec_id} onChange={this.handleChange} />
        </label>

        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>

        <label>
          QTY:
          <input type="text" name="qty" value={this.state.qty} onChange={this.handleChange} />
        </label>

        <label>
          Last Price:
          <input type="text" name="last_price" value={this.state.last_price} onChange={this.handleChange} />
        </label>

        <label>
          CHG_1d:
          <input type="text" name="chg_1d" value={this.state.chg_1d} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </header>
      {this._renderObject() }
    </div>
  );
  }
}

export default App;
