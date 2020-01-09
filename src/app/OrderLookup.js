import React from "react";
import {postData, statusEnum, getItem} from "./utils";
import {Link} from "react-router-dom";


export class OrderLookup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: '',
            zipCode: '',
            orderInfo: null,
            errorMsg: null,
        }
    }

    componentDidMount() {
        const order_id = sessionStorage.getItem('order_id');
        const zip_code = sessionStorage.getItem('zip_code');

        if (order_id && zip_code) {
            this.setState({orderNumber: order_id, zipCode: zip_code}, () => this.lookupOrder());
        }
    }

    handleChange(field, e) {
        this.setState({[field]: e.target.value});
    }

    lookupOrder() {
        const lookupInfo = {
            "order_id": this.state.orderNumber,
            "zip_code": this.state.zipCode,
        }

        postData(lookupInfo, true).then(({data, status}) => {
            if (status !== 200) {
                this.setState({errorMsg: data.detail});
            } else {
                this.setState({orderInfo: data});
                sessionStorage.setItem("order_id", lookupInfo.order_id);
                sessionStorage.setItem("zip_code", lookupInfo.zip_code);
            }
        });
    }

    resetOrder() {
        sessionStorage.removeItem('order_id');
        sessionStorage.removeItem('zip_code');

        this.setState({orderInfo: null, orderNumber: '', zipCode: ''});
    }

    render() {
        if (!this.props.products) {
            return null;
        }

        return (
            <div className="bar">
                <h1 className="font-weight-light mb-1">order lookup</h1>
                <hr className="border border-dark m-0 mb-2"/>

                {/* Lookup Input */}
                {!this.state.orderInfo &&
                    <div>
                        {this.state.errorMsg &&
                            <p className="text-danger">{this.state.errorMsg}</p>
                        }
                        <input className="mb-2" style={{width:100+'%'}} type="text"
                            placeholder="order number" value={this.state.orderNumber}
                            onChange={(e) => this.handleChange('orderNumber', e)}/>
                        <input className="mb-4" style={{width:100+'%'}} type="text"
                            placeholder="shipping zip code" value={this.state.zipCode}
                            onChange={(e) => this.handleChange('zipCode', e)}/>

                        <div className="text-center">
                            <button type="button" className="btn btn-dark" onClick={() => this.lookupOrder()}>look up</button>
                        </div>
                    </div>
                }

                {/* Order Info */}
                {this.state.orderInfo &&
                    <div>
                        <h3>
                            <span className="font-weight-bold">status: </span>
                            <span className="font-italic font-weight-light text-secondary">
                                {statusEnum[this.state.orderInfo.status]}
                            </span>
                        </h3>
                        <h3>
                            <span className="font-weight-bold">tracking: </span>
                            <span className="font-italic font-weight-light text-secondary">
                                {this.state.orderInfo.tracking_number ? '#' : 'pending'}
                            </span>
                        </h3>
                        <p>order number: <span className="font-weight-bold">{this.state.orderInfo.order_id}</span></p>

                        <table className="mb-3" style={{width:100+'%'}}>
                            <tbody>
                                {this.state.orderInfo.cart_product_instances.map((item, i) => {
                                    const productInstance = this.props.productInstances.find(el => el.id === item.product_instance);
                                    const currProduct = getItem(this.props.products, productInstance.product);
                                    return (
                                        <tr key={i}>
                                            <td className="p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link className="align-middle" to={"/" + currProduct.title}>{currProduct.title}</Link>
                                                    <div className="d-flex justify-content-between">
                                                        <div>{item.quantity}x | {productInstance.size}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr className="top-border">
                                    <td className="p-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>total</div>
                                            <div className="font-weight-bold">${this.state.orderInfo.total.toFixed(2)}</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Reset Saved Order */}
                        <div className="text-center">
                            <button type="button" className="btn btn-link" onClick={() => this.resetOrder()}>lookup new order</button>
                        </div>
                    </div>
                }

                <div style={{height:"100px"}}></div>

                {/* Support Email */}
                <p className="gray-color" style={{fontSize: 14}}>
                    {"if you need help, please email: "}
                    <a href="mailto:support@danmallon.com" target="_top">support@danmallon.com</a>
                </p>
            </div>
        );
    }
}
