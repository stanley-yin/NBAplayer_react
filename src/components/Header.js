import React from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import {devUrl} from '../config/index'

function header() {
  return (
    <div className="container">
      {/* header */}
      <div className="header">
        <div className="row">
          <div className="col">
            <div className="logo-img">
              <img src={`${devUrl}/images/logo_160.png`} alt="" />
            </div>
          </div>
          <div className="col">
            <div className="avatar">
              <FaUserCircle size={48}/>
            </div>
          </div>
        </div>
        <div className="sub-header">player List</div>
      </div>
    </div>
  );
}

export default header;
