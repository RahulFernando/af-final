import React, { Component } from 'react'

export default class LocationInput extends Component {
    
    // image converter
    arrayBufferToBase64(buffer) {

        var base64Flag = 'data:image/jpeg;base64,';
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag + window.btoa(binary);
    };

    render() {
        const {img, simg, name, description, edit, handleFileChange, handleOnChange, handleSubmit} = this.props
        return (
           <div className="container">
                <div className="card">
                   <div className="card-body">
                        {img ?  <img src={img} alt="image" style={{width: 200}}/> : ''}
                        {simg ?  <img src={this.arrayBufferToBase64(simg)} alt="image" style={{width: 200}}/> : ''}
                        <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="file">Upload</label>
                                    <input type="file" class="form-control-file" name="file" id="file" onChange={handleFileChange}/>
                                </div>
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" name="name" id="name" placeholder="Enter name" onChange={handleOnChange} value={name}/>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input type="text" class="form-control" name="description" id="description" placeholder="Enter description" onChange={handleOnChange} value={description}/>
                                </div>

                                {edit ? <button type="submit" class="btn btn-primary">Update</button> : <button type="submit" class="btn btn-primary">Create</button>}
                            </form>
                   </div>
                </div>
           </div>
        )
    }
}
