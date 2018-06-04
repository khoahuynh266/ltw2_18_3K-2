import React from 'react'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            error: false,
            isLoaded: false,
            list: [],
            isHidden: "hidden",
            value: "",
            ErrPassword: "hidden",
            ErrPassword1: "hidden",
            ErrPassword2: "hidden",
            ErrPassword3: "hidden",
            email: "",
            password: "",

        }
        this.reload = this.reload.bind(this);

        this.handlerChangePassword = this.handlerChangePassword.bind(this);

    }

    handlerChangePassword(event) {
        this.setState({
            password : event.target.value,
        });
    }

    handlerUpdate()
    {
        var token = window.localStorage.getItem('access_token');
        var flag = true;
        console.log(this.state.email+"----"+this.oldPassword.value);
        var url = "http://localhost:3001/api/users/CheckPassword/";

            fetch(url, {
                async: true,
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "bearer " + token.toString(),
                },
                mode: 'cors',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.oldPassword.value,
                }),
            }).then(res => res.json())
                .then((rs) => {
                        console.log(rs[0].ok);
                        if (parseInt(rs[0].ok) === 0) {
                            this.setState({ErrPassword3: "visible"});
                            flag = false;
                        }
                    }
                )
            if(flag===false) {
                return;
            }

          if(this.newPassword.value.length <= 5)
            {
                flag = false;
                this.setState({ErrPassword:"visible"});
                return;
            }


            if(this.newPassword.value == null || this.newPassword.value === "")
            {
                flag = false;
                this.setState({ErrPassword1:"visible"});
                return;
            }
            if(this.newPassword.value !== this.rePassword.value)
            {
                flag = false;
                this.setState({ErrPassword2:"visible"});
                return;
            }





        if(flag) {
            this.setState({
                Erremail : "hidden",
                ErrPassword : "hidden",
                ErrPassword1 : "hidden",
                ErrPassword2 : "hidden",
                ErrPassword3 : "hidden"
            });

            var id = window.localStorage.getItem('uid');
            var url = "http://localhost:3001/api/users/UpdatePassword/";
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    password : this.newPassword.value,
                }),
            }).then(()=>this.setState({isHidden: 'visible'}));
        }
        this.oldPassword.value = this.rePassword.value = this.newPassword = null;
    }

    reload()
    {
        var token = window.localStorage.getItem('access_token');
        var id = parseInt(this.props.match.params.number, 10);
        var url = "http://localhost:3001/api/users/users/"+id;

        fetch(url, {
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result,

                    });
                    console.log(result)
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount()
    {
      var url = "http://localhost:3001/api/users/"+id;
        this.setState({
            isLoaded: true,
            email :  window.localStorage.getItem('email')
        });


    }


    render() {


            return (
                <div>
                    <div className="col-md-3">
                    </div>

                    <div className="col-md-5 col">
                        <h3 className="text-center fontcolor">Đổi mật khẩu</h3>
                            <div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Tên đăng nhập</label>
                                    <input readOnly type="text" className="form-control"   value={this.state.email} id="txtTenDangNhap" name="txtTenDangNhap"
                                         />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="txtPassword">Password cũ</label>
                                    <input type="password" className="form-control" ref={input=>this.oldPassword = input} id="txtPassword" name="txtPassword"
                                          />
                                </div>

                                <div className={this.state.ErrPassword3} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu hiện tại  nhập không chính xác !!</strong>.
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="txtPassword">Password mới</label>
                                    <input type="password" className="form-control" ref={input=>this.newPassword = input} id="txtPassword" name="txtPassword"
                                           />
                                </div>

                                <div className={this.state.ErrPassword} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu phải hơn 5 kí tự !</strong>.
                                    </div>
                                </div>
                                <div className={this.state.ErrPassword1} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Password không được để trống !</strong>.
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="txtPassword">Nhập lại password</label>
                                    <input type="password" className="form-control" ref={input=>this.rePassword = input} id="txtPassword" name="txtPassword"
                                           placeholder="******"/>
                                </div>
                                <div className={this.state.ErrPassword2} id="pdtop20">
                                    <div className="alert alert-danger" id="ThongBao" role="alert">
                                        <strong>Mật khẩu không trùng khớp !!</strong>.
                                    </div>
                                </div>


                            </div>
                        <Link to='/' className="btn btn-primary"><span className="fas fa-backward"></span></Link>
                        <button type="button" className="btn btn-success" onClick={this.handlerUpdate.bind(this)}
                        >Đổi mật khẩu
                        </button>


                        <div className={this.state.isHidden} id="pdtop20">
                            <div className="alert alert-success" id="ThongBao" role="alert">
                                <strong>Đổi mật khẩu thành công!</strong>.
                            </div>
                        </div>
                    </div>


                </div>
            )
        
    }
}



export default ChangePassword
