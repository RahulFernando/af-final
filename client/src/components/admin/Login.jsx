import React, { Component } from 'react'
import axios from 'axios'

// images 
import User from './img/user.svg'

// custom style
import './style.css'

// service
import {loginAdmin, isAuthenticated} from '../../auth/func'

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

        if (this.state.username !== '' || this.state.password !== '') {
            const admin = {
                username: this.state.username,
                password: this.state.password
            }
    
            loginAdmin(admin).then(res => {
                const auth = isAuthenticated();
                if (auth) {
                    this.props.history.push('/dashboard');
                }
            })
        } else {
            alert('Fields are empty!')
        }

    }

    render() {
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img src={User} id="icon" alt="User Icon" />
                    </div>

                    <form className="login" onSubmit={this.handleSubmit}>
                        <div class="form-group" style={{padding: 10}}>
                            <input type="text"  class="form-control" name="username" id="username" placeholder="Enter username" onChange={this.handleOnChange}/>
                        </div>
                        <div class="form-group" style={{padding: 10}}>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Enter password" onChange={this.handleOnChange}/>
                        </div>
                        <div style={{paddingBottom: 10}}>
                            <input type="submit" class="btn btn-primary" value="Log In"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
