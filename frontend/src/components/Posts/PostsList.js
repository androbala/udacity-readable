import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {withRouter, Link} from 'react-router-dom';
import {getPosts} from './../../actions/postActions';

import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';


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
});

class PostsList extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<h3 style={{textDecoration: 'underline'}}>Posts from {this.props.category === 'all' ? 'all categories' : this.props.category}</h3>
				<div>
					{this.props.posts.map((item) => (
						<Paper className={classes.root} elevation={4}>
							<Typography variant="headline" component="h4"  >
								{item.title}
							</Typography>
							<Typography component="p">
								{item.body}
							</Typography>
							<Button size="small" variant="raised" className={classes.button}>
								Read More
							</Button>
							<div className={classes.clearfix}>
							</div>
						</Paper>
					))}
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
		fetchPosts: () => dispatch(getPosts()),
	};
}

PostsList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostsList)));