import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Routes from "./components/routes";
import AppContext from "./components/appContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  render() {
    return (
      <AppContext>
        <ToastContainer />
        <Navbar />
        <main>
          <div className="container mt-2">
            <Routes />
          </div>
        </main>
      </AppContext>
    );
  }
}

export default App;
