import React from 'react';
import {StripeProvider, Elements, injectStripe, CardElement} from 'react-stripe-elements';
import {Link} from "react-router-dom";
import {Checkout} from './Checkout';
import {Order} from "./Order";
import {states, postData} from "./utils";


export function Stripe(props) {
    return (
        <StripeProvider apiKey="pk_test_sPXa5QskrgAo4pHigkKek3tO006EVPf0RS">
            <MyStoreCheckout {...props} />
        </StripeProvider>
    );
}


/**
 * The actual function that does shit
 */
class _CardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doesAgree: false,
            order: new Order(),
        };
    }

    handleChange(key, event) {
        let order = this.state.order;
        order[key] = event.target.value;
        this.setState({order: order});
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
            this.props.stripe.createToken().then(payload => {
                if (payload.error) {
                    // write error somewhere
                    return;
                }
                console.log(payload);
                let orderInfo = this.state.order;
                orderInfo.card_token = payload.token.id;
                orderInfo.captcha_token = 1;
                orderInfo.total = this.props.costs.total;
                orderInfo.product_instances = this.getProductDict();

                postData(orderInfo)
                    .then(data => {
                        this.props.history.push(`/order/${data.detail}`);
                        this.props.updateOrderNumber(data.detail);
                    })
                    .catch(error => console.error(error));
            }).catch(error => console.error(error));
        }
    };

    getProductDict() {
        let toRet = [];
        for (let i in this.props.productsInCart) {
            toRet.push({
                "quantity": this.props.productsInCart[i].count,
                "product":this.props.productsInCart[i].product.id,
                "size":this.props.productsInCart[i].productInstance.size,
                "sku": this.props.productsInCart[i].productInstance.sku,
            });
        }
        return toRet;
    }

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
                <input className="my-2 mr-2" style={{width:100+'%'}} type="text" placeholder="email" value={this.state.order.email || ''} onChange={(e) => this.handleChange('email', e)}/>
                {/* Name and address */}
                <div className="d-flex justify-content-between">
                    <input className="my-2 mr-2" style={{width:100+'%'}} type="text" placeholder="first name" value={this.state.order.first_name || ''} onChange={(e) => this.handleChange('first_name', e)}/>
                    <input className="my-2 ml-2" style={{width:100+'%'}} type="text" placeholder="last name" value={this.state.order.last_name || ''} onChange={(e) => this.handleChange('last_name', e)}/>
                </div>
                <input className="my-2" style={{width:100+'%'}} type="text" placeholder="address" value={this.state.order.address1 || ''} onChange={(e) => this.handleChange('address1', e)}/>
                <div className="d-flex justify-content-between">
                    <input className="my-2 mr-2" style={{width:60+'%'}} type="text" placeholder="apt, unit, etc" value={this.state.order.address2 || ''} onChange={(e) => this.handleChange('address2', e)}/>
                    <input className="my-2" style={{width:40+'%'}} type="text" placeholder="zip code" value={this.state.order.zip || ''} onChange={(e) => this.handleChange('zip', e)}/>
                </div>
                <div className="d-flex justify-content-between">
                    <input className="my-2 mr-2" style={{width:80+'%'}} type="text" placeholder="city" value={this.state.order.city || ''} onChange={(e) => this.handleChange('city', e)}/>
                    <select name="state" className="my-2" value={this.state.order.state} onChange={(e) => this.handleChange('state', e)} style={{height:'28px'}}>
                        {states.map((state,i) => (
                            <option key={i} value={state}>{state}</option>
                        ))}
                    </select>
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
                            name="doesAgree"
                            type="checkbox"
                            checked={this.state.doesAgree}
                            onChange={(e) => this.handleInputChange(e)}/>
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
