import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from './components/home';
import Calendar from './components/Calendar';
import History from './components/History';
import Login from './components/login';
import Signin from "./components/signin";
import React from 'react';
import { GradientBackground } from "./components/GradientBackground.js";
import Header from './components/headar.js'; 

const App = () => {

      
return ( 

<Router >
    <Header/>
  <Routes>
    <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
              <Layout>
                  <Home />
              </Layout>
          }
      />
          <Route path="/signup" element={<Signin />} />
        <Route
          path="/home"
          element={
              <Layout>
                  <Home />
              </Layout>
          }
      />
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