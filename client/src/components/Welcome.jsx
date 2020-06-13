import React, { Component } from 'react'

import WelcomeImg from '../img/welcome.jpg'

export default class Welcome extends Component {
    render() {
        return (
            <img src={WelcomeImg} alt="welcome" className="welcome"/>
        )
    }
}
