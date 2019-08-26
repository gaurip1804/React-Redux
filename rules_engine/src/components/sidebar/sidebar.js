import React, { Component } from "react";
import './sidebar.scss';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  render() {
    let {pageID}=this.props;
    return (
        <div className="sidebar">
          <a className="s-sidebar__trigger" href="#0">
             <i className="fa fa-bars"></i>
          </a>
          <nav className="s-sidebar__nav">
             <ul>
                <li>
                   <Link to={'/home'} className={pageID==="home"?"s-sidebar__nav-link active":"s-sidebar__nav-link"} href="#0">
                      <i className="fa fa-users"></i><em>Entities</em>
                   </Link>
                </li>
                <li>
                   <Link to={'/workflows'} className={pageID==="cockpitProcess"?"s-sidebar__nav-link active":"s-sidebar__nav-link"} href="#0">
                     <i className="fa fa-address-card"></i><em>Workflows</em>
                   </Link>
                </li>
                {/* <li>
                   <a className="s-sidebar__nav-link" href="#0">
                      <i className="fa fa-cube"></i><em>Products</em>
                   </a>
                </li>
                <li>
                   <a className="s-sidebar__nav-link" href="#0">
                      <i className="fa fa-user"></i><em>Admins</em>
                   </a>
                </li> */}
             </ul>
          </nav>
        </div>
    );
  }
}

export default Sidebar