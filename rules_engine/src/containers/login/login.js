import React, { Component } from "react";
import { loadingActions } from '../../redux';
import { Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import "./login.scss";
import bgImg from '../../assets/images/fulcrum-opening-banner.jpg'
import logo from '../../assets/images/Fulcrum-Logo-non-retina.png'
import { AD_LOGIN } from '../../constants/baseURL'
import {GetRequest } from '../../api/apiList'
import Loader from 'react-loader-spinner';
class Login extends Component {
  constructor(){
    super();
    this.state={
      userName:"",
      errorMsg:'',
      loader:true
    }
    this.handleChange=this.handleChange.bind(this)
  }
  redirectTo = (path, history) => {
    history.push(path);
  };
  handleFocus=(e)=>{
    if(e.target.id==='userName'){
      this.setState({
        errorMsg:''
      })
    }
  }
  handleChange=(e)=>{
    this.setState({[e.target.id]:e.target.value})
  }
  handleSubmit=(e)=>{
    sessionStorage.setItem('UserName','');

    const {userName}=this.state;
    const URL=AD_LOGIN + userName;
    const header={'content-type':'application/json'}
    if(userName==='' ){
      this.setState({
        errorMsg:'Please enter user name'
      })
    }else{
      GetRequest(URL,header).then(response=>{
        this.setState({
          loader:true
        })
        if(response.status==200){
          this.setState({
            loader:false
          })
          const data={
            userName:response.data[0].name,
            loggedIn:true
          }
          loadingActions.loginData(data)
          sessionStorage.setItem('UserName',response.data[0].name);
          sessionStorage.setItem('userID',response.data[0].userid);
          sessionStorage.setItem('email',response.data[0].email);
          const from = this.props.history.location.state !== undefined ? this.props.history.location.state.from.pathname : '/home';
          this.redirectTo(from, this.props.history)
        }else{
          const data={
            loggedIn:false
          }
          loadingActions.loginData(data)
        }
      }).catch((error) => {
        //console.log(error);
        this.setState({
          errorMsg:'Please enter valid user name'
        })
      })
    }
    e.preventDefault();

  }
  componentDidMount(){
    this.setState({loader:false})
  }
  componentWillMount(){
     if(window.location.href===window.location.origin+window.location.pathname){
      sessionStorage.clear();
      const data={
        loggedIn:false
      }
      loadingActions.loginData(data)
    }
  }
  render() {
    const {errorMsg,userName}=this.state;
    const User =() =>{
      return (
        <div>
            <Form className="mb20 mt20" onSubmit={e => this.handleSubmit(e)} autoComplete="off">
            <p className='error'>{errorMsg}</p>
              <FormGroup>
                <Label className="input-label">User Name</Label>
                <Input type="email" name="userName" id="userName" placeholder="User Name" className="input-bottom-line" value={userName} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} required={true}/>
              </FormGroup>
              <button type="submit" className="btn btn-secondary form-control mt20">Login</button>
            </Form>
        </div>
      )
    }
    return (
      <div id="login">
        {this.state.loader ? 
								<div className = "page-loader">
												<Loader
												type="Bars"
												color="#00BFFF"
											/> 
									</div> : '' }	
        <div>
          <img alt="background" src={bgImg} className="bg-img"/> 
          <div className="login-container">
            <Row>
              <Col>
                <div className="text-center">
                  <img alt="Logo" src={logo} className="logo mb20" />
                </div>
                {User()}
              </Col>
            </Row>
          </div> 
        </div>
        
      </div>
    );
  }
}

export default Login;
