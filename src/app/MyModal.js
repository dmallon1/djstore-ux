import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {getItem} from "./utils";


export class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: props.showModal
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.showModal !== prevProps.showModal) {
            this.setState({showModal: this.props.showModal});
        }
    }

    render() {
        if (!this.props.selctedCartItem) {
            return null;
        }

        return (
            <Modal show={this.state.showModal} onHide={this.props.handleClose}>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" size="sm" className="m-0" onClick={this.props.deleteInstance}>
                            delete
                        </Button>
                        <Button variant="primary" size="sm" className="m-0" onClick={this.props.handleClose}>
                            done
                        </Button>
                    </div>
                    <div className="d-flex justify-content-center py-2">
                        <div className="border border-dark px-2" style={{fontSize: '30px'}} onClick={this.props.decreaseInstanceCount}>
                            &lt;
                        </div>
                        <div className="border border-dark px-2 mx-4 d-flex align-items-center" style={{fontSize: '24px'}}>
                            {this.props.selctedCartItem.count}x
                        </div>
                        <div className="border border-dark px-2" style={{fontSize: '30px'}} onClick={this.props.increaseInstanceCount}>
                            &gt;
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <h5 className="m-0">
                            {getItem(this.props.products, this.props.selctedCartItem.productInstance.product).title}
                        </h5>
                        <h5 className="m-0">
                            {this.props.selctedCartItem.productInstance.size}
                        </h5>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
