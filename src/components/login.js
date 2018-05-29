import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            access : "0",
            isHidden: "hidden",
        }
    }


    handlerSingin()
    {
        var token;

        fetch("http://localhost:3001/login/login",
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email.value,
                    password: this.password.value,
                })
            }
        )
        .then((res)=>res.json())
            .then((res1)=>{
            if(res1.err)
            {
                this.setState({isHidden:"visible"});
            }
            else {
                window.localStorage.setItem('token', res1.token);
                token = window.localStorage.getItem('token');
                this.sendToken(token);
            }
        });
        fetch("http://localhost:3001/login/login",
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email.value,
                    password: this.password.value,

                }),
            }).then((res1)=>{
            if(res1.err)
            {
                this.setState({isHidden:"visible"});
            }
            else {
                window.localStorage.setItem('token', res1.token);
                token = window.localStorage.getItem('token');
                this.sendToken(token);
            }
        });
    }



    sendToken(token)
    {
        var token = window.localStorage.getItem('token');
        var url = "http://localhost:3001/login/secret";
        fetch(url,{
            async: true,
            method: "GET",
            headers: {
                "Authorization": "bearer "+token.toString(),
                "Cache-Control": "no-cache",
            },
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        access: result
                    });
                    if(this.state.access != "0")
                    {
                        document.location.href = "http://localhost:3000/admin";
                    }
                },
            );


    }


    render()
    {
        return (
            <div className="limiter">
                <div className="container-login100" style={{backgroundImage: "URL('http://backgroundcheckall.com/wp-content/uploads/2017/12/login-page-background-images-hd-9.jpg')"}}>
                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <form className="login100-form validate-form flex-sb flex-w">
                    <span className="login100-form-title p-b-53">
                        Sign In With
                    </span>

                            <a href="#" className="btn-face m-b-20">
                                <i className="fa fa-facebook-official"></i>
                                Facebook
                            </a>

                            <a href="#" className="btn-google m-b-20">
                                <img src="images/icons/icon-google.png" alt="GOOGLE"/>
                                Google
                            </a>

                            <div className="p-t-31 p-b-9">
                        <span className="txt1">
                            Email
                        </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate = "Email is required">
                                <input className="input" ref={input => this.email = input} name="email" placeholder="email"
                                       required="required"/>
                                <span className="focus-input100"></span>
                            </div>

                            <div className="p-t-13 p-b-9">
                        <span className="txt1">
                            Password
                        </span>

                                <a href="#" className="txt2 bo1 m-l-5">
                                    Forgot?
                                </a>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input" type="password" ref={input => this.password = input} name="password" placeholder="Password"
                                       required="required" />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn m-t-17">
                                <button className="login100-form-btn" onClick={this.handlerSingin.bind(this)}>
                                    Sign In
                                </button>
                            </div>

                            <div className="w-full text-center p-t-55">
                        <span className="txt2">
                            Not a member?
                        </span>

                                <a href="#" className="txt2 bo1">
                                    Sign up now
                                </a>
                            </div>
                            <div className={this.state.isHidden} id="pdtop20">
                                <div className="alert alert-danger" id="ThongBao" role="alert">
                                    <strong>Tên đăng nhập hoặc mật khẩu không đúng !!</strong>.
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        );
    }
}
export default Login