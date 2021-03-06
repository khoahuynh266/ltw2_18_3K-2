import React from 'react'
import { Link } from 'react-router-dom'

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
        fetch("http://localhost:3001/login/login",
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': this.email.value,
                    'password': this.password.value,
                })
            }
        )
    .then((rs)=>rs.json())
            .then((res)=>{
                if(res.err)
                {
                    this.setState({isHidden:"visible"});
                }
                else {
                    window.localStorage.setItem('access_token', res.token);
                  var  token = window.localStorage.getItem('access_token');
                    this.sendToken(token);
                }
            });
    }

    sendToken(token)
    {

        var bearer = 'bearer ' +token ;
        fetch("http://localhost:3001/login/secret",{
            async: true,
            method: "GET",
            headers: {
                'authorization': bearer,
            },
        })
            .then((rs)=>rs.json())
            .then(
                (res) => {
                    this.setState({
                        access: res.id

                    });
                    window.localStorage.setItem('permission', res.permission);
                    window.localStorage.setItem('uid', res.id);

                    window.localStorage.setItem('username', res.username);
                    if(this.state.access !== null)
                    {
                        document.location.href = "http://localhost:3000/";
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
                                <input className="input100" ref={input => this.email = input} name="email" placeholder="email"
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
                                <input className="input100" type="password" ref={input => this.password = input} name="password" placeholder="Password"
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

                                <Link to="/register" className="txt2 bo1">
                                    Sign up now
                                </Link>
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