import React, { Component } from 'react'
import axios from 'axios'

// components
import SideNav from '../SideNav'
import LocationInput from './LocationInput'
import LocationList from './LocationList'

export default class Location extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: '',
             name: '',
             description: '',
             file: null,
             img: null,
             simg: null,
             locations: [],
             edit: false
        }

        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    
    componentDidMount() {
        axios.get('/locations').then(res => {
            this.setState({
                locations: res.data
            })
        })
    }
    
    // file onChange
    handleFileChange = (e) => {
        let target = e.target;
        let value = target.files[0];
    
        this.setState({
          img: URL.createObjectURL(value),
          file: value
        })
    }

    // onChnage for other inputs
    handleOnChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name] : value
        })
    }

    // submit func
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.name === '' && this.state.description === '' && this.state.file === null) {
            alert('Fields cannot be empty !')
        } else {
            if (!this.state.edit) {
                const data = new FormData();

                data.append('file', this.state.file)
                data.append('name', this.state.name)
                data.append('description', this.state.description)

                axios.post('/location', data).then(res => {
                    alert('Uploaded !')
                    axios.get('/locations').then(res => {
                        this.setState({
                            locations: res.data
                        })
                    })
                })
            } else {
                const location = {
                    name: this.state.name,
                    description: this.state.description
                }

                axios.put('/location/' + this.state.id, location).then(res => {
                    alert(res.data.message)
                    axios.get('/locations').then(res => {
                        this.setState({
                            locations: res.data
                        })
                    })
                })
            }
        }

        this.setState({
            id: '',
            name: '',
            description: '',
            file: null,
            img: null,
            simg: null,
            edit: false
        })
    }

    // edit
    handleEdit = (_id) => {
        const selectedLocation = this.state.locations.filter(location => location._id === _id);
        this.setState({ 
            id: _id,
            name: selectedLocation[0].name,
            description: selectedLocation[0].description,
            simg: selectedLocation[0].image.data.data,
            edit: true
        })
    }

    // delete
    handleDelete = (_id) => {
        if (window.confirm("Do you need to remove this location?")) {
            axios.delete('/location/' + _id).then(resp => {
                alert(resp.data.message)
                axios.get('/locations').then(res => {
                    this.setState({
                        locations: res.data
                    })
                })
            
            });
        }
    }

    render() {
        return (
            <div>
                <SideNav/>
                <LocationInput handleFileChange={this.handleFileChange} handleOnChange={this.handleOnChange} handleSubmit={this.handleSubmit} img={this.state.img} simg={this.state.simg} name={this.state.name} description={this.state.description} edit={this.state.edit}/>
                <LocationList locations={this.state.locations} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>
            </div>
        )
    }
}
