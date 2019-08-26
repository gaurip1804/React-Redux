import React, { Component } from "react";
import './licenseType.scss';
import Sidebar from '../../components/sidebar/sidebar';

class LicenseType extends Component {
  constructor() {
    super();
    this.state={
        pageID:'licenseType'
    }
   
  }

  render() {
   
    return (
      <div className="main-container" id="licenseType">
        <Sidebar pageID={this.state.pageID}/>
        <main  className="main-layout">
          <h3 className="bottom-line">License Type </h3>
        </main>
      </div>
    );
  }
}

export default LicenseType