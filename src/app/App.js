import React from 'react';
import tempPic from './pics/pineapple-shirt.png';
import pic2 from './pics/avocado-shirt.png';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './pics/dj-logo.png';
import cart from './pics/cart.png';
import {Checkout} from './Checkout';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


export default function AppRouter() {
    return (
        <Router>
            <NavBarFunc/>
            <div className="container">
                <Route path="/" exact component={AllProductsPage} />
                <Route path="/pineapple" component={ProductPage} />
                <Route path="/checkout" component={Checkout} />
                <Footer/>
            </div>
        </Router>
    );
}


function NavBarFunc() {
    return (
        <Navbar>
            <Link to="/">
                <img src={logo} height={30} alt="logo"/>
            </Link>
            <Nav className="ml-auto">
                <Link to="/checkout">
                    <img src={cart} height={30} alt="cart"/>
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


function ProductPage() {
    return (
        <React.Fragment>
            <div className="product-title text-center">
                <h1>pineapple</h1>
            </div>
            <StoreItem picture={tempPic} price={49}/>
            <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex">
                    <div className="product-title d-flex justify-content-center" style={{width: 144 + 'px', height: 36 + 'px'}}>
                    <p className="justify-content-center align-self-center m-0" style={{fontSize: 24}}>add to cart</p>
                    </div>
                    <div className="select-style px-2">
                        <select className="px-2" defaultValue="m" style={{color:'white', backgroundColor:'black', height: 36 + 'px', fontSize: 24}}>
                            <option value="xs">xs</option>
                            <option value="s">s</option>
                            <option value="m">m</option>
                            <option value="l">l</option>
                            <option value="xl">xl</option>
                            <option value="xxl">xxl</option>
                        </select>
                    </div>
                </div>

                <p style={{fontSize: 24}}>$49</p>
            </div>
            {/* Product Subtitle */}
            <div>
                <p className="gray-color" style={{fontSize: 14}}>Made from 100% ring spun combed cotton (heathers are 50/50 cotton/poly).</p>
            </div>
        </React.Fragment>
    );
}


function AllProductsPage() {
    return (
        <React.Fragment>
            <h1 className="font-weight-light">products</h1>
            <hr className="border border-dark m-0"/>
            <StoreItem picture={tempPic} price={49} showPrice={true}/>
            <StoreItem picture={pic2} price={39} showPrice={true}/>
        </React.Fragment>
    );
}


/**
 * Will be the base storeitem for the display page, containing a picture
 * and a price.
 * @param {object} props
 */
function StoreItem(props) {
    return (
        <div className="container-thing" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Link to="/pineapple">
                <img className="border border-dark my-3" src={props.picture} style={{width: 100 + '%'}} alt='product'/>
                {props.showPrice &&
                    <div className="bottom-right font-weight-light">
                        ${props.price}
                    </div>
                }
            </Link>
        </div>
    );
}
