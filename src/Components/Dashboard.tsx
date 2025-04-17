import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
    // <div style={{ textAlign: "center", marginTop: "100px" }}>
    //   <h2>📂 Gurum Search 대시보드</h2>
    //   <p>로그인 성공한 사용자만 접근 가능</p>
    // </div>

    const handleLogout = () => {
        // const auth = getAuth();
        // auth.currentUser?.getIdToken().then((token) => {
        //     navigator.sendBeacon(
        //         `${process.env.REACT_APP_API_URL}/auth/logout`,
        //         new Blob([JSON.stringify({ id_token: token })], {
        //             type: "application/json",
        //         })
        //     );

        console.log("🧹 Logout button clicked");
        const auth = getAuth();
        auth.currentUser?.getIdToken().then((token) => {
            const logoutUrl = `${process.env.REACT_APP_API_URL}/auth/logout`;
            const payload = new Blob([JSON.stringify({ id_token: token })], {
                type: "application/json",

            });

            const sent = navigator.sendBeacon(logoutUrl, payload);
            if (!sent) {
                fetch(logoutUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_token: token }),
                }).then(() => console.log("📡 Logout sent via fetch fallback"));
            } else {
                console.log("📡 Logout sent via sendBeacon");
            }
            localStorage.removeItem("id_token");
        });

        signOut(auth).then(() => {
            window.location.href = "/";
        });
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            return;
        }
        const token = localStorage.getItem("id_token");
        if (!token) {
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/auth/login-check`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: token }),
        })
            .then(res => {
                // Handle authentication state
            })
            .catch(() => {
                // Handle error
            });
    }, []);


    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Left Panel: Image Selector */}
            <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "1rem" }}>
                <h3>Card List</h3>
                {/* TODO: Add card image thumbnails here */}
            </div>

            {/* Middle Panel: CSV Table */}
            <div style={{ flex: 2, borderRight: "1px solid #ccc", padding: "1rem" }}>
                <h3>Keyword Table</h3>
                {/* TODO: Add CSV table rendering here */}
            </div>

            {/* Right Panel: Keyword Details */}
            <div style={{ flex: 1, padding: "1rem" }}>
                <h3>Results</h3>
                {/* TODO: Add selected keyword detail info here */}
            </div>
        </div>
    );
};

export default Dashboard;