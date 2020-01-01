import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './pics/dj-logo.png';
import cart from './pics/cart.png';
import {Stripe} from "./Stripe";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {MyModal} from "./MyModal";
import {numToSize, getItem, innerUrl} from "./utils";
import {SizeChart} from "./Sizing";
import {OrderLookup} from "./OrderLookup";


export class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            productsInCart: [],
            showModal: false,
            selctedCartItem: null,
            orderNumber: null,
        };
    }

    handleClose = () => this.setState({showModal:false});
    handleShow = selctedCartItem => this.setState({showModal:true, selctedCartItem: selctedCartItem});
    updateOrderNumber = num => this.setState({orderNumber: num});
    resetCart = () => {
        this.setState({productsInCart: []});
        this.updateSession([]);
    };

    get numProducts() {
        return this.state.productsInCart.map(b => b.count)
            .reduce((p, c) => p + c, 0);
    }

    get selectedItem() {
        return this.state.productsInCart.find(el => el.productInstance.id
            === this.state.selctedCartItem.productInstance.id);
    }

    componentDidMount() {
        const urls = [`http://${innerUrl}/api/product/`,
            `http://${innerUrl}/api/product-instance/`];

        const promises = urls.map(url => fetch(url).then(res => res.json()));
        Promise.all(promises).then(data => {
            let toUpdate = {products: data[0], productInstances: data[1]};
            const savedCart = sessionStorage.getItem('cart');
            if (savedCart) {
                let cart = [];
                savedCart.split('|').forEach(item => {
                    const productInstanceId = Number(item.split(',')[0]);
                    const count = Number(item.split(',')[1]);
                    const productInstance = data[1].find(el => el.id === productInstanceId);
                    cart.push({productInstance, count});
                });
                toUpdate['productsInCart'] = cart;
            }
            this.setState({...toUpdate});
        });
    }

    addToCart(product, chosenSize) {
        let cart = this.state.productsInCart;
        const productInstance = product.product_instances.find(el => el.size === Number(chosenSize));
        const cartItem = cart.find(el => el.productInstance.id === productInstance.id);
        if (cartItem) {
            cartItem.count += 1;
        } else {
            cart.push({productInstance, count: 1});
        }
        this.setState({productsInCart: cart});
        this.updateSession(cart);
    }

    updateSession(cart) {
        let toSet = "";
        cart.forEach((item, i) => toSet += `${item.productInstance.id},${item.count}${i !== cart.length-1 ? `|` : `` }` )
        sessionStorage.setItem('cart', toSet);
    }

    increaseInstanceCount() {
        let cart = this.state.productsInCart;
        const cartItem = this.selectedItem;
        if (cartItem && cartItem.count < 99) {
            cartItem.count += 1;
            this.setState({productsInCart: cart});
            this.updateSession(cart);
        }
    }

    decreaseInstanceCount() {
        let cart = this.state.productsInCart;
        const cartItem = this.selectedItem;
        if (cartItem && cartItem.count > 1) {
            cartItem.count -= 1;
            this.setState({productsInCart: cart});
            this.updateSession(cart);
        }
    }

    deleteInstance() {
        let cart = this.state.productsInCart;
        cart.splice(cart.findIndex(el => el.productInstance.id === this.state.selctedCartItem.productInstance.id), 1);
        this.setState({productsInCart: cart, showModal:false});
        this.updateSession(cart);
    }

    // calculate total
    get costs() {
        let total = 0;
        let shippingCost = 5;
        this.state.productsInCart.map(item => {
            const product = getItem(this.state.products, item.productInstance.product);
            total += product.price * item.count;
            return total;
        });
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
                    <Route path="/checkout" render={(props) => <Stripe costs={this.costs}
                        productsInCart={this.state.productsInCart} handleShow={this.handleShow} {...props}
                        updateOrderNumber={this.updateOrderNumber} products={this.state.products} resetCart={this.resetCart}/>}/>
                    <Route path="/order-lookup" render={(props) => <OrderLookup orderNumber={this.state.orderNumber} products={this.state.products} {...props} />}/>
                    <Route path="/sizing" render={SizeChart}/>
                    <Route path="/:product" render={(props) => <ProductPage {...props}
                        products={this.state.products} addToCart={(product, chosenSize) =>
                        this.addToCart(product, chosenSize)}/>}/>
                    <Footer/>
                </div>
                <MyModal showModal={this.state.showModal} handleClose={this.handleClose}
                    increaseInstanceCount={() => this.increaseInstanceCount()} selctedCartItem={this.state.selctedCartItem}
                    decreaseInstanceCount={() => this.decreaseInstanceCount()} deleteInstance={() => this.deleteInstance()}
                    products={this.state.products}/>
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
            <Link to="/order-lookup"><div className="p-3">order lookup</div></Link>
            <Link to="/sizing"><div className="p-3">sizing</div></Link>
            {/* <Link to="/faq"><div className="p-3">faq</div></Link> */}
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
                <h1 className="font-weight-light">{chosenProduct.title}</h1>
                <hr className="border border-dark m-0"/>
                <StoreItem picture={process.env.PUBLIC_URL + chosenProduct.picture_url}/>
                <div className="my-4 d-flex justify-content-between">
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
            <img className="border border-dark mt-4" src={props.picture} style={{width: 100 + '%'}} alt='product'/>
            {props.showPrice &&
                <div className="bottom-right font-weight-light">
                    ${props.price}
                </div>
            }
        </React.Fragment>
    );
}
