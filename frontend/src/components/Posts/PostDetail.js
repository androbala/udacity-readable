import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, withRouter, Link} from 'react-router-dom';
import Moment from 'react-moment';

//import {getAllPosts, getPostsByCategory} from './../../actions/postActions';

import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
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

class PostDetail extends Component {
    state = {

    }

    componentDidMount() {
        this.props.fetchAllPosts();
    }

    render() {
        const { classes } = this.props;
        let post = {};

        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h4"  >
                        {post.title}
                    </Typography>
                    <Typography component="p">
                        {post.body}
                    </Typography>
                    <Typography component="div" className={classes.footer}>
                        Author: {post.author}
                        , Published on <Moment date={post.timestamp} format="MM/DD/YYYY" />
                        <Button size="small" variant="raised" className={classes.button}>
                            Read More
                        </Button>
                        <div className={classes.clearfix}>
                        </div>
                    </Typography>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post ? state.post : {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: () => dispatch(getPostById())
    };
}

PostDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDetail)));