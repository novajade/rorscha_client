import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../firebase";
//import { GoogleLogin, googleLogout } from '@react-oauth/google';
//import { jwtDecode } from 'jwt-decode';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../AuthContext";

const LoginProcess = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsLoading } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const tokenRef = useRef<string | null>(null);

    //로그아웃 관련
    useEffect(() => {
        const handleLogoutOnClose = () => {
            console.log("💥 창 닫기 감지됨");
            const auth = getAuth();
            signOut(auth);

            const token = tokenRef.current;
            if (token) {
                console.log("📡 로그아웃 요청 전송");
                navigator.sendBeacon(
                    `${process.env.REACT_APP_API_URL}/auth/logout`,
                    new Blob([JSON.stringify({ id_token: token })], {
                        type: "application/json",
                    })
                );
            }
        };
        window.addEventListener("pagehide", handleLogoutOnClose);
        return () => {
            window.removeEventListener("pagehide", handleLogoutOnClose);
        };

    }, []);


    const handleLogin = async () => {

        const auth = getAuth();
        await signOut(auth); // 이전 로그인 세션 초기화

        try {
            const { user, token } = await loginWithGoogle();

            console.log("로그인 시도됨");
            console.log("받은 토큰:", token);
            tokenRef.current = token;

            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login-check`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_token: token }),
            });

            console.log("서버 응답 상태:", res.status);
            const data = await res.text();
            console.log("서버 응답 본문:", data);


            if (res.ok) {
                localStorage.setItem("id_token", token);
                setIsAuthenticated(true);
                setIsLoading(false);

                navigate("/dashboard");
            } else if (res.status == 401) {
                navigate("/denied");
            } else {
                navigate("/denied");
            }


        } catch (err) {
            console.error("Login Error: ", err);
            navigate("/denied");
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <h1 style={{ marginBottom: "1rem" }}>Gurum Search</h1>
            <button
                onClick={handleLogin}
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer"
                }}
            >
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    style={{ width: "18px", height: "18px", marginRight: "8px" }}
                />
                Google로 로그인
            </button>
        </div>
    );
};
export default LoginProcess;