import React from "react";
import Modal from 'react-modal';
import ProductAdd from "./ProductAdd";
import {Link ,Route, Switch} from 'react-router-dom';


class ProducerList extends React.Component {
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
    handleAfterAdd(){
        fetch("http://localhost:3001/api/Producer/")
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
        fetch("http://localhost:3001/api/Producer",
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

    Delete = (key) => {
        fetch("http://localhost:3001/api/Producer/" + key,
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
                    this.handleAfterAdd();
                })
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/Producer")
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
                <React.Fragment>
                    <div class="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog " role="document">
                            <div class="modal-content">
                                <div class="modal-header bg-blue">
                                   <h4 class="modal-title">Xác nhận xóa sản phẩm</h4>
                                </div>
                                <div class="modal-body ">
                                   <p className="text-center fs-18">Bạn thật sự muốn xóa nhãn hàng mã : <span className="text-red bg-yellow" >{this.state.curItem.id}</span> không ?
                                    </p>
                                    <div className="card mb-4 box-shadow">
                                        <img className="card-img-top"
                                             src={this.state.curItem.images}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                             alt="Card image cap" />
                                        <div className="card-body ">

                                            <p className="card-text fs-19 p-t-5">{this.state.curItem.ten_nsx}</p>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={this.Delete.bind(this,this.state.curItem)} className="btn btn-danger"
                                            data-dismiss="modal">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal fade" id="ModalDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog " role="document">
                            <div class="modal-content">
                                <div class="modal-header bg-blue">
                                   <h4 class="modal-title">Thông Tin Sản Phẩm</h4>
                                </div>
                                <div class="modal-body ">
                                    <div className="card mb-4 box-shadow">
                                        <img className="card-img-top"
                                             src={this.state.curItem.images}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                             alt="Card image cap" />
                                        <div className="card-body text-center">
                                        <ul>
                                            <li><br/>Tên nhãn hàng: <span className="card-text">{this.state.curItem.ten_nsx}</span></li>
                                            <li>Địa chỉ: <span className="card-text">{this.state.curItem.diachi}</span></li>
                                            <li>Email :<span className="card-text">{this.state.curItem.email}</span></li>
                                            <li>Số điện thoại: <span className="card-text">{this.state.curItem.phone}</span></li>
                                        </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <Link to="/Producer_List"><button type="button" className="btn btn-primary">Product</button></Link>
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


                {/*xuất danh sách các hãng*/}
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Danh sách các hãng</h3>
                                </div>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="text-center">
                                                <div className="row">
                                                    <div className="col-md-auto">
                                                        {items.map(item => (
                                                            <div className="col-md-4" key={item.id}>
                                                                <div className="card mb-4 box-shadow">
                                                                    <img className="card-img-top"
                                                                         src={item.images}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                                                         alt="Card image cap"/>
                                                                    <div className="card-body">
                                                                        <h4 className="card-text p-t-10 p-b-10">{item.ten_nsx}</h4>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div className="btn-group">
                                                                            <button type="button" data-toggle="modal" data-target="#ModalDetail" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-info"
                                                                            >Introduce
                                                                            </button>
                                                                            <button type="button" data-toggle="modal" data-target="#ModalDelete" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-danger"
                                                                            >Delete
                                                                            </button>
                                                                            <Link to="/Producer_List"><button type="button" className="btn btn-primary">Product</button></Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <div className="row">
                                            <div className="col-sm-3 col-xs-6">
                                            </div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
                </React.Fragment>


            );
        }
    }
}

export default ProducerList;