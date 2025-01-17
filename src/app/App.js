import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Stripe} from "./Stripe";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {MyModal} from "./MyModal";
import {getItem, baseUrl, ScrollToTop} from "./utils";
import {SizeChart} from "./Sizing";
import {OrderLookup} from "./OrderLookup";
import {Privacy, Terms} from "./PrivacyTerms";


export class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            productInstances: null,
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
        const urls = [`${baseUrl}/api/product/`,
            `${baseUrl}/api/product-instance/`];

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
        const productInstance = product.product_instances.find(el => el.size === chosenSize);
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
                <ScrollToTop />
                <NavBarFunc productsInCart={this.state.productsInCart} numProducts={this.numProducts}/>
                <div className="container" style={{maxWidth: '500px'}}>
                    <Route path="/" exact render={() => <AllProductsPage products={this.state.products}/>}/>
                    <Route path="/checkout" render={(props) => <Stripe costs={this.costs}
                        productsInCart={this.state.productsInCart} handleShow={this.handleShow} {...props}
                        updateOrderNumber={this.updateOrderNumber} products={this.state.products} resetCart={this.resetCart}/>}/>
                    <Route path="/order-lookup" render={(props) => <OrderLookup
                        orderNumber={this.state.orderNumber} products={this.state.products}
                        productInstances={this.state.productInstances} {...props} />}/>
                    <Route path="/sizing" render={SizeChart}/>
                    <Route path="/privacy" render={Privacy}/>
                    <Route path="/terms" render={Terms}/>
                    <Route path="/:product" render={(props) => <ProductPage {...props}
                        products={this.state.products} addToCart={(product, chosenSize) =>
                        this.addToCart(product, chosenSize)}/>}/>
                </div>
                <Footer/>
                <MyModal showModal={this.state.showModal} handleClose={this.handleClose}
                    increaseInstanceCount={() => this.increaseInstanceCount()} selctedCartItem={this.state.selctedCartItem}
                    decreaseInstanceCount={() => this.decreaseInstanceCount()} deleteInstance={() => this.deleteInstance()}
                    products={this.state.products}/>
            </Router>
        );
    }
}


function NavBarFunc(props) {
    const logo = "/img/aj-logo.png";
    const cart = "/img/cart.png";
    return (
        <Navbar className="border border-dark m-2 mx-3">
            <Link to="/">
                <img src={logo} height={30} alt="logo"/>
            </Link>
            <Nav className="ml-auto nav-color">
                <Link to="/order-lookup">
                    order lookup
                </Link>
            </Nav>
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
        <div className="my-5 mx-3 d-flex justify-content-around border border-dark nav-color" style={{fontSize:12+'px', color: 'black'}}>
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
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.products !== prevProps.products || this.props.match.params.product !== prevProps.match.params.product) {
            this.setState({chosenSize: this.getInitialSize()});
        }
    }

    changeSize(size) {
        this.setState({chosenSize: size});
    }

    getInitialSize() {
        const chosenProduct = this.props.products && this.props.products.find(el => el.title === this.props.match.params.product);
        if (chosenProduct) {
            this.sortProductInstancesBySize(chosenProduct);
            return chosenProduct.product_instances[0].size;
        }
        return "";
    }

    sortProductInstancesBySize(chosenProduct) {
        const sizeWeights = {s: 0, m: 1, l: 2, xl: 3, xxl: 4, xxxl: 5};
        chosenProduct.product_instances.sort((a, b) => sizeWeights[a.size] - sizeWeights[b.size]);
    }

    render() {
        const chosenProduct = this.props.products && this.props.products.find(el => el.title === this.props.match.params.product);
        if (!chosenProduct) {
            return null;
        }

        this.sortProductInstancesBySize(chosenProduct);

        return (
            <React.Fragment>
                <h1 className="font-weight-light">{chosenProduct.title}</h1>
                <hr className="border border-dark m-0 mb-3"/>
                <StoreItem picture={process.env.PUBLIC_URL + chosenProduct.picture_url}/>
                <div className="mb-4 d-flex justify-content-between">
                    <div className="d-flex">
                        <button type="button" className="btn btn-dark mt-0" onClick={() => this.props.addToCart(chosenProduct, this.state.chosenSize)} style={{height:'36px'}}>add to cart</button>
                        <div className="select-style px-2">
                            <select onChange={(e) => this.changeSize(e.target.value)} value={this.state.chosenSize} className="px-2"
                                style={{color:'white', backgroundColor:'black', height: '36px', fontSize: 24}}>
                                {chosenProduct.product_instances.map((item, i) =>
                                    <option key={i} value={item.size}>{item.size}</option>
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
            <hr className="border border-dark m-0 mb-3"/>
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
            <div className="container-thing nav-color" style={{marginLeft: 'auto', marginRight: 'auto'}}>
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
            <img className="border border-dark mb-3" src={props.picture} style={{width: 100 + '%'}} alt='product'/>
            {props.showPrice &&
                <div className="bottom-right font-weight-light">
                    ${props.price}
                </div>
            }
        </React.Fragment>
    );
}
