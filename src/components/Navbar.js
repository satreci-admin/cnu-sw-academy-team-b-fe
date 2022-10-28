import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [jobDescriptors, setJobDescriptors] = useState([]);
  const [jobDescriptorName, setJobDescriptorName] =
    useState("새로운 작업명세서");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/jobdescriptors")
      .then((v) => setJobDescriptors(v.data));
  }, []);

  const handleJobDescriptorNameInputChanged = (e) =>
    setJobDescriptorName(e.target.value);

  const addJobDescriptorBtn = () => {
    if (jobDescriptorName === "") {
      alert("작업명세서 이름을 입력해주세요.");
    } else {
      axios
        .post("http://localhost:8080/api/v1/jobdescriptor", {
          name: jobDescriptorName,
          isRepeat: false,
        })
        .then(
          (v) => {
            alert("작업명세서가 생성되었습니다.");
            axios
              .get("http://localhost:8080/api/v1/jobdescriptors")
              .then((v) => setJobDescriptors(v.data));
            showSidebar();
            navigate("/jobDescriptor/" + (jobDescriptors.length + 1));
          },
          (e) => {
            alert("서버 장애가 발생했습니다.");
            console.error(e);
          }
        );
    }
  };

  return (
    <div className="navbar">
      <IconContext.Provider value={{ color: "#14B5AD" }}>
        <span className="nav">
          <Link to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </span>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className="nav-text hover" onClick={showSidebar}>
              <Link to="/">
                <FaIcons.FaHome />
                <span>홈</span>
              </Link>
            </li>
            <li className="nav-text hover" onClick={showSidebar}>
              <Link to="/robot">
                <FaIcons.FaRobot />
                <span>로봇</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link>
                <FaIcons.FaBook />
                <span>작업명세서</span>
              </Link>
            </li>
            <div className="addJobDescriptor">
              <div className="mb-3">
                <h4>작업명세서 추가</h4>
                <label htmlFor="jobDescriptorName" className="form-label">
                  이름
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jobDescriptorName"
                  value={jobDescriptorName}
                  onChange={handleJobDescriptorNameInputChanged}
                />
              </div>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={addJobDescriptorBtn}
                >
                  추가하기
                </Button>
              </div>
            </div>
            {jobDescriptors.map((jobDescriptor, index) => {
              return (
                <li
                  className="nav-text nav-sub-text"
                  key={index}
                  onClick={showSidebar}
                >
                  <Link
                    to={"/jobDescriptor/" + jobDescriptor.id}
                    onClick={() =>
                      setTimeout(() => window.location.reload(), 0.01)
                    }
                  >
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
