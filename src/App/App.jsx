import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import ProfileView from './ProfileView';

class App extends React.Component {
	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			this.props.clearAlerts();
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
						<Router>
							<div>
								{/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
								<Switch>
									<Route exact path="/" component={Home} />
									<Route path="/signup/:username" component={Signup} />
									<Route exact path="/signup/" component={Signup} />
									<Route exact path="/login/" component={Login} />
									<PrivateRoute path="/profile/:userid" component={Profile} />
									<PrivateRoute path="/settings" />
									<Route path="/:username/" component={ProfileView} />
								</Switch>
							</div>
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

function mapState(state) {
	const { alert } = state;
	return { alert };
}

const actionCreators = {
	clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };