import React, { Component } from 'react'
import axios from 'axios'

// components
import HotelList from './HotelList'
import SideNav from '../SideNav'
import HotelInput from './HotelInput'

export default class Hote extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hotels: [],
             hotel: '',
        }

        this.handleOnChnage = this.handleOnChnage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios.get('/hotel').then(res => {
            console.log(res)
            this.setState({
                hotels: res.data
            })
        })
    }
    

    // onChnage handler
    handleOnChnage = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name] : value
        })
    }

    // submit handler
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.hotel === '') {
            alert('Fields cannot be empty !')
        } else {
            const hotel = {
                name: this.state.hotel
            }
            axios.post('/hotel', hotel).then(res => {
                alert(res.data.message)
                axios.get('/hotel').then(res => {
                    this.setState({
                        hotels: res.data
                    })
                })
            })
        }
        this.setState({
            hotel: ''
        })
    }

    // delete 
    handleDelete = (id) => {
        axios.delete('/hotel/' + id).then(res => {
            alert(res.data.message)
            axios.get('/hotel').then(res => {
                this.setState({
                    hotels: res.data
                })
            })
        })
    }
    
    render() {
        return (
            <div>
                <SideNav/>
                <HotelInput handleSubmit={this.handleSubmit} handleOnChnage={this.handleOnChnage}/>
                <HotelList hotels={this.state.hotels} handleDelete={this.handleDelete}/>
            </div>
        )
    }
}
