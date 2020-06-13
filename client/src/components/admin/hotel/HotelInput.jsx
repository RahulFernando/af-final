import React, { Component } from 'react'

export default class HotelInput extends Component {
    render() {
        const {handleSubmit, handleOnChnage} = this.props
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control" name="hotel" id="hotel" placeholder="Enter name" onChange={handleOnChnage}/>
                                </div>

                                <button type="submit" class="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
