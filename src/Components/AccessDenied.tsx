import React from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  }
  return (
    <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
      <h2>🚫접근 권한이 없습니다🚫</h2>
      <p>관리자에게 연락하세요</p>
      <button onClick={handleGoHome} style={{ marginTop: "20px", padding: "10px 10px" }}>
        홈페이지로 이동
      </button>
    </div>
  )

};

export default AccessDenied;