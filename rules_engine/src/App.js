import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import RoutingHolder from '../src/routingHolder';
import './App.css';
import './assets/scss/main.scss'
import Header from './components/header/header'

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        {/* <Header history={history} /> */}
        <Header  history={history} />
        <RoutingHolder history={history} />
        {/* <Footer history={history} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uiUtils: state.utilsReducer,
});

export default connect(mapStateToProps)(
  App,
);
