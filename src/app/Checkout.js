import React from 'react';
// import Table from 'react-bootstrap/Table'
import { BrowserRouter as Link } from "react-router-dom";
import { CheckoutForm } from './CheckoutForm';

export function Checkout() {
    return (
        <React.Fragment>
            <h1 className="font-weight-light">checkout</h1>
            <hr className="border border-dark m-0 mb-4"/>

            {/* Table */}
            <table style={{width:100+'%'}}>
                <tbody>
                    <tr className="foo">
                        <td className="p-2">[1x] <Link to="/pineapple">pineapple</Link> | L</td>
                        <td className="p-2 text-right" style={{width: 75+'px'}}>$49</td>
                    </tr>
                    <tr>
                        <td className="p-2">shipping</td>
                        <td className="p-2 text-right">$4.99</td>
                    </tr>
                    <tr>
                        <td className="p-2">estimated tax [i]</td>
                        <td className="p-2 text-right">$3.24</td>
                    </tr>
                    <tr className="font-weight-bold">
                        <td className="p-2">total</td>
                        <td className="p-2 text-right">$57.23</td>
                    </tr>
                </tbody>
            </table>
            {/* Apple Pay Button */}
            <div className="d-flex justify-content-center p-3">
                <div className="product-title d-flex justify-content-center align-items-center" style={{height:40+'px', width:100+'px'}}>
                    Pay
                </div>
            </div>
            {/* Checkout Form */}
            <CheckoutForm/>
        </React.Fragment>
    );
}
