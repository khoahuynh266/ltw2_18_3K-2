import React ,{Component} from "react";
import Modal from 'react-modal';
import UserAdd from "./UserAdd";
import { Link } from 'react-router-dom';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAfterAddUser = this.handleAfterAddUser.bind(this);
        this.state = {
            showDeleteModal: false,
            deleteTarget: null,
            error: null,
            isLoaded: false,
            items: [],
            Collapse: false,
            curItem: '',
        };
    }

    handlerDeleteModal(item) {
        this.setState({curItem:item});
    }
    handleAfterAddUser =()=> {
        fetch("http://localhost:3001/api/users/")
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
    handleDelete(key) {
        fetch("http://localhost:3001/api/users/"+key,
            {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(
                (result) => {
                    this.setState({
                        show: false,
                    });
                    this.handleAfterAddUser();
                })
    }


    componentDidMount() {
        fetch("http://localhost:3001/api/users/")
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
                    handleAfterAddUser = {this.handleAfterAddUser}
                >

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 ref={subtitle => this.subtitle = subtitle} className="modal-title" id="exampleModalLabel">Add new User</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                                <UserAdd handleAfterAddUser = {this.handleAfterAddUser} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClose}>close</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                                <th>email</th>
                                <th>Loại</th>
                                <th>
                                    Phone
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.type}</td>
                                    <td>{item.phone}</td>
                                    <td>


                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group pdleft text-center">
                                                <Link to ={"/admin/listUser/"+ item.id} className="btn btn-primary">Chi tiết</Link>
                                                <button type="button" data-toggle="modal" data-target="#ModalDelete" onClick={this.handlerDeleteModal.bind(this,item)} className="btn btn-danger"
                                                >Delete
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

                    <div className="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog " role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-blue">
                                    <h4 className="modal-title">Xác nhận xóa sản phẩm</h4>
                                </div>
                                <div className="modal-body text-center fs-18">
                                    <p className="text-center fs-18">Bạn thật sự muốn xóa user "
                                        <span className="text-red bg-blue-active fs-20" >{this.state.curItem.id}
                                        </span>
                                        <span>" Email: {this.state.curItem.email} </span>
                                        không ?

                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={this.handleDelete.bind(this,this.state.curItem.id)} className="btn btn-danger"
                                            data-dismiss="modal">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

            );
        }
    }
}

export default UserList;