import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import {injectStripe, CardElement} from 'react-stripe-elements';


export function Stripe() {
    return (
        <StripeProvider apiKey="pk_test_sPXa5QskrgAo4pHigkKek3tO006EVPf0RS">
            <MyStoreCheckout />
        </StripeProvider>
    );
}


class _CardForm extends React.Component {
    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken()
            .then((payload) => console.log('[token]', payload));
        }
    };

    render() {
        return (
            <React.Fragment>
                <CardElement
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onReady={handleReady}
                    {...createOptions(this.props.fontSize)}
                />
                {/* <button onClick={this.handleSubmit}>Pay</button> */}
            </React.Fragment>
        );
    }
}

const CardForm = injectStripe(_CardForm);

class MyStoreCheckout extends React.Component {
    render() {
        return (
            <Elements>
                <CardForm/>
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
