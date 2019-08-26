import React, { Component } from "react";
import './modals.scss';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class Modals extends Component {
    render() {
        const { isOpen, toggle, className, title, data, close,size } = this.props;
        return (
            <div>
                <Modal isOpen={isOpen} toggle={toggle} className={className} backdrop={false} size = {size}>
                    <ModalHeader toggle={this.toggle} className="modal-title">{title}<Button color="secondary" className="float-right close-btn" onClick={toggle}><i className="fa fa-times" aria-hidden="true"></i></Button></ModalHeader>
                    <ModalBody>
                        {data}
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}
export default Modals;