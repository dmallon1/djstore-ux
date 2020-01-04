import React from 'react';
import {Link} from "react-router-dom";
import {getItem} from "./utils";


export function Checkout(props) {
    const {total, tax, shippingCost} = props.costs;

    if (!props.products) {
        return null;
    }

    return (
        <React.Fragment>
            {/* Table */}
            <table style={{width:100+'%'}}>
                <tbody>
                    {props.productsInCart.map((item, i) => {
                        const currProduct = getItem(props.products, item.productInstance.product);
                        return (
                            <tr key={i} className="foo">
                                <td className="p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link className="align-middle" to={"/" + currProduct.title}>{currProduct.title}</Link>
                                        <div className="d-flex justify-content-between">
                                            <div>{item.count}x | {item.productInstance.size}</div>
                                            <div className="ml-2 border border-dark px-2 font-italic" onClick={() => props.handleShow(item)}>edit</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 text-right" style={{width: 75+'px'}}>${(currProduct.price * item.count)}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="p-2">shipping</td>
                        <td className="p-2 text-right">${shippingCost}</td>
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
