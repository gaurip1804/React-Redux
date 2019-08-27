import React from 'react';
import { Switch, Route,Redirect,Router as BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

//import Login from '../containers/login/login';
import Home from '../containers/home/home';
import LicenseType from '../containers/licenseType/licenseType';
import LogOut from './../containers/logOut/logOut'
// import CockpitProcess from '../containers/cockpitProcess';
const redirect = (path, history) => {
  history.push(path);
};

class RoutingHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          sessionStorage.getItem("UserName")==''|| sessionStorage.getItem("UserName")==null?(
          
            <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
          ) : (
            <Component {...props} />
            
          )
        }
      />
    );
    return (<div>
       <BrowserRouter history={this.props.history} basename="/">
        <Switch>
          <Route exact path='/'  component={() => <Home history={this.props.history}/>} />
           {/* <PrivateRoute exact path='/login'  render={() => <Login history={this.props.history}/>} /> */}
          {/* <PrivateRoute path='/licenseType'  component={() => <LicenseType history={this.props.history}/>} />
          <PrivateRoute path='/workflows'  component={() => <CockpitProcess history={this.props.history}/>} /> */}
          <Route path='/logout'  render={() => <LogOut history={this.props.history}/>} />
        </Switch>
        </BrowserRouter>
    </div>
    );
  }
}



export default RoutingHolder

