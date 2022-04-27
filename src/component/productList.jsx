import React from "react"

export default class ProductList extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card p-2 h-100">
                    <img src={this.props.image} className="card-img-top" alt={this.props.name} height="180"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5><hr />
                        <p className="card-text">Price: Rp {this.props.price}</p>
                        <p className="card-text">Stock: {this.props.stock}</p>
                        <button className="btn btn-sm btn-info text-white"
                            onClick={this.props.onCart}>
                            Masukkan ke keranjang
                        </button>
                    </div>
                </div>
                {/* <div className="card">
                    <div className="card-body row">
                        <div className="col-5">
                            <img src={this.props.image} className="img"
                                width="200" alt={this.props.name} />
                        </div>
                        <div className="col-7">
                            <h5 className="text-info">
                                {this.props.name}
                            </h5>
                            <h6 className="text-danger">
                                Price: {this.props.price}
                            </h6>
                            <h6 className="text-dark">
                                Stock: {this.props.stock}
                            </h6>
                            <button className="btn btn-sm btn-success m-1"
                                onClick={this.props.onCart}>
                                Masukkan ke keranjang
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}