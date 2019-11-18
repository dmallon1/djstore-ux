import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


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
        return (
            <Modal show={this.state.showModal} onHide={this.props.handleClose}>
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
                        <Button variant="secondary" size="sm">
                            delete
                        </Button>
                        <Button variant="primary" size="sm">
                            update
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
