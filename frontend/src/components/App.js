import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {withRouter, Link} from 'react-router-dom';
import './App.css';
import {getCategories} from './../actions/categoryActions';
import AppTopBar from './AppTopBar/AppTopBar';
import SideMenu from './SideMenu/SideMenu';
import PostsList from './Posts/PostsList';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: 10,
	},
});

class App extends Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	render() {
		const { classes } = this.props;

		return (
			<div className="App">
				<AppTopBar/>
				<Route exact path="/" render={() => (
					<div className={classes.root}>
						<Grid container spacing={24}>
							<Grid item>
								<SideMenu categories={this.props.categories}/>
							</Grid>
							<Grid item sm={9} className={classes.list}>
								<PostsList category="all"/>
							</Grid>
						</Grid>
					</div>
				)}/>

				<Route path="/categories/:categoryPath" render={() => (
					<div className={classes.root}>
						<Grid container spacing={24}>
							<Grid item>
								<SideMenu categories={this.props.categories}/>
							</Grid>
							<Grid item sm={9} className={classes.list}>
								<PostsList/>
							</Grid>
						</Grid>
					</div>
				)}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories ? state.categories.categories : [],
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCategories: () => dispatch(getCategories()),
	};
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
