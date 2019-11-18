import React from 'react';
import {Link} from "react-router-dom";

export function Checkout(props) {
    const {total, tax, shippingCost} = props.costs;

    return (
        <React.Fragment>
            {/* Table */}
            <table style={{width:100+'%'}}>
                <tbody>
                    {props.productsInCart.map((item, i) => {
                        return (
                            <tr key={i} className="foo">
                                <td className="p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link className="align-middle" to={"/" + item.product.title}>{item.product.title}</Link>
                                        <div className="d-flex justify-content-between">
                                            <div>1x | {item.size}</div>
                                            <div className="ml-2 border border-dark px-2 font-italic" onClick={props.handleShow}>edit</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 text-right" style={{width: 75+'px'}}>${item.product.price.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="p-2">shipping</td>
                        <td className="p-2 text-right">${shippingCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="p-2">estimated tax [i] (6%)</td>
                        <td className="p-2 text-right">${tax.toFixed(2)}</td>
                    </tr>
                    <tr className="font-weight-bold">
                        <td className="p-2">total</td>
                        <td className="p-2 text-right">${total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            {/* Separator */}
            <div className="d-flex justify-content-center">
                <hr className="border border-dark m-3" style={{width:200+'px'}}/>
            </div>
        </React.Fragment>
    );
}
