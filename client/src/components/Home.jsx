import React, { Component } from 'react'
import axios from 'axios'

// components
import Navbar from './Navbar'
import Welcome from './Welcome'
import LocationItem from './LocationItem'

import './style.css';

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             locations: []
        }
    }

    componentDidMount() {
        axios.get('/locations').then(res => {
            console.log(res.data)
            this.setState({
                locations: res.data
            })
        })
    }

    render() {

        return (
           <div>
               <Navbar/>
                <div>
                    <Welcome/>
                </div>
                <div>
                    <br/>
                   {this.state.locations.map(location => {
                       return (
                            <LocationItem name={location.name} id={location._id} image={location.image.data.data}/>
                       )
                   })}
                </div>
           </div>
        )
    }
}
