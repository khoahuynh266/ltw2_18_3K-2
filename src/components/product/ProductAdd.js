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
        fetch("http://localhost:3001/api/Product",
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
            <div>  <button  className="btn btn-primary my-2" onClick={this.handleShow}>Thêm sản phẩm</button>
                <div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header className="alert-primary bg-primary" >
                            <Modal.Title>Add new Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="Ten" className="bold">Tên sản phẩm</label>
                                    <input ref={input => this.ten = input}  type="text" className="form-control" name="ten" placeholder="..."/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Mota" className="bold">Mô tả nhỏ</label>
                                    <input type="text" ref={input => this.mota = input} className="form-control " name="mota" placeholder="..."/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Des"  className="control-label bold">Chi tiết</label>
                                    <div className="col-sm-12">
                                          <textarea rows="4" id="des" name="des" ref={input => this.des = input}
                                                    className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Gia" className="bold">Giá sản phẩm</label>
                                    <input  ref={input => this.gia = input} type="text" className="form-control" name="gia" placeholder="100000"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Soluong"className="bold">Số lượng</label>
                                    <input ref={input => this.soluong = input} type="text" className="form-control" name="soluong" placeholder="10"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Nsx"className="bold">Nhà sản xuất</label>
                                    <input type="text" ref={input => this.nsx = input} className="form-control" name="nsx" placeholder="..."/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image_url"className="bold">Link hình sản phẩm</label>
                                    <input ref={input => this.image_url = input} type="text" className="form-control" name="image_url" placeholder="..."/>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-success" data-dismiss="modal" id="add-Product"
                                    onClick={this.handleSubmit} >Add</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleClose}>close</button>
                        </Modal.Footer>
                    </Modal>
                </div></div>
        );

    }


}

export default ProductAdd;
