import React from "react"

export default class TransactionList extends React.Component {

    getAmount = products => {
        let total = 0
        products.map(it => {
            total += Number(it.price) * Number(it.qty)
        })
        return total
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    render() {
        return (
            <div>
                {/* list */}
                <div className="card col-sm-12 my-1 bg-dark mb-2">
                    <div className="card-body row mb-1">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-warning">Customer</small>
                            <h6 className="text-white">{this.props.customer_name}</h6>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-warning">Address</small>
                            <h6 className="text-white">{this.props.customer_address}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-warning">Total Amount</small>
                            <h6 className="text-white">Rp {this.getAmount(this.props.products)}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-bold text-warning">
                                Time: {this.convertTime(this.props.time)}
                            </small>
                            <button className="btn btn-sm btn-block btn-light" data-bs-toggle="modal" data-bs-target={`#modalDetail${this.props.transaction_id}`}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* modal component */}
                <div className="modal fade" id={`modalDetail${this.props.transaction_id}`}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-warning">
                                <h3>Detail of Transaction</h3>
                            </div>
                            <div className="modal-body">
                                <h5>Customer: {this.props.customer_name}</h5>
                                <h6>Time: {this.convertTime(this.props.time)}</h6>
                                <table className="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.products.map((item, index) => (
                                            <tr key={item.product_id}>
                                                <td>{`${index + 1} `}</td>
                                                <td>{item.product.name}</td>
                                                <td>Rp {item.price}</td>
                                                <td>{item.qty}</td>
                                                <td className="textright">Rp {item.price * item.qty}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="textdanger text-bold">
                                                <h4>Total</h4>
                                            </td>
                                            <td className="text-right textdanger text-bold">
                                                <h5>
                                                    Rp {this.getAmount(this.props.products)}
                                                </h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
