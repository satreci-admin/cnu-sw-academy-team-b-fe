import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobDescriptor.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function JobDescriptor({ match }) {
  const { id } = useParams();

  const [jobDescriptor, setJobDescriptor] = useState({});
  const [robots, setRobots] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [command, setCommand] = useState("");
  const [parameter, setParameter] = useState("");
  const handleCommandInputChanged = (e) => setCommand(e.target.value);
  const handleParameterInputChanged = (e) => setParameter(e.target.value);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/jobdescriptor/" + id).then((v) => {
      setJobDescriptor(v.data);
      axios
          .get("http://localhost:8080/api/v1/robots")
          .then((v) => setRobots(v.data));
    });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/jobs/" + id).then((v) => {
      setJobs(v.data);
    });
  }, [id]);

  const handleAddJobBtn = () => {
    axios
        .post("http://localhost:8080/job", {
          command: command,
          parameter: parameter,
          activation: false,
          jobDescriptionId: id,
        })
        .then(
            (v) => {
              alert("작업이 추가되었습니다.");
            },
            (e) => {
              alert("서버 장애가 발생했습니다.");
              console.error(e);
            }
        );
    setJobs([
      ...jobs,
      {
        command: command,
        parameter: parameter,
      },
    ]);
  };

  const [isRepeat, setIsRepeat] = useState(true);
  const [isReservation, setIsReservation] = useState(true);
  const handleIsRepeatClick = (e) => {
    setIsRepeat(!isRepeat);
  };
  const handleIsReservationClick = (e) => {
    setIsReservation(!isReservation);
    if (isReservation) {
      setJobDescriptor({ ...jobDescriptor, executedDateTime: "" });
      setIsRepeat(false);
    }
  };

  return (
      <>
        <div>
          <div className="topbar">
            <p>{jobDescriptor.name}</p>
            <div>
              <Button>저장</Button>
              <Button variant="danger">삭제</Button>
              <Button variant="light">즉시 실행</Button>
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <h3>실행 스케줄 설정</h3>
              <div className="mb-3">
                <label className="form-check-label" htmlFor="isReservation">
                  실행예약유무
                </label>
                {jobDescriptor.executedDateTime != null ? (
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="isReservation"
                        checked={isReservation}
                        onClick={handleIsReservationClick}
                    ></input>
                ) : (
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="isReservation"
                        onClick={handleIsReservationClick}
                    ></input>
                )}
              </div>
              <div className="mb-3">
                <div className="form-check form-switch">
                  <label className="form-check-label" htmlFor="isRepeat">
                    반복 실행 여부
                  </label>
                  {jobDescriptor.isRepeat ? (
                      <input
                          className="form-check-input"
                          type="checkbox"
                          id="isRepeat"
                          checked={isRepeat}
                          onClick={handleIsRepeatClick}
                      ></input>
                  ) : (
                      <input
                          className="form-check-input"
                          type="checkbox"
                          id="isRepeat"
                          onClick={handleIsRepeatClick}
                      ></input>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="executedDateTime" className="form-label">
                  실행될 날짜와 시간
                </label>
                {jobDescriptor.executedDateTime != null ? (
                    <input
                        id="executedDateTime"
                        className="form-control"
                        type="datetime-local"
                        name="executedDateTime"
                        value={jobDescriptor.executedDateTime}
                    ></input>
                ) : (
                    <input
                        id="executedDateTime2"
                        className="form-control"
                        type="datetime-local"
                        name="executedDateTime2"
                        value=""
                    ></input>
                )}
              </div>
            </div>
            <div className="card">
              <h3>로봇 설정</h3>
              <select
                  id="robotAddress"
                  className="form-select"
                  value={jobDescriptor.robotId}
              >
                {robots.map((robot, index) => {
                  return (
                      <option key={index} value={robot.id}>
                        {robot.id}
                      </option>
                  );
                })}
              </select>
            </div>
            <div className="card">
              <h3>작업 설정</h3>
              <div className="add-job">
                <input
                    type="text"
                    placeholder="Command"
                    onChange={handleCommandInputChanged}
                ></input>
                <input
                    type="text"
                    placeholder="Parameter"
                    onChange={handleParameterInputChanged}
                ></input>
                <Button onClick={handleAddJobBtn}>추가</Button>
              </div>
              <table className="table">
                <thead>
                <tr>
                  <th className="col-sm-1" scope="col">
                    Command
                  </th>
                  <th className="col-sm-1" scope="col">
                    Parameter
                  </th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job, index) => {
                  return (
                      <tr>
                        <td>{job.command}</td>
                        <td>{job.parameter}</td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <div className="card">
              <h3>실행 로그</h3>
            </div>
          </div>
        </div>
      </>
  );
}

export default JobDescriptor;