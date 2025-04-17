import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Portforlio</h1>
        <button style={{ position: "absolute", top: 20, right: 20 }} onClick={() => navigate("/login")}>
          login
        </button>
      </div>
    );
};

export default LandingPage;