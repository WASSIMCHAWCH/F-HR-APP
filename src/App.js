import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard.js";
import Layout from "./components/layout.js";
import Home from './components/home';
//import CalendarComponent from './components/Calendar';
import CalendarPage from './components/cal.js';

import History from './components/History';
import Login from './components/login';
import Signin from "./components/signin.js";
import { GradientBackground } from "./components/GradientBackground.js";
import React from 'react';
import ProtectedRoute from './components/auth/auth.js';
import Unauthorized from './components/auth/unauthorized.js';
import Autorisation from './demande/autorisation.js';
import Congee from './demande/congee.js';
import Maladie from './demande/maladie.js';




const App = () => {

return (
    <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/unauthorized"
                    element={
                        <Layout>
                            <Unauthorized />
                        </Layout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR']}>
                        <Layout>
                            <Dashboard />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home"  // Add this route if you want /home to be valid
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR','User']}>
                        <Layout>
                            <Home />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/signup" element={<Signin />} />
                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR','User']}>
                        <Layout>
                            <CalendarPage />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR','User']}>
                        <Layout>
                            <History />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/congee"
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR','User']}>
                        <Layout>
                            <Congee />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/autorisation"
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR','User']}>
                        <Layout>
                            <Autorisation />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/maladie"
                    element={
                        <ProtectedRoute roles={['ADMIN', 'HR','User']}>
                        <Layout>
                            <Maladie />
                        </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <GradientBackground />
    </Router>

);
};

export default App;