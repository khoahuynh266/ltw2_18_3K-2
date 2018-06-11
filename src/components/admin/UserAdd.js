import React, {Component} from "react";
import { Modal } from 'react-bootstrap';
class UserAdd extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            isHidden: "hidden",
            ErrUserName: "hidden",
            ErrEmail: "hidden",
            ErrEmail1: "hidden",
            ErrPassword: "hidden",
            ErrPassword1: "hidden",
            ErrPassword2: "hidden",
            ErrName: "hidden",
            ErrName1: "hidden",
            ErrSDT: "hidden",
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
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

    handleSubmit() {
        var flag = true;

        //kiểm tra tên
        if (this.fullname.value.length <= 10) {
            flag = false;
            this.setState({ErrName: "visible"});
        }

        if (this.fullname.value == null || this.fullname.value === "") {
            flag = false;
            this.setState({ErrName1: "visible"});
        }

        //kiểm tra email
        if (this.email.value === "" || this.email.value == null) {
            flag = false;
            this.setState({ErrEmail1: "visible"});
        }
        if (!this.email.value.includes("@gmail.com", "@yahoo.com", "@yahoo.com.vn")) {
            flag = false;
            this.setState({ErrEmail: "visible"});
        }

        //kiểm tra mật khẩu
        if (this.password.value.length <= 5) {
            flag = false;
            this.setState({ErrPassword: "visible"});
        }

        if (this.password.value == null || this.password.value === "") {
            flag = false;
            this.setState({ErrPassword1: "visible"});
        }


        //kiểm tra số điện thoại
        if ((isNaN(this.phone.value))) // k phải số
        {
            flag = false;
            this.setState({ErrSDT: "visible"});
        }


        if (flag) {
            this.setState({
                ErrPassword: "hidden",
                ErrName: "hidden",
                ErrSDT: "hidden",
                ErrEmail: "hidden",
                ErrPassword1: "hidden",
                ErrPassword2: "hidden",
                ErrName1: "hidden",
                ErrSDT1: "hidden",
                ErrEmail1: "hidden",
            });

            fetch("http://localhost:3001/api/users",
                {
                    method: 'post',
                    mode: 'cors', // no-cors, cors, *same-origin
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: this.password.value,
                        fullname: this.fullname.value,
                        email: this.email.value,
                        type: "0",
                        phone: this.phone.value,
                    })
                }).then(console.log("Thêm khoản thành công!"));
            this.setState({isHidden: 'visible'});
           this.handleClose();
        }

        this.phone.value = this.password.value = this.fullname.value = this.email.value = null;

    }

    render() {
        return (
            <div>  <button  className="btn btn-primary my-2" onClick={this.handleShow}>Thêm user </button>
                <div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header className="alert-primary bg-primary" >
                            <Modal.Title> <p className="text-center" style={{color:'#EEEEEE', fontSize: 18}}>Add new User</p></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-body">
                                    <div className={this.state.isHidden} id="p-t-20">
                                        <div className="alert alert-success" id="ThongBao" role="alert">
                                            <strong>Thêm thành công!</strong>.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Fullname">Họ tên</label>
                                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input type="text"  ref={input=>this.fullname = input}   className="input100" id="Fullname" name="Fullname"/>
                                        </div>
                                    </div>
                                    <div className={this.state.ErrName} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Họ tên phải hơn 10 kí tự !</strong>.
                                        </div>
                                    </div>
                                    <div className={this.state.ErrName1} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Họ tên không được để trống !</strong>.
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="Email">Email</label>
                                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input type="email" className="input100" ref={input=>this.email = input} id="Email" aria-describedby="emailHelp" name="Email"
                                                   placeholder="Enter email"/>
                                        </div>
                                    </div>
                                    <div className={this.state.ErrEmail} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Email sai định dạng !</strong>
                                        </div>
                                    </div>
                                    <div className={this.state.ErrEmail1} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Email không được để trống !</strong>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Password">Password</label>
                                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input type="password" className="input100" ref={input=>this.password = input} id="Password" name="Password"
                                                   placeholder="Mật khẩu phải hơn 5 kí tự"/>
                                        </div>
                                    </div>
                                    <div className={this.state.ErrPassword} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Mật khẩu phải hơn 5 kí tự !</strong>
                                        </div>
                                    </div>
                                    <div className={this.state.ErrPassword1} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Mật khẩu không được để trống !</strong>
                                        </div>
                                    </div>

                                    <div className="from-group txt1">
                                        <label htmlFor="Phone">Số điện thoại</label>
                                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input type="phone" className="input100" ref={input=>this.phone = input} id="Phone" aria-describedby="phone" name="Phone"
                                                   placeholder="Nhập số điện thoại của bạn"/>
                                        </div>
                                    </div>
                                    <div className={this.state.ErrSDT} id="p-t-20">
                                        <div className="alert alert-danger" id="ThongBao" role="alert">
                                            <strong>Số điện thoại sai định dạng !</strong>
                                        </div>
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
