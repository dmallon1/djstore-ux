import React from 'react';
import {Link} from "react-router-dom";

export function Checkout(props) {
    let total = 0;
    let shippingCost = 4.99;
    props.productsInCart.map(item => total += item.product.price);
    const tax = Number(((shippingCost + total)*.06).toFixed(2));
    total = tax + shippingCost;

    return (
        <React.Fragment>
            {/* Table */}
            <table style={{width:100+'%'}}>
                <tbody>
                    {props.productsInCart.map((item, i) => {
                        total += item.product.price;
                        return (
                            <tr key={i} className="foo">
                                <td className="p-2">[1x] <Link to={"/" + item.product.title}>{item.product.title}</Link> | {item.size}</td>
                                <td className="p-2 text-right" style={{width: 75+'px'}}>${item.product.price}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="p-2">shipping</td>
                        <td className="p-2 text-right">${shippingCost}</td>
                    </tr>
                    <tr>
                        <td className="p-2">estimated tax [i] (6%)</td>
                        <td className="p-2 text-right">${tax}</td>
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
