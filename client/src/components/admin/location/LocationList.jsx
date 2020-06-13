import React, { Component } from 'react'

// components 
import LocationItem from './LocationItem'

export default class LocationList extends Component {
    render() {
        // destructuring
        const { locations, handleEdit, handleDelete } = this.props;

        return (
          <div className="container">
                <ul className="list-group my-5">
                <h3 className="text-capitalize text-center">todo list</h3>
                {/*iterate through items*/}
                {locations.reverse().map(location => {
                    return(
                        <LocationItem key={location._id} name={location.name} file={location.file} description={location.description}  handleEdit={() => handleEdit(location._id)} handleDelete={() => handleDelete(location._id)}/>
                    )
                })}
            </ul>
          </div>
        );
    }
}
