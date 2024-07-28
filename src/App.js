// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Upload from "./components/Upload";
import Footer from "./components/footer";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <div className="container main-content">
                  <Upload />
                </div>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
