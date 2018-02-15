import React, { Component } from 'react';
import './App.css';
import {getCategories} from './utils/Api';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentDidMount() {
		getCategories()
			.then((data) => {
				this.setState({categories: data.categories});
			});
	}

	render() {
		return (
            <div className="App">
              <div className="App-header">
                <h2>Welcome to React</h2>
              </div>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
              <p>
                Talking to the backend yields these categories: <br/>
				  {this.state.categories && JSON.stringify(this.state.categories)}
              </p>
            </div>
		);
	}
}

export default App;
