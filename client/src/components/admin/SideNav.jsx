import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './style.css'

export default class SideNav extends Component {
    render() {
        return (
            <div class="sidenav">
                <Link to={"/dashboard"}><i class="fas fa-home"></i>&nbsp; Home</Link>
                <Link to={"/location"}><i class="fas fa-plus"></i> &nbsp; New</Link>
            </div>
        )
    }
}
