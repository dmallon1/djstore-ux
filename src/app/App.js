import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './pics/dj-logo.png';
import cart from './pics/cart.png';
import {Stripe} from "./Stripe";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {MyModal} from "./MyModal";
import {numToSize} from "./utils";


export class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            productsInCart: [],
            showModal: false,
            selctedCartItem: null,
        };
    }

    handleClose = () => this.setState({showModal:false});
    handleShow = selctedCartItem => this.setState({showModal:true, selctedCartItem: selctedCartItem});

    get numProducts() {
        return this.state.productsInCart.map(b => (b.count))
            .reduce((p, c) => (p + c), 0);
    }

    get selectedItem() {
        return this.state.productsInCart.find(el => el.productInstance.id
            === this.state.selctedCartItem.productInstance.id);
    }

    componentDidMount() {
        // fetch all products
        fetch("http://localhost:8000/api/product/").then(res => {
            return res.json();
        }).then(data => {
            this.setState({products: data});
        });
    }

    addToCart(product, chosenSize) {
        let cart = this.state.productsInCart;
        const productInstance = product.product_instances.find(el => el.size === Number(chosenSize));
        const cartItem = cart.find(el => el.productInstance.id === productInstance.id);
        if (cartItem) {
            cartItem.count += 1;
        } else {
            cart.push({product: product, productInstance, count: 1});
        }
        this.setState({productsInCart: cart});
    }

    increaseInstanceCount() {
        let cart = this.state.productsInCart;
        const cartItem = this.selectedItem;
        if (cartItem && cartItem.count < 99) {
            cartItem.count += 1;
            this.setState({productsInCart: cart});
        }
    }

    decreaseInstanceCount() {
        let cart = this.state.productsInCart;
        const cartItem = this.selectedItem;
        if (cartItem && cartItem.count > 1) {
            cartItem.count -= 1;
            this.setState({productsInCart: cart});
        }
    }

    deleteInstance() {
        let cart = this.state.productsInCart;
        cart.splice(cart.findIndex(el => el.productInstance.id === this.state.selctedCartItem.productInstance.id), 1);
        this.setState({productsInCart: cart, showModal:false});
    }

    // calculate total
    get costs() {
        let total = 0;
        let shippingCost = 5;
        this.state.productsInCart.map(item => total += item.product.price * item.count);
        const tax = Number(((shippingCost + total)*.06).toFixed(2));
        total = total + tax + shippingCost;
        return {total, tax, shippingCost};
    }

    render() {
        return (
            <Router>
                <NavBarFunc productsInCart={this.state.productsInCart} numProducts={this.numProducts}/>
                <div className="container">
                    <Route path="/" exact render={() => <AllProductsPage products={this.state.products}/>}/>
                    <Route path="/checkout" render={() => <Stripe costs={this.costs}
                        productsInCart={this.state.productsInCart} handleShow={this.handleShow}/>}/>
                    <Route path="/:product" render={(props) => <ProductPage {...props}
                        products={this.state.products} addToCart={(product, chosenSize) =>
                        this.addToCart(product, chosenSize)}/>}/>
                    <Footer/>
                </div>
                <MyModal showModal={this.state.showModal} handleClose={this.handleClose}
                    increaseInstanceCount={() => this.increaseInstanceCount()} selctedCartItem={this.state.selctedCartItem}
                    decreaseInstanceCount={() => this.decreaseInstanceCount()} deleteInstance={() => this.deleteInstance()}
                />
            </Router>
        );
    }
}


function NavBarFunc(props) {
    return (
        <Navbar>
            <Link to="/">
                <img src={logo} height={30} alt="logo"/>
            </Link>
            <Nav className="ml-auto">
                <Link to="/checkout">
                    <div className="d-flex">
                        {props.numProducts > 0 &&
                            <h4 className="m-0 mr-2"><span className="badge badge-secondary">
                                {props.numProducts}</span></h4>
                        }
                        <img src={cart} height={30} alt="cart"/>
                    </div>
                </Link>
            </Nav>
      </Navbar>
    );
}


function Footer() {
    return (
        <div className="my-5 d-flex justify-content-around border border-dark" style={{fontSize:12+'px'}}>
            <Link to="/sizing"><div className="p-3">sizing</div></Link>
            <Link to="/faq"><div className="p-3">faq</div></Link>
            <Link to="/terms"><div className="p-3">terms</div></Link>
            <Link to="/privacy"><div className="p-3">privacy</div></Link>
        </div>
    );
}


class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenSize: this.getInitialSize(),
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.products !== prevProps.products || this.props.match.params.product !== prevProps.match.params.product) {
            this.setState({chosenSize: this.getInitialSize()});
        }
    }

    changeSize(id) {
        this.setState({chosenSize: id});
    }

    getInitialSize() {
        const chosenProduct = this.props.products && this.props.products.find(el => el.title === this.props.match.params.product);
        if (chosenProduct) {
            return chosenProduct.product_instances[0].size;
        }
        return "";
    }

    render() {
        const chosenProduct = this.props.products && this.props.products.find(el => el.title === this.props.match.params.product);
        if (!chosenProduct) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="product-title text-center">
                    <h1>{chosenProduct.title}</h1>
                </div>
                <StoreItem picture={process.env.PUBLIC_URL + chosenProduct.picture_url}/>
                <div className="mb-3 d-flex justify-content-between">
                    <div className="d-flex">
                        <button type="button" className="btn btn-dark mt-0" onClick={() => this.props.addToCart(chosenProduct, this.state.chosenSize)} style={{height:'36px'}}>add to cart</button>
                        <div className="select-style px-2">
                            <select onChange={(e) => this.changeSize(e.target.value)} value={this.state.chosenSize} className="px-2"
                                style={{color:'white', backgroundColor:'black', height: '36px', fontSize: 24}}>
                                {chosenProduct.product_instances.map(item =>
                                    <option key={item.id} value={item.size}>{numToSize[item.size]}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <p style={{fontSize: 24}}>${chosenProduct.price}</p>
                </div>
                {/* Product Subtitle */}
                <div>
                    <p className="gray-color" style={{fontSize: 14}}>{chosenProduct.description}</p>
                </div>
            </React.Fragment>
        );
    }
}


function AllProductsPage(props) {
    return (
        <React.Fragment>
            <h1 className="font-weight-light">products</h1>
            <hr className="border border-dark m-0"/>
            {props.products && props.products.map(product => (
                <StoreItem key={product.id} picture={process.env.PUBLIC_URL + product.picture_url}
                    price={product.price} showPrice={true} to={product.title}/>
            ))}
        </React.Fragment>
    );
}


/**
 * Will be the base storeitem for the display page, containing a picture
 * and a price.
 * @param {object} props
 */
function StoreItem(props) {
    if (props.to) {
        return (
            <div className="container-thing" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Link to={props.to}>
                    <InnerStoreItem {...props}/>
                </Link>
            </div>
        );
    }

    return (
        <div className="container-thing" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <InnerStoreItem {...props}/>
        </div>
    );
}


function InnerStoreItem(props) {
    return (
        <React.Fragment>
            <img className="border border-dark my-3" src={props.picture} style={{width: 100 + '%'}} alt='product'/>
            {props.showPrice &&
                <div className="bottom-right font-weight-light">
                    ${props.price}
                </div>
            }
        </React.Fragment>
    );
}
