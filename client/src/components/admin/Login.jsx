import React, { Component } from 'react'
import axios from 'axios'

// images 
import User from './img/user.svg'

// custom style
import './style.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             password: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this);
    }
    
    // on change function
    handleOnChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name] : value
        })
    }

    // submit form
    handleSubmit = (e) => {
        e.preventDefault();

        const admin = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/login', admin).then(res => {
            if (res.data.token) {
                this.props.history.push('/dashboard');
            }
        })
    }

    render() {
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img src={User} id="icon" alt="User Icon" />
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <input type="text"  class="fadeIn first login" name="username" id="username" placeholder="Enter username" onChange={this.handleOnChange}/>
                        <input type="password" class="fadeIn second login" name="password" id="password" placeholder="Enter password" onChange={this.handleOnChange}/>
                        <input type="submit" class="fadeIn third" value="Log In"/>
                    </form>
                </div>
            </div>
        )
    }
}
