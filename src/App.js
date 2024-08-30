import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout.js";
import Home from './components/home';
import Calendar from './components/Calendar';
import History from './components/History';
import Login from './components/login';
import Signin from "./components/signin.js";
import { GradientBackground } from "./components/GradientBackground.js";
import Header from './components/headar.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Fetch user role from token
        const getUserRole = async () => {
            try {
                const res = await axios.get("http://localhost:5000/get-role", { withCredentials: true });
                setUserRole(res.data.role);
            } catch (err) {
                console.log("Error fetching user role");
            }
        };
        getUserRole();
    }, []);

    const ProtectedRoute = ({ children, roles }) => {
        if (!userRole) {
            return <Navigate to="/" />;
        }
        if (roles && !roles.includes(userRole)) {
            return <Navigate to="/" />;
        }
        return children;
    };

    return (
        <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute roles={['ADMIN', 'HR']}>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/home"  // Add this route if you want /home to be valid
                element={
                    <ProtectedRoute roles={['ADMIN', 'HR']}>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route path="/signup" element={<Signin />} />
            <Route
                path="/calendar"
                element={
                    <Layout>
                        <Calendar />
                    </Layout>
                }
            />
            <Route
                path="/history"
                element={
                    <Layout>
                        <History />
                    </Layout>
                }
            />
        </Routes>
        <GradientBackground />
    </Router>
    );
};

export default App;