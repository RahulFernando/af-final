import React, { Component } from 'react'

import HotelItem from './HotelItem'

export default class HotelList extends Component {
    render() {
        const { hotels, handleDelete } = this.props
        return (
            <div className="container">
                <ul className="list-group my-5">
                    <h3 className="text-capitalize text-center">List</h3>
                    {/*iterate through items*/}
                    {hotels.reverse().map(hotel => {
                        return(
                            <HotelItem key={hotel._id} name={hotel.name} handleDelete={() => handleDelete(hotel._id)}/>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
