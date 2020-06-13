import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             search: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handle change
    handleOnChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name] : value
        })
    }

    // submit handler
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.name === '') {
            alert('No keyword found!')
        } else {
            console.log(this.state.search)
            const data = {
                name: this.state.search
            }
            axios.post('/search', data).then(res => {
                console.log(res)
                if (res.message) {
                    alert(res.message)
                } else {
                    return <Redirect to={`/displayLocation/${res.data._id}`}/>
                }
            })
        }
    }
    
    render() {
        return (
            <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                <input class="form-control mr-sm-2" type="search" name="search" id="search" placeholder="Search" aria-label="Search" onChange={this.handleOnChange}/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}
