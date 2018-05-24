import React from "react";
import { Modal, Button } from 'react-bootstrap';

class ProductAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            image_url: '',
            description: '',}

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

        handleChangeName = (e) => {
            this.setState({
                name: e.target.value
            })
        }

        handleChangeImage = (e) => {
            this.setState({
                image_url: e.target.value
            })
        }

        handleChangeDescription = (e) => {
            this.setState({
                description: e.target.value
            })
        }


    handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/api/product",
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': this.state.name,
                    'image_url': this.state.image_url,
                    'description': this.state.description
                }),
            })
            .then(
                (result) => {
                    this.setState({
                        show: false,
                    });
                    this.props.handleAfterAdd();
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            );

    }

    render() {
        return (
          <div>  <button  className="btn btn-primary my-2" onClick={this.handleShow}>Add new celebrity</button>
            <div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header className="alert-primary">
                        <Modal.Title>Add new celebrity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        {<input type="text" className="form-control" value={this.state.name} id="name" name="name" onChange={this.handleChangeName} />}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image-link">Image link</label>
                        <input type="text" className="form-control" value={this.state.image_url} name="image_url"
                               id="image-link" onChange={this.handleChangeImage} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" value={this.state.description} id="description"
                           name="description" onChange={this.handleChangeDescription}  />
                 </div>
                </Modal.Body>
            <Modal.Footer>
            <button type="button" className="btn btn-primary" data-dismiss="modal" id="add-celebrity"
                    onClick={this.handleSubmit} >Add</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>close</button>
            </Modal.Footer>
            </Modal>
            </div></div>
        );

    }


}

export default ProductAdd;
