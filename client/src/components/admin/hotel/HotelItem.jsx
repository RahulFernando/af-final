import React, { Component } from 'react'


export default class HotelItem extends Component {
    render() {
        const {name ,handleDelete} = this.props
        return (
            <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
                <h6>{name}</h6>
                <div className="todo-icon">
                    <span className="mx-2 text-danger" ><i className="fas fa-trash"  onClick={handleDelete}></i></span>
                </div>
            </li>
        );
    }
}
