import React from "react";
import Modal from 'react-modal';
import {Collapse} from 'react-bootstrap'
import ProductAdd from "./ProductAdd";
import ProductType_List from "./ProductType_List";
import { Link ,Route, Switch} from 'react-router-dom';

class ProductType_List_Detail extends React.Component {
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
                    "tensp": this.ten,
                    "loai": this.loai,
                    "mota": this.mota,
                    "gia":  this.gia,
                    "id_nsx": this.nsx,
                    "soluong":this.soluong,
                    "xuatsu": this.xuatsu,
                    "image_url": this.image_url

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
                    this.handleAfterAdd();
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
                        <div class="modal-dialog " role="document">
                            <div class="modal-content">
                                <div class="modal-header bg-blue">
                                   <h4 class="modal-title">Xác nhận xóa sản phẩm</h4>
                                </div>
                                <div class="modal-body ">
                                   <p className="text-center fs-18">Bạn thật sự muốn xóa sản phẩm mã : <span className="text-red bg-yellow" >{this.state.curItem.id}</span> không ?
                                    </p>
                                    <div className="card mb-4 box-shadow">
                                        <img className="card-img-top"
                                             src={this.state.curItem.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                             alt="Card image cap" />
                                        <div className="card-body ">

                                            <p className="card-text fs-19 p-t-5">{this.state.curItem.tensp}</p>
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
                                             src={this.state.curItem.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                             alt="Card image cap" />
                                        <div className="card-body text-left">
                                        <ul>
                                            <li><br/>Tên sản phẩm: <span className="card-text">{this.state.curItem.tensp}</span></li>
                                            <li>Loại sản phẩm: <span className="card-text">{this.state.curItem.loai}</span></li>
                                            <li>Giá sản phẩm :<span className="card-text">{this.state.curItem.gia}</span></li>
                                            <li>Số lượng sản phẩm: <span className="card-text">{this.state.curItem.soluong}</span></li>
                                            <li>Xuất sứ sản phẩm: <span className="card-text">{this.state.curItem.xuatsu}</span></li>
                                            <li>Số lượng bán: <span className="card-textp">{this.state.curItem.daban}</span></li>
                                            <li>Mô tả sản phẩm: <span className="card-textp">{this.state.curItem.mota}</span></li>
                                        </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={this.Delete.bind(this,this.state.curItem)} className="btn btn-success"
                                            data-dismiss="modal">Mua ngay
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

                <div className="row">
                    <div className="col-md-auto">
                        {items.map(item => (
                            <div className="col-md-4" key={item.id_nsx}>
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top"
                                         src={item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                         alt="Card image cap" />
                                    <div className="card-body">
                                        <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                        <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3><br/>
                                    </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" data-toggle="modal" data-target="#ModalDetail" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-info"
                                                >Detail
                                                </button>
                                                <Link to="/ProductType_List"></Link>
                                                <button type="button" data-toggle="modal" data-target="#ModalDelete" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-danger"
                                                >Delete
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

export default ProductType_List_Detail;