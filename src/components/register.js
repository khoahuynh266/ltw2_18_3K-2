import React from 'react'
import { Link } from 'react-router-dom';

class register extends React.Component {

    constructor(props) {
        super(props);
        this.state=({
            isHidden : "hidden",
            ErrUserName : "hidden",
            ErrEmail : "hidden",
            ErrEmail1 : "hidden",
            ErrPassword : "hidden",
            ErrPassword1 : "hidden",
            ErrPassword2 : "hidden",
            ErrName : "hidden",
            ErrName1 : "hidden",
            ErrSDT : "hidden",

        })
    }



    handlerRegister()
    {
        var flag = true;

    //kiểm tra tên
        if(this.fullname.value.length <= 10)
        {
            flag = false;
            this.setState({ErrName:"visible"});
        }

        if(this.fullname.value == null || this.fullname.value === "")
        {
            flag = false;
            this.setState({ErrName1:"visible"});
        }

        //kiểm tra email
        if(this.email.value === "" || this.email.value == null)
        {
            flag = false;
            this.setState({ErrEmail1:"visible"});
        }
        if(!this.email.value.includes("@gmail.com","@yahoo.com","@yahoo.com.vn"))
        {
            flag = false;
            this.setState({ErrEmail:"visible"});
        }

        //kiểm tra mật khẩu
        if(this.password.value.length <= 5)
        {
            flag = false;
            this.setState({ErrPassword:"visible"});
        }

        if(this.password.value == null || this.password.value === "")
        {
            flag = false;
            this.setState({ErrPassword1:"visible"});
        }

        if(this.password.value !== this.repassword.value)
        {
            flag = false;
            this.setState({ErrPassword2:"visible"});
        }

        //kiểm tra số điện thoại
        if((isNaN(this.phone.value))) // k phải số
        {
            flag = false;
            this.setState({ErrSDT:"visible"});
        }


        if(flag) {
            this.setState({
                ErrPassword : "hidden",
                ErrName : "hidden",
                ErrSDT : "hidden",
                ErrEmail : "hidden",
                ErrPassword1 : "hidden",
                ErrPassword2 : "hidden",
                ErrName1 : "hidden",
                ErrSDT1 : "hidden",
                ErrEmail1 : "hidden",
            });

            fetch("http://localhost:3001/api/users/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    password: this.password.value,
                    fullname: this.fullname.value,
                    email: this.email.value,
                    type: "0",
                    phone: this.phone.value,
                })
            }).then(console.log("Tạo tài khoản thành công!"));
            this.setState({isHidden:'visible'});
            // chuyển sang component khác
        }

        this.repassword.value = this.phone.value  =  this.password.value = this.fullname.value = this.email.value = null;

    }

    render()
    {
        return(
            <div className="limiter">

                <div className="container-login100" style={{backgroundImage: "URL('http://backgroundcheckall.com/wp-content/uploads/2017/12/login-page-background-images-hd-9.jpg')"}}>
                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                    <span className="login100-form-title p-b-53">
                       Đăng kí tài khoản
                    </span>
                        <div className={this.state.isHidden} id="p-t-20">
                            <div className="alert alert-success" id="ThongBao" role="alert">
                                <strong>Đăng ký thành công!</strong>.
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



                    <div className="form-group">
                        <label htmlFor="Password">Nhập lại password</label>
                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                        <input type="password" className="input100" ref={input=>this.repassword = input} id="Password" name="Password"
                               placeholder="Mật khẩu phải hơn 5 kí tự"/>
                    </div>
                    </div>
                    <div className={this.state.ErrPassword} id="p-t-20">
                        <div className="alert alert-danger" id="ThongBao" role="alert">
                            <strong>Mật khẩu của bạn phải hơn 5 kí tự !</strong>
                        </div>
                    </div>
                    <div className={this.state.ErrPassword2} id="p-t-20">
                        <div className="alert alert-danger" id="ThongBao" role="alert">
                            <strong>Mật khẩu không trùng khớp !!</strong>
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
                    <br/>

                     <div className="container-login100-form-btn m-t-17">
                        <button className="login100-form-btn" onClick={this.handlerRegister.bind(this)} name="btnRegister">
                            <span className="glyphicon glyphicon-user"></span>
                            Đăng kí
                        </button>
                    </div>
                        <br/>
                        <p className="text-center">Have an account ?
                            <Link to="/login" className=" m-b-20 ">
                            Login
                        </Link>
                        </p>

                        </div>
                    </div>
                </div>
        )
    }


}

export default  register
