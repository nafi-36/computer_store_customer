import React from "react"
import Navbar from "../component/navbar"
import Footer from "../component/footer"
import ProductList from "../component/productList"
import axios from "axios"
import './style.css'

export default class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            token: "",
            name:""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.name = localStorage.getItem('name')
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

    getProduct = () => {
        let url = "http://localhost:8000/product"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    products: res.data.product
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []

        // cek elsistensi dari data cart pada localstorage
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.product_id === selectedItem.product_id)
        if (existItem) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.name}`)
        }
        else {
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`, "")
            if (promptJumlah !== null && promptJumlah !== "") {
                // jika user memasukkan jumlah item yang dibeli
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                // masukkan item yang dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    componentDidMount = () => {
        this.getProduct()
    }

    render() {
        return (
            <div className="bgm">
                <Navbar />
                <div className="container">
                    <div id="carouselExampleControls" className="carousel slide mt-4 mb-3" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://drive.google.com/uc?id=1u7W9L9sREzjjun7himIbQJEx1IlYCc44" className="d-block w-100" height="500" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://drive.google.com/uc?id=1vJ1qHVuYRq_URhbuzhUJ8GiGrT-bT4Br" className="d-block w-100" height="500" alt="..." />
                            </div>
                            <div class="carousel-caption d-none d-md-block">
                                <h3>Hy {this.state.name}, welcome to our computer store!</h3>
                                <p>What are you looking for? See our products below!<br /> We provide quality original products.</p>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <h2 className="card p-3 text-dark text-center mt-4 mb-4">Product List</h2>
                    <div className="row mb-4">
                        {this.state.products.map(item => (
                            <ProductList
                                key={item.product_id}
                                name={item.name}
                                price={item.price}
                                stock={item.stock}
                                image={"http://localhost:8000/image/product/" + item.image}
                                onCart={() => this.addToCart(item)}
                            />
                        ))}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
