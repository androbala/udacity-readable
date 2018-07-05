import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {withRouter, Link} from 'react-router-dom';
import Moment from 'react-moment';
import {getAllPosts, getPostsByCategory} from './../../actions/postActions';

import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import TextField from 'material-ui/TextField';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 2,
		position: 'relative',
		textAlign: 'left'
	}),
	button: {
		float: 'right'
	},
	clearfix: {
		clear: 'both',
	},
	categoryHeader: {
		textDecoration: 'underline',
		fontWeight: 'bold',
		fontSize: 20,
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		float: 'right',
	},
	header: {
		marginTop: 15,
	},
	footer: {
		marginTop: 15,
		fontWeight: 'lighter',
	},
});

class PostsList extends Component {
	state = {
		sortingCriteria: '',
		modalOpen: false,
	}

	componentDidMount() {
		this.props.fetchAllPosts();
	}

	onChange = (ev) => {
		ev.preventDefault();
		let newSortingCriteria = ev.target.value;
		this.props.posts.sort((post1, post2) => {
			switch(newSortingCriteria) {
				case 'score':
					return post2.voteScore - post1.voteScore;
				case 'timestamp':
					return post2.timestamp - post1.timestamp;
				default:
					return null;
			}
		})
		this.setState({ sortingCriteria: newSortingCriteria })
	}

	render() {
		const { classes } = this.props;
		let category;
		let posts = [];

		if (this.props.match.params.categoryPath) {
			category = this.props.match.params.categoryPath;
			this.props.posts.forEach(function(item) {
				if (item.category === category) {
					posts.push(item);
				}
			})
		} else {
			category = 'all categories';
			posts = this.props.posts;
		}

		return (
			<div>
				<div className={classes.header}>
					<span className={classes.categoryHeader}>Posts from {category}</span>
					<FormControl className={classes.formControl}>
					  <InputLabel>Sort Posts</InputLabel>
					  <Select
						  value={this.state.sortingCriteria}
						  onChange={this.onChange}
						  inputProps={{
							  name: 'sortby',
							  id: 'sort-by',
						  }}
					  >
						<MenuItem value="timestamp">By time</MenuItem>
						<MenuItem value="score">By score</MenuItem>
					  </Select>
					</FormControl>
					<div className={classes.clearfix}>
					</div>
				</div>
				<div>
					{posts.length>0 ? posts.map((item, index) => (
						<Paper className={classes.root} elevation={4} key={index}>
							<Typography variant="headline" component="h4"  >
								{item.title}
							</Typography>
							<Typography component="p">
								{item.body}
							</Typography>
							<Typography component="div" className={classes.footer}>
								Author: {item.author}
								, Published on <Moment date={item.timestamp} format="MM/DD/YYYY" />
								<Button size="small" variant="raised" className={classes.button}>
									<Link to={"/posts/" + item.id}>Read More</Link>
								</Button>
								<div className={classes.clearfix}>
								</div>
							</Typography>
						</Paper>
					)) : 'No posts found for this category'}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts ? state.posts.posts : []
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAllPosts: () => dispatch(getAllPosts()),
		fetchPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
	};
}

PostsList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostsList)));