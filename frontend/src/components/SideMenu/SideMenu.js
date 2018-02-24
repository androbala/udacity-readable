import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
//import ListSubheader from 'material-ui/List/ListSubheader';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ListIcon from 'material-ui-icons/List';
import HomeIcon from 'material-ui-icons/Home';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ChevronRightIcon  from 'material-ui-icons/ChevronRight';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
});

class SideMenu extends React.Component {
	state = {open: true};

	handleClick = () => {
		this.setState({open: !this.state.open});
	};

	render() {
		const {classes, categories} = this.props;
		return (
			<div className={classes.root}>
				<List
					component="nav"
				>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText inset primary="Home"/>
					</ListItem>
					<ListItem button onClick={this.handleClick}>
						<ListItemIcon>
							<ListIcon />
						</ListItemIcon>
						<ListItemText inset primary="Categories"/>
						{this.state.open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={this.state.open} timeout="auto" unmountOnExit>
						{categories && categories.length > 0 && categories.map((category, index) => (
							<List component="div" disablePadding key={index}>
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<ChevronRightIcon />
									</ListItemIcon>
									<ListItemText inset primary={category.name}/>
								</ListItem>
							</List>
						))}
					</Collapse>
				</List>
			</div>
		);
	}
}

SideMenu.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);