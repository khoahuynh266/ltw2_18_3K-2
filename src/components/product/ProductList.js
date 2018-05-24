import React from "react";
import Modal from 'react-modal';
import {Collapse} from 'react-bootstrap'
import ProductAdd from "./ProductAdd";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowModalDelete = this.handleShowModalDelete.bind(this);
        this.handleCloseModalDelete = this.handleCloseModalDelete.bind(this);
        this.handleAfterAdd = this.handleAfterAdd.bind(this);
        this.Delete = this.Delete.bind(this);

        this.state = {
            showDeleteModal: false,
            deleteTarget: null,
            error: null,
            isLoaded: false,
            items: [],
            Collapse: false,
        };
    }

    handleCloseModalDelete() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    handleShowModalDelete(name){
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteTarget: name
        });
    }
    handleAfterAdd(){
        fetch("http://localhost:3001/api/products/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Loi!");
                }
            )
    }

    Delete = (key) => {
        fetch("http://localhost:3001/api/product/:key",
            {
                method: 'delete',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(
                (result) => {
                    this.handleAfterAdd();
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

    componentDidMount() {
        fetch("http://localhost:3001/api/products")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"

                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 ref={subtitle => this.subtitle = subtitle} className="modal-title" id="exampleModalLabel">Add new celebrity</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <ProductAdd/>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClose}>close</button>

                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="row">
                    <div className="col-md-auto">
                        {items.map(item => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-4 box-shadow">

                                    <img className="card-img-top"
                                         src={item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                         alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text">{item.tensp}</p>
                                        <Collapse  in={this.state.open}>
                                            <p className="card-text">{item.mota}</p></Collapse></div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button  className="btn btn-sm btn-outline-secondary"
                                                         onClick={() => this.setState({ open: !this.state.open })}>View
                                                </button>
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">Edit
                                                </button>
                                                <button id={item.key}
                                                    type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={(id)=>{this.Delete}} >Delete
                                                </button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                </div>
            );
        }
    }
}

export default ProductList;