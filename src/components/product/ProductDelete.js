import React, {Component} from "react";
import { Modal, Button } from 'react-bootstrap';

class ModalDelete extends Component{

    constructor(props, context) {
        super(props, context);

    }
Delete (){
    this.props.Delete();
}
    render() {
        return(
            <Modal show={this.props.show}>
                <Modal.Header>
                    {this.props.name} will be deleted!
                </Modal.Header>
                <Modal.Footer>
                    <Button className="col-2" onClick={this.props.handleClose}>Close</Button>
                    <Button className="btn-danger col-2" onClick={(id)=>{this.Delete}}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalDelete;