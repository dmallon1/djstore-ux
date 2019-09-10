import React from 'react';
import {StripeProvider, Elements, injectStripe, CardElement} from 'react-stripe-elements';
import {Link} from "react-router-dom";
import { Checkout } from './Checkout';


export function Stripe(props) {
    return (
        <StripeProvider apiKey="pk_test_sPXa5QskrgAo4pHigkKek3tO006EVPf0RS">
            <MyStoreCheckout {...props} />
        </StripeProvider>
    );
}


class _CardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isGoing: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmitStripe = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken()
            .then((payload) => console.log('[token]', payload));
        }
        // send token to backend with customer information and order information
    };

    render() {
        if (this.props.productsInCart.length < 1) {
            return (
                <React.Fragment>
                    <h1 className="font-weight-light">checkout</h1>
                    <hr className="border border-dark m-0 mb-4"/>
                    <p>No items in cart. Add one <Link to={"/"}>here</Link>.</p>
                </React.Fragment>
            );
        }
        return (
            <form className="bar" onSubmit={this.handleSubmitStripe}>
                <h1 className="font-weight-light">checkout</h1>
                <hr className="border border-dark m-0 mb-4"/>
                <Checkout {...this.props}/>
                {/* Name and address */}
                <input className="my-2" style={{width:100+'%'}} type="text" placeholder="name" value={this.state.value} onChange={this.handleChange}/>
                <input className="my-2" style={{width:100+'%'}} type="text" placeholder="address" value={this.state.value} onChange={this.handleChange}/>
                <div className="d-flex justify-content-between">
                    <input className="my-2 mr-2" style={{width:60+'%'}} type="text" placeholder="apt, unit, etc" value={this.state.value} onChange={this.handleChange}/>
                    <input className="my-2" style={{width:40+'%'}} type="text" placeholder="zip code" value={this.state.value} onChange={this.handleChange}/>
                </div>
                <div className="d-flex justify-content-between">
                    <input className="my-2 mr-2" style={{width:80+'%'}} type="text" placeholder="city" value={this.state.value} onChange={this.handleChange}/>
                    <input className="my-2" style={{width:20+'%'}} type="text" placeholder="state" value={this.state.value} onChange={this.handleChange}/>
                </div>
                {/* Separator */}
                <div className="d-flex justify-content-center">
                    <hr className="border border-dark m-3" style={{width:200+'px'}}/>
                </div>
                {/* Stripe */}
                <CardElement
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onReady={handleReady}
                    {...createOptions(this.props.fontSize)}
                />
                {/* Checkbox */}
                <div className="car d-flex">
                    <label>
                        <input style={{width:25+'px', height:25+'px'}}
                            name="isGoing"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange}/>
                        I agree to the <Link to="/terms">terms</Link> and <Link to="/privacy">privacy policy</Link>.
                    </label>
                </div>

                {/* Submit */}
                <div className="p-2 d-flex justify-content-center">
                    <input type="submit" value="checkout" style={{fontSize:24+'px'}}/>
                </div>
            </form>
        );
    }
}

const CardForm = injectStripe(_CardForm);

class MyStoreCheckout extends React.Component {
    render() {
        return (
            <Elements>
                <CardForm {...this.props}/>
            </Elements>
        );
    }
}

const handleBlur = () => {
    console.log('[blur]');
};
const handleChange = (change) => {
    console.log('[change]', change);
};
//   const handleClick = () => {
//     console.log('[click]');
//   };
const handleFocus = () => {
    console.log('[focus]');
};
const handleReady = () => {
    console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding,
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};
