import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
//import AccountCircle from 'material-ui-icons/AccountCircle';
//import Menu, { MenuItem } from 'material-ui/Menu';

const styles = {
	root: {
		width: '100%',
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class AppTopBar extends React.Component {
	state = {
		auth: true,
		anchorEl: null,
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							Readable
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

AppTopBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppTopBar);