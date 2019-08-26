import React, { Component } from "react";
import { connect } from 'react-redux';
import './header.scss';
import logo from '../../assets/images/Fulcrum-Logo-non-retina.png'
import { loadingActions } from './../../redux'
const redirect = (path, history) => {
  history.push(path);
};
const userNotLogin = props => {
  return (
    <span className="float-right profile">
        {/* <span onClick={() => redirect("registration", props.history)}>Registration</span> */}
        <span onClick={() => redirect("/", props.history)}>Login</span>
    </span>
  );
};
const logOut=(props)=>{
  const data={
    loggedIn:false
  }
  loadingActions.loginData(data)
  sessionStorage.clear();
  redirect("/logout", props.history)
}
const userLoggedIn = props => {
  return (
    <span className="float-right profile">
    <i className="fa fa-user" aria-hidden="true"></i><span>Welcome, {props.uiUtils.login.userName==undefined?sessionStorage.getItem("UserName"):props.uiUtils.login.userName}{'  '}</span> 
    <i className="fa fa-bell" aria-hidden="true"></i>
    <span onClick={() =>logOut(props)}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
    </span>
  );
};
class Header extends Component {
  render() {
    
    return (
      <div id="header">
          <img alt="Logo" src={logo} className="logo"/>
          
          {sessionStorage.getItem("UserName")===null ||this.props.uiUtils.login.userName==''?
          userNotLogin(this.props) : userLoggedIn(this.props)}
      

          {/* {this.props.uiUtils.login.loggedIn?
           userLoggedIn(this.props):userNotLogin(this.props)} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uiUtils: state.utilsReducer
});

export default connect(mapStateToProps)(Header);