import React, {Component} from "react";
import { Modal } from 'react-bootstrap';
class UserAdd extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            name: '',
            password: '',
            phone: '',
            email: '',}


        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword= this.handleChangePassword.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
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

        handleChangePassword = (e) => {
            this.setState({
                password: e.target.value
            })
        }

        handleChangePhone = (e) => {
            this.setState({
                phone: e.target.value
            })
        }


    handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/api/users",
            {
                method: 'post',
                mode: 'cors', // no-cors, cors, *same-origin
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'fullname': this.state.name,
                    'email': this.state.email,
                    'password': this.state.password,
                    'phone': this.state.phone

                }),

            })
            .catch(function (error) {
                            console.log(error)
                        })
            .then(res => {
                this.setState({show: false});
                //this.props.handleAfterAddUser();
            })
    }

    render() {
        return (
          <div>  <button  className="btn btn-primary my-2" onClick={this.handleShow}>Thêm user </button>
            <div>

                <Modal  handleAfterAddUser = {() => this.props.handleAfterAddUser()} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header className="alert-primary bg-primary" >
                        <Modal.Title> <p className="text-center" style={{color:'#EEEEEE', fontSize: 18}}>Add new User</p></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" value={this.state.name} id="name" name="name" onChange={this.handleChangeName} />
                            </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" value={this.state.email} id="email" name="email" onChange={this.handleChangeEmail} />
                                </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="text" className="form-control" value={this.state.password} name="password"
                                           id="password" onChange={this.handleChangePassword} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" value={this.state.phone} id="phone"
                                       name="phone" onChange={this.handleChangePhone}  />
                            </div>
                        </div>
                </Modal.Body>
            <Modal.Footer>
            <button type="button" className="btn btn-success" data-dismiss="modal" id="add-User"
                    onClick={this.handleSubmit} >Add</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleClose}>close</button>
            </Modal.Footer>
            </Modal>
            </div></div>
        );

    }


}

export default UserAdd;
