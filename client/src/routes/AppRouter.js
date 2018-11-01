import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from '../history/history';
import MagicImageLoader from '../components/MagicImageLoader';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = (props) => {
	return (props.error ? <NotFoundPage error={props.error} /> :
		<Router history={history}>
			<Switch>
				<Route path="/" exact={true} component={() => (
					<Redirect to="/magic/0" />
				)} />
				<Route path="/magic/:id(\d+)" exact={true} component={(props) => (
					<MagicImageLoader imageId={parseInt(props.match.params.id, 10)} /> // eslint-disable-line react/prop-types
				)} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

AppRouter.propTypes = {
	error: PropTypes.string
};

const mapStateToProps = ({magicImage: {error}}) => ({
	error
});

export default connect(mapStateToProps)(AppRouter);
