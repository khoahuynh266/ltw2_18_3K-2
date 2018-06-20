import React from "react";
import Modal from 'react-modal';
import ProductAdd from "./ProductAdd";
import {Link ,Route, Switch} from 'react-router-dom';


class ManageProduct_List extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowModalDelete = this.handleShowModalDelete.bind(this);
        this.handleCloseModalDelete = this.handleCloseModalDelete.bind(this);
        this.reload = this.reload.bind(this);
        this.Delete = this.Delete.bind(this);

        this.state = {
            showDeleteModal: false,
            deleteTarget: null,
            error: null,
            isLoaded: false,
            items: [],
            Collapse: false,
            curItem: '',
            UpdateItem:'',
        };
    }
    handlerUpdateModal(item) {
                    this.setState({UpdateItem:item});
    }

    handlerDeleteModal(item) {
                    this.setState({curItem:item});
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
    reload(){
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
                    alert("Lỗi!");
                }
            )
    }
    Update = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/api/products",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": this.id,
                    "ten_nsx": this.ten_nsx,
                    "diachi": this.diachi,
                    "email": this.email,
                    "phone":  this.phone,
                    "image": this.image_url

                }),
            })
            .then(
                (result) => {
                    this.setState({
                        show: false,
                    });
                    this.reload();
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

    Delete = (key) => {
        fetch("http://localhost:3001/api/products/" + key,
            {

                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(
                (result) => {
                    this.setState({
                        show: false,
                    });
                    this.reload();
                })
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
        const {error, isLoaded,UpdateItem, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div class="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header bg-blue">
                                   <h4 class="modal-title">Xác nhận xóa sản phẩm</h4>
                                </div>
                                <div class="modal-body text-center">
                                   <p className="text-center fs-18">Bạn thật sự muốn xóa sản phẩm mã : <span className="text-red bg-yellow" >{this.state.curItem.id}</span> không ?
                                    </p>
                                    <div className="card mb-4 box-shadow">
                                        <img className="card-img-top"
                                             src={this.state.curItem.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                             alt="Card image cap" />
                                        <div className="card-body ">
                                            <li><br/><span className="card-text">{this.state.curItem.tensp}</span></li>
                                            <li>Giá sản phẩm: <span className="card-text">{this.state.curItem.gia}</span></li>
                                            <li>Xuất sứ sản phẩm: <span className="card-text">{this.state.curItem.xuatsu}</span></li>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={this.Delete.bind(this,this.state.curItem.id)} className="btn btn-danger"
                                            data-dismiss="modal">Delete
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="modal fade" id="ModalUpdate" tabindex="-1" role="dialog" aria-labelledby="ModalUpdate">
                        <div class="modal-dialog " role="document">
                            <div class="modal-content text-center" >
                                <div class="modal-header bg-blue">
                                    <h4 class="modal-title">Sửa sản phẩm</h4>
                                </div>
                                <div class="modal-body text-left" >
                                    <div className="form-group">
                                        <label htmlFor="Ten" className="bold">Tên sản phẩm</label>
                                    <input ref={input => this.ten = input}  type="text" className="form-control" name="ten" placeholder={this.state.UpdateItem.tensp}/>
                                    </div>
                                <div className="form-group">
                                    <label htmlFor="Loai" className="bold">Loại</label>
                                    <input  ref={input => this.loai = input}   type="text" className="form-control" name="loai" placeholder={this.state.UpdateItem.loai}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Mota" className="bold">Xuất xứ</label>
                                    <input type="text" ref={input => this.xuatsu = input}  className="form-control " name="mota" placeholder={this.state.UpdateItem.xuatsu} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="xuatxu"  className="control-label bold">Mô tả </label>
                                    <div className="col-sm-12">
                                          <textarea rows="4" id="xuatxu" name="xuatxu" ref={input => this.mota = input} placeholder={this.state.UpdateItem.mota}
                                    className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Gia" className="bold">Giá sản phẩm</label>
                                    <input  ref={input => this.gia = input}  type="text" className="form-control" name="gia" placeholder={this.state.UpdateItem.gia}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Soluong"className="bold">Số lượng</label>
                                    <input ref={input => this.soluong = input}   type="text" className="form-control" name="soluong" placeholder={this.state.UpdateItem.soluong}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Nsx"className="bold">Mã nhà sản xuất</label>
                                    <input type="text" ref={input => this.nsx = input}   className="form-control" name="nsx" placeholder={this.state.UpdateItem.nsx}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image_url"className="bold">Link hình sản phẩm</label>
                                    <input ref={input => this.image_url = input}  type="text" className="form-control" name="image_url" placeholder={this.state.UpdateItem.image   }/>
                                </div>
                            </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={this.Update.bind(this)} className="btn btn-success"
                                            data-dismiss="modal">Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

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

                <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th className="col-xs-6 col-md-4">Tên sản phẩm</th>
                                    <th>Loại sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng sản phẩm</th>
                                    <th>Xuất sứ</th>
                                    <th>Quản lí</th>
                                </tr>
                                </thead>
                            <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.tensp}</td>
                                    <td>{item.loai}</td>
                                    <td>{item.gia}</td>
                                    <td>{item.soluong}</td>
                                    <td>{item.xuatsu}</td>
                                    <td>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn btn-group">
                                                <button type="button" data-toggle="modal" data-target="#ModalDelete" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-danger"
                                                >Delete
                                                </button>
                                                <button type="button" data-toggle="modal" data-target="#ModalUpdate" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-primary"
                                                >Update
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <div>

                            </div>
                            </tbody>
                        </table>             
                        </div>
        )}}}
export default ManageProduct_List;