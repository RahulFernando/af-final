import React, { Component } from 'react'
import axios from 'axios'

// Navbar component
import Navbar from './Navbar'

export default class Location extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             description: '',
             image: null
        }
    }
    


    componentDidMount() {
        axios.get('/location/' + this.props.match.params.id).then(res => {
            this.setState({
                name: res.data.name,
                description: res.data.description,
                image: res.data.image.data.data,
                hotel: res.data.hotel.name
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
                <Navbar/>
                <div className="container">
                    <div class="card">
                        <img class="card-img-top" src={this.arrayBufferToBase64(this.state.image)} alt="Card image cap"/>
                        <div class="card-body">
                        <h5 class="card-title">{this.state.name}</h5>
                            {this.state.description} <br/> <br/>
                        <h6>Hotel Near</h6>
                            {this.state.hotel}
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}
