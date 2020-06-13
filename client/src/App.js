import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Home from './components/Home'
import Location from './components/Location'

function App() {
  return (
    <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/displayLocation/:id" component={Location}/>
    </Router>

  );
}

export default App;
