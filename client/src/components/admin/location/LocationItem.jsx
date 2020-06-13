import React, { Component } from 'react'

export default class LocationItem extends Component {
    render() {
        const { name, description, handleEdit, handleDelete } = this.props;
        return (
            <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
                <h6>{name}</h6>
                <p>{description}</p>
                <div className="todo-icon">
                    <span className="mx-2 text-primary" ><i className="fas fa-edit"  onClick={handleEdit}></i></span>
                    <span className="mx-2 text-danger" ><i className="fas fa-trash"  onClick={handleDelete}></i></span>
                </div>
            </li>
        );
    }
}
