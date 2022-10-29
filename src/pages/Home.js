import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="hero">
      <div className="hero__bg">
        <picture>
          <img
            alt="background-img"
            src="https://images.unsplash.com/photo-1491982883790-ead7c97a047e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2594&q=80"
          />
        </picture>
      </div>
      <div className="hero__cnt">
        <h1>Simple Rpa</h1>
        <p>간단한 조작만으로 반복되는 작업을 수행하세요.</p>
      </div>
    </div>
  );
}

export default Home;
