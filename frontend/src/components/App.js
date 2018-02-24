import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {withRouter, Link} from 'react-router-dom';
import './App.css';
import {getCategories} from './../actions/categoryActions';
import AppTopBar from './AppTopBar/AppTopBar';
import SideMenu from './SideMenu/SideMenu';

class App extends Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	render() {
		console.log(this.props.categories);
		return (
			<div className="App">
				<AppTopBar/>
				<div className="Side-menu">
					<SideMenu categories={this.props.categories}/>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<p>
					Talking to the backend yields these categories: <br/>
					{this.props.categories && JSON.stringify(this.props.categories)}
				</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories ? state.categories : [],
		//posts: state.posts ? state.posts : []
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCategories: () => dispatch(getCategories()),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
