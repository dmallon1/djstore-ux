import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";


export class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isGoing: false,
            numberOfGuests: 2
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
  
    render() {
            return (
                <form className="bar" onSubmit={this.handleSubmit}>
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
                    {/* Credit Card */}
                    <input className="my-2" style={{width:100+'%'}} type="text" placeholder="card number" value={this.state.value} onChange={this.handleChange}/> 
                    <div className="d-flex justify-content-between align-items-center">
                        <input className="my-2 mr-2" style={{width:25+'px'}} type="text" placeholder="01" value={this.state.value} onChange={this.handleChange}/>
                        <input className="my-2 mr-2" style={{width:25+'px'}} type="text" placeholder="19" value={this.state.value} onChange={this.handleChange}/>                        
                        <input className="my-2 mr-2" style={{width:20+'%'}} type="text" placeholder="state" value={this.state.value} onChange={this.handleChange}/>
                        <div className="product-title d-flex justify-content-center align-items-center" style={{width:100+'%', fontSize:12+'px', height:28+'px'}}>
                            different billing zip code
                        </div>
                    </div>
                    {/* Checkbox */}
                    <div className="car d-flex">
                        {/* Is going: */}
                        <input style={{width:25+'px', height:25+'px'}}
                            name="isGoing"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange}/>
                        <p>I agree to the <Link to="/terms">terms</Link></p>
                    </div>

                    {/* Submit */}
                    <div className="p-2 d-flex justify-content-center">
                        <input type="submit" value="checkout" style={{fontSize:24+'px'}}/>
                    </div>
                </form>
            );
        }
  }
