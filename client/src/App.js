import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import HomePage from './components/HomePage.jsx';
import {
  PrivateRoute,
  LoggedOutRoute
} from './components/Routes';
import LoginPage from './pages/LoginPage.jsx';
import LogoutFunction from './pages/LogoutFunction.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
// import DashboardPage from './pages/DashboardPage.jsx';
import eToolBox from './pages/eToolBox';
import Schedule from './pages/Schedule';
import Notebook from './pages/Notebook';
import Bookmarks from './pages/Bookmarks';
import TimerPage from './pages/TimerPage';
import Main from './pages/Main';
import Auth from './utils/Auth';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

class App extends Component {

  state = {
    authenticated: false
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    if (this.state.authenticated) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router>
            <div>
              <div className="row align-center animated bounceInDown" id="nav">
                <div className="one sixth triple-gapped" >
                  <Link to="/"> <span className="ec ec-house"></span> eToolBox </Link>
                </div>
                <div className="one sixth triple-gapped skip-three" id="right-top">
                  <div>
                    <Link to="/logout">Log out</Link>
                  </div>
                </div>
              </div>
              <Route exact path="/" component={eToolBox} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
              <PrivateRoute path="/dashboard" component={eToolBox} />
              <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
              <LoggedOutRoute path="/signup" component={SignUpPage} />
              <Route path="/logout" component={LogoutFunction} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
              <Route exact path="/schedule" component={Schedule} />
              <Route exact path="/notebook" component={Notebook} />
              <Route exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/timer" component={TimerPage} />
            </div>
          </Router>
        </MuiThemeProvider>
      )
    }
    else {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router>
            <div>
              <div className="row align-center animated bounceInDown" id="nav">
                <div className="one sixth triple-gapped" >
                  <Link to="/"> eToolBox </Link>
                </div>
                <div className="one sixth triple-gapped skip-three" id="right-top">
                  <div>
                    <Link to="/login">/ Log in</Link>
                    <Link to="/signup">Sign up /</Link>
                  </div>
                </div>
              </div>
                <Route exact path="/" component={Main} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
                <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
                <LoggedOutRoute path="/signup" component={SignUpPage} />
                <Route path="/logout" component={LogoutFunction} />
              </div>
          </Router>
        </MuiThemeProvider>
      )
    }
  }
}
export default App;
