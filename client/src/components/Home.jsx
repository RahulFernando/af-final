import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

// components
import Navbar from './Navbar'
import Welcome from './Welcome'
// import LocationItem from './LocationItem'

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

    // image convert to original form
    arrayBufferToBase64(buffer) {

        var base64Flag = 'data:image/jpeg;base64,';
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag + window.btoa(binary);
    };

    render() {
        const useStyles = {
            background: {
                marginBottom: "1rem",
            },
            btn: {
                marginLeft: "1.5rem",
            }
        };
        return (
           <div>
               <Navbar/>
                <div>
                    <Welcome/>
                </div>
                <div>
                    <br/>
                    <div className="container-fluid">
                        <section className="popular-products">
                            <div className="row flex-row flex-rap">

                            {this.state.locations.map(location => {
                                return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={location._id}>
                                        <div className="card card-block" style={useStyles.background}>
                                            <div className="overflow">
                                                <img className="card-img-top" src={this.arrayBufferToBase64(location.image.data.data)} alt=""  />
                                            </div>
                                            <div className="card-body text-dark">
                                                <Link to={"/displayLocation/" + location._id}><h5 className="card-title">{location.name}</h5></Link>
                                            </div>  
                                        </div>
                                    </div>
                                )
                            })}
                                
                            </div>
                        </section>
                    </div>
                </div>
           </div>
        )
    }
}
