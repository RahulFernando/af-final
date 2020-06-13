import React, { Component } from 'react'
import axios from 'axios'

import SideNav from './SideNav'

export default class Dashboard extends Component {
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
    
     // image converter
     arrayBufferToBase64(buffer) {

        var base64Flag = 'data:image/jpeg;base64,';
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag + window.btoa(binary);
    };
    
    render() {
        return (
            <div>
                <SideNav/> 
                <div className="container">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.locations.map(location => {
                                return <tr>
                                    <td>
                                        <img src={this.arrayBufferToBase64(location.image.data.data)} alt="img" style={{width: 100}}/>
                                    </td>
                                    <td>{location.name}</td>
                                    <td>{location.description}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
