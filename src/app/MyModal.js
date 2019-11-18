import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        }
    }

    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                Launch demo modal
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <div className="d-flex justify-content-between">
                            <h5>
                                avocado
                            </h5>
                            <h5>
                                large
                            </h5>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="border border-dark px-2" style={{fontSize: '30px'}}>
                                &lt;
                            </div>
                            <div className="border border-dark px-2 mx-4 d-flex align-items-center" style={{fontSize: '24px'}}>
                                1x
                            </div>
                            <div className="border border-dark px-2" style={{fontSize: '30px'}}>
                                &gt;
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" size="sm" onClick={this.handleClose}>
                                delete
                            </Button>
                            <Button variant="primary" size="sm" onClick={this.handleClose}>
                                update
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
