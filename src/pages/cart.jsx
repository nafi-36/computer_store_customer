import React from "react"
import Navbar from "../component/navbar"
import Footer from "../component/footer"
import axios from "axios"
import './style.css'

export default class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            customerID: "",
            customerName: "",
            cart: [], // untuk menyimpan list cart
            total: 0, // untuk menyimpan data total belanja
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
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

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        if (localStorage.getItem("customer") !== null) {
            let customer = JSON.parse(localStorage.getItem("customer"))
            this.setState({
                customerID: customer.customer_id,
                customerName: customer.name
            })
        }

        // kalkulasi total harga
        let totalHarga = 0
        tempCart.map(item => {
            totalHarga += (item.price * item.qty)
        })

        // memsukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }

    editItem = selectedItem => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.product_id === selectedItem.product_id)
        let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`, selectedItem.qty)
        tempCart[index].qty = promptJumlah

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refresh cart
        this.initCart()
    }

    dropItem = selectedItem => {
        if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.name} dari cart?`)) {
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let index = tempCart.findIndex(it => it.product_id === selectedItem.product_id)
            tempCart.splice(index, 1)

            // update localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))

            // refresh cart
            this.initCart()
        }
    }

    checkOut = () => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let data = {
            customer_id: this.state.customerID,
            detail_transaksi: tempCart
        }
        let url = "http://localhost:8000/transaksi"
        axios.post(url, data, this.headerConfig())
            .then(res => {
                // clear cart
                window.alert(res.data.message)
                localStorage.removeItem("cart")
                window.location = "/transaction"
            })
            .catch(error => {
                if (error.res) {
                    if (error.res.status) {
                        window.alert(error.res.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    componentDidMount = () => {
        this.initCart()
    }

    render() {
        return (
            <div className="bgv">
                <Navbar />
                <div className="container">
                    <div className="card col-12 mt-4 mb-4 bg-dark">
                        <h3 className="text-white text-center mt-3">Cart List</h3>
                        <hr className="text-white mb-0" />
                        <div className="card-body text-white">
                            <h5 className="text-white mb-3">
                                Customer: {this.state.customerName}
                            </h5>
                            <table className="table table-bordered text-white">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>Rp {item.price}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">Rp {item.price * item.qty}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1 text-white"
                                                    onClick={() => this.editItem(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1"
                                                    onClick={() => this.dropItem(item)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3">Total</td>
                                        <td className="text-right">Rp {this.state.total}</td>
                                        <td>
                                            <button className="btn btn-sm btn-warning btn-block m-1 "
                                                onClick={() => this.checkOut()}
                                                disabled={this.state.cart.length === 0}>
                                                Checkout
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )

    }
}