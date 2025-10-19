import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Navbar from './myComponents/Navbar';
import Login from './myComponents/Login';
import HomeForm from './myComponents/HomeForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <HomeForm />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
