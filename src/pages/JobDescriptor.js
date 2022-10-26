import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDescriptor({ match }) {
  const { id } = useParams();
  const [jobDescriptor, setJobDescriptor] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/jobdescriptor/" + id)
      .then((v) => setJobDescriptor(v.data));
  }, [id]);

  return (
    <>
      <div>
        <h1>id={id} jobDescriptor</h1>
        <p>{jobDescriptor.name}</p>
      </div>
    </>
  );
}

export default JobDescriptor;
