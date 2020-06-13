import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class LocationItem extends Component {

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
        const { name, id, image } = this.props;
        return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={id}>
                <div className="card card-block" style={useStyles.background}>
                    <div className="overflow">
                        <img src={this.arrayBufferToBase64(image)} alt="" className="card-img-top" />
                    </div>
                    <div className="card-body text-dark">
                        <Link to={"/displayLocation/" + id}><h5 className="card-title">{name}</h5></Link>
                    </div>  
                </div>
            </div>
        );
    }
}
