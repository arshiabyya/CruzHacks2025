/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
//App.js

import React from 'react';
import {
    BrowserRouter as Router,
    Routes, Route,
    Link, useNavigate
} from 'react-router-dom';
import Appointments
    from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import './App.css'

const App = () => {
    const isLinkActive =
        (path) =>
            window.location.pathname === path;
    return (
        <Router>
            <div className="container">
                <h1 style={{ color: "green" }}>
                    SlugClubHub
                </h1>
                <nav>
                    <ul>
                        <li className={
                            isLinkActive('/appointments')
                                ? 'active' : ''}>
                            <Link to="/appointments">
                                Add an Event</Link>
                        </li>
                        <li className={
                            isLinkActive('/doctors') ?
                                'active' : ''}>
                            <Link to="/doctors">
                                Search
                            </Link>
                        </li>
                        <li className={
                            isLinkActive('/patients') ?
                                'active' : ''}>
                            <Link to="/patients">
                                View Clubs
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/appointments"
                        element={<Appointments />} />
                    <Route path="/"
                        element={<Appointments />} />
                    <Route path="/doctors"
                        element={<Doctors />} />
                    <Route path="/patients"
                        element={<Patients />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

