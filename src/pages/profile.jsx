import React from 'react'
import Navbar from '../component/navbar'
import './style.css'
import axios from 'axios'
// import CustomerList from '../component/customerList'
import Footer from '../component/footer'
import { Modal, Button, Form } from 'react-bootstrap'

export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            customer: [],
            isModalOpen: false,
            customer_id: "",
            name: "",
            address: "",
            phone: "",
            username: "",
            password: "",
            image: null,
            action: "update"
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            // this.state.customer = JSON.parse(localStorage.getItem('customer'))
            this.state.customer_id = localStorage.getItem('customer_id')
        }
        else {
            window.location = '/login'
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getCustomer = () => {
        let url = "http://localhost:8000/customer/" + this.state.customer_id

        axios.get(url)
            .then(res => {
                this.setState({
                    customer: res.data.customer,
                    name: res.data.customer.name,
                    address: res.data.customer.address,
                    phone: res.data.customer.phone,
                    username: res.data.customer.username,
                    password: "",
                    image: res.data.customer.image
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleSave = e => {
        e.preventDefault()
        let form = {
            customer_id: this.state.customer_id,
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password
        }
        let url = ""
        if (this.state.action === "update") {
            url = "http://localhost:8000/customer/" + this.state.customer_id
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    // window.alert(response.data.message)
                    this.getCustomer()
                    // this.handleColse()
                })
                .catch(error => console.log(error))
        }
    }

    handleImage = (e) => {
        e.preventDefault()
        let form = new FormData()
        // parameter append => name, value 
        // form.append("name", this.state.name)
        // form.append("phone", this.state.phone)
        // form.append("address", this.state.address)
        // form.append("username", this.state.username)
        // form.append("password", this.state.password)
        form.append("image", this.state.image)

        let url = ""
        if (this.state.action === "update") {
            url = "http://localhost:8000/customer/" + this.state.customer_id
            axios.put(url, form, this.headerConfig())
                .then(res => {
                    this.getCustomer()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    handleEdit = () => {
        this.setState({
            isModalOpen: true,
            // customer_id: this.state.customer_id,
            // name: this.state.name,
            // phone: this.state.phone,
            // address: this.state.address,
            // username: this.state.username,
            // password: "",   // untuk edit password bisa dibuat end-point sendiri 
            image: this.state.image,
            action: "update"
        })
    }

    handleDropImage = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("image", null)
        let url = ""
        if (this.state.action === "update") {
            // if (window.confirm("Are you sure to delete your profile photo ?")) {
            url = "http://localhost:8000/customer/" + this.state.customer_id
            axios.put(url, form, this.headerConfig())
                .then(res => {
                    this.getCustomer()
                })
                .catch(err => {
                    console.log(err.message)
                })

            // }
        }
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    componentDidMount = () => {
        this.getCustomer()
    }

    render() {
        return (
            <div className="bgb">
                <Navbar />
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Customer Profile</h6>
                    </div>
                    <div class="container rounded bg-white mb-4">
                        <div class="row">
                            <div class="col-md-4 border-right">
                                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                    {/* {this.state.image ?
                                        <img class="rounded-circle mt-5" width="150" height="150" src={"http://localhost:8000/image/customer/" + this.state.customer.image} />
                                        :
                                        <img class="rounded-circle mt-5" width="150" height="150" src="http://atim.ac.id/wp-content/uploads/2014/05/avatar.png" />
                                    } */}
                                    <img class="rounded-circle mt-5" width="150" height="150" src={"http://localhost:8000/image/customer/" + this.state.customer.image} />
                                    <h5 class="mt-3">{this.state.customer.name}</h5>
                                    <span class="text-black-50">{this.state.customer.username} | {this.state.customer.phone}</span>
                                    <span class="text-black-100">{this.state.customer.address}</span>
                                    <div className="d-flex mt-3">
                                        <button class="btn btn-sm btn-info text-white m-1" onClick={() => this.handleEdit()} type="button">Change Photo</button>
                                        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Change Photo Profile</Modal.Title>
                                            </Modal.Header>
                                            <Form onSubmit={e => this.handleImage(e)}>
                                                <Modal.Body>
                                                    <Form.Group className="mb-2" controlId="image">
                                                        {/* <Form.Label>Image</Form.Label> */}
                                                        <Form.Control type="file" name="image" placeholder="Enter your photo"
                                                            onChange={this.handleFile} />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="dark" onClick={e => this.handleClose(e)}>
                                                        Close
                                                    </Button>
                                                    <Button variant="info" type="submit">
                                                        Save
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal>
                                        {/* <button class="btn btn-sm btn-dark m-1" onClick={this.setState({ image: false })}>Delete</button> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 border-right">
                                <div class="p-3 py-5">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="text-right">Profile Settings</h4>
                                    </div>
                                    <Form onSubmit={e => this.handleSave(e)}>
                                        <Form.Group className="mb-2" controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="name" placeholder="Enter your name"
                                                value={this.state.name} onChange={this.handleChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="number" name="phone" placeholder="Enter your phone number"
                                                value={this.state.phone} onChange={this.handleChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" placeholder="Enter your address"
                                                value={this.state.address} onChange={this.handleChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="email" name="username" placeholder="Enter your username"
                                                value={this.state.username} onChange={this.handleChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="Enter your password"
                                                value={this.state.password} onChange={this.handleChange} required />
                                        </Form.Group>
                                        {/* <Form.Group className="mb-2" controlId="image">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" name="image" placeholder="Masukkan gambar"
                                                onChange={this.handleFile} />
                                        </Form.Group> */}
                                        <Button variant="info text-white mt-2" type="submit">
                                            Save Profile
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
