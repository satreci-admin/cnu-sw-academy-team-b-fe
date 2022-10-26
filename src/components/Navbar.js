import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import axios from "axios";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [jobDescriptors, setJobDescriptors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/jobdescriptors")
      .then((v) => setJobDescriptors(v.data));
  }, []);

  return (
    <div className="navbar">
      <IconContext.Provider value={{ color: "#14B5AD" }}>
        <span className="nav">
          <Link to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </span>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/">
                <FaIcons.FaHome />
                <span>홈</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/robot">
                <FaIcons.FaRobot />
                <span>로봇</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/jobDescriptor">
                <FaIcons.FaBook />
                <span>작업명세서</span>
              </Link>
            </li>
            {jobDescriptors.map((jobDescriptor, index) => {
              return (
                <li className="nav-text nav-sub-text" key={index}>
                  <Link to={"/jobDescriptor/" + jobDescriptor.id}>
                    <span>{jobDescriptor.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
