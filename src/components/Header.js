import React, { useEffect } from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import { devUrl } from "../config/index";
import axios from "axios";
function header() {
  // useEffect(async () => {
  //   const r = await axios.get("http://localhost:9999/try-sess");
  //   console.log('session:',r);
  // }, []);

  const getData = async()=>{
    const r = await axios.get("http://localhost:9999/try-sess");
    console.log('session:',r);
  }
  return (
    <div className="container">
      {/* header */}
      <div className="header">
        <div className="row">
          <div className="col">
            <div className="logo-img">
              <img src={`${devUrl}/images/logo_160.png`} alt="" />
            </div>
            <button onClick={getData}>getData</button>
          </div>
          <div className="col">
            <div className="avatar">
              <FaUserCircle size={48} />
            </div>
          </div>
        </div>
        <div className="sub-header">player List</div>
      </div>
    </div>
  );
}

export default header;
