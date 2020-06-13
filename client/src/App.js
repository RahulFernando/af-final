import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Home from './components/Home'
import Location from './components/Location'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'
import NewLocation from './components/admin/location/Location'

// auth
import {Protected} from './auth/protected'

function App() {
  return (
    <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/displayLocation/:id" component={Location}/>
        <Route exact path="/admin" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/location" component={NewLocation}/>
    </Router>

  );
}

export default App;
