import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobDescriptor.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillDelete } from "react-icons/ai";

function JobDescriptor({ match }) {
  // 작업명세서의 id
  const { id } = useParams();

  // 작업명세서 ,로봇, 작업 정보
  const [jobDescriptor, setJobDescriptor] = useState({});
  const [robots, setRobots] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobDescriptorName, setJobDescriptorName] = useState(
    jobDescriptor.name
  );

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

  useEffect(() => {
    setJobDescriptorName(jobDescriptor.name);
  }, [jobDescriptor.name]);

  const handleJobDescriptorName = (e) => {
    setJobDescriptorName(e.target.value);
  };

  // 실행 스케줄
  const [isRepeat, setIsRepeat] = useState(false);
  const [changedExcutedDateTime, setchangedExcutedDateTime] = useState(
    jobDescriptor.executedDateTime
  );
  const handleIsRepeatClick = (e) => {
    setIsRepeat(!isRepeat);
  };

  const handlechangedExcutedDateTime = (e) => {
    setchangedExcutedDateTime(e.target.value);
  };

  // 로봇
  const [changedRobotId, setChangedRobotId] = useState(jobDescriptor.robotId);
  const handleChangedRobotId = (e) => {
    setChangedRobotId(e.target.value);
  };
  useEffect(() => {
    setIsRepeat(jobDescriptor.isRepeat);
    setchangedExcutedDateTime(jobDescriptor.executedDateTime);
    setChangedRobotId(jobDescriptor.robotId);
  }, [jobDescriptor.executedDateTime]);

  // 작업
  const [command, setCommand] = useState("");
  const [parameter, setParameter] = useState("");
  const handleCommandInputChanged = (e) => setCommand(e.target.value);
  const handleParameterInputChanged = (e) => setParameter(e.target.value);

  // 로그
  const [log, setLog] = useState({
    logStatus: "ETC",
    message: "작업명세서를 실행해주세요.",
  });

  // CRUD
  const handleDeleteJobDescriptor = () => {
    axios.delete("http://localhost:8080/api/v1/jobdescriptor/" + id).then(
      (v) => {
        alert("작업명세서가 삭제되었습니다.");
        window.location.href = "http://localhost:3000";
      },
      (e) => {
        alert("서버 장애가 발생했습니다.");
        console.error(e);
      }
    );
  };
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
          setJobs([
            ...jobs,
            {
              id: v.data,
              command: command,
              parameter: parameter,
            },
          ]);
        },
        (e) => {
          alert("서버 장애가 발생했습니다.");
          console.error(e);
        }
      );
  };

  const handleUpdateJobDescriptor = () => {
    if (changedRobotId === null || changedRobotId == "") {
      alert("로봇을 반드시 선택해주세요.");
    } else {
      axios
        .put("http://localhost:8080/api/v1/jobdescriptor/" + id, {
          name: jobDescriptorName,
          robotId: changedRobotId,
          isRepeat: !isRepeat,
          executedDatetime: changedExcutedDateTime,
        })
        .then(
          (v) => {
            alert("작업이 수정되었습니다.");
          },
          (e) => {
            alert("서버 장애가 발생했습니다.");
            console.error(e);
          }
        );
    }
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/job/` + id);
      setJobs(jobs.filter((v) => v.id !== id));
    } catch (e) {
      console.log(e);
    }
  };
  // 작업명세서 실행
  const handleExecJobDescriptor = () => {
    axios
      .get("http://localhost:8080/api/v1/exec/jobdescriptor/" + id)
      .then(
        (v) => {
          setLog(v.data);
        },
        (e) => {
          if(e.response.status === 403) {
            alert("작업명세서에 로봇이 할당되지 않았습니다")
          }
        }
      )
  };

  return (
    <>
      <div>
        <div className="topbar">
          <input
            type="text"
            value={jobDescriptorName}
            onChange={handleJobDescriptorName}
          ></input>
          <div>
            <Button variant="warning" onClick={handleUpdateJobDescriptor}>
              수정
            </Button>
            <Button variant="danger" onClick={handleDeleteJobDescriptor}>
              삭제
            </Button>
            <Button variant="light" onClick={handleExecJobDescriptor}>
              즉시 실행
            </Button>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <h3>실행 스케줄 설정</h3>
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
                  value={changedExcutedDateTime}
                  onChange={handlechangedExcutedDateTime}
                ></input>
              ) : (
                <input
                  id="executedDateTime2"
                  className="form-control"
                  type="datetime-local"
                  name="executedDateTime2"
                  value={null}
                  onChange={handlechangedExcutedDateTime}
                ></input>
              )}
            </div>
          </div>
          <div className="card">
            <h3>로봇 설정</h3>
            <select
              id="robotAddress"
              className="form-select"
              value={changedRobotId}
              onChange={handleChangedRobotId}
            >
              <option value="">로봇을 선택해주세요.</option>
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
                    <tr key={index}>
                      <td>{job.command}</td>
                      <td>{job.parameter}</td>
                      <td
                        onClick={() => onClickDelete(job.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <AiFillDelete />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3>실행 로그</h3>
            {log.logStatus === "ETC" ? (
              <textarea
                className="form-control"
                style={{ color: "grey" }}
                value={log.message}
                rows="6"
                disabled
              ></textarea>
            ) : log.logStatus === "INFO" ? (
              <textarea
                className="form-control"
                style={{ color: "blue" }}
                value={log.message}
                rows="6"
                disabled
              ></textarea>
            ) : (
              <textarea
                className="form-control"
                style={{ color: "red" }}
                value={log.message}
                rows="6"
                disabled
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDescriptor;
