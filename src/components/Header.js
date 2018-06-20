import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
var qStr='';
class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin : false,
            isAmin:false,
            UserName: '',
            QueryStr : ""
        }
        this.handleQueryString = this.handleQueryString.bind(this)
        this.Search = this.Search.bind(this);
    }

    handleQueryString = (e) => {
        this.setState({
            QueryStr: e.target.value
        })
        this.Search();
    }

    Search() {
        if (this.QueryStr.value === "" || this.QueryStr.value == null) {
            this.QueryStr.value = "null";
        }
        else {
            var  url = "/search/"+this.QueryStr.value;
            this.props.history.push(url);
            qStr = this.QueryStr.value;
             // document.location.href = "http://localhost:3000/search/" + this.QueryStr.value;
        }
    }
    logout()
    {
        window.localStorage.clear();
        document.location.href = "http://localhost:3000/";

        //this.props.history.push("/");
    }

    componentDidMount()
    {
        if(window.localStorage.getItem('username')) {
            this.setState({UserName: window.localStorage.getItem('username'), isLogin: true});
        }
        if(window.localStorage.getItem('permission')=== 1) {
            this.setState({isAdmin: true , isLogin: true});
        }
    }
    render(){
        const {isLogin,UserName} = this.state;
        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-lg" ><b>2K Shop</b></span>
                    <span className="logo-mini" ><b>2K Shop</b></span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-nav p-t-10 col-sm-8">
                        <div className="px-2 col-md-10">
                            <input ref={input=>this.QueryStr = input} className="form-control wrap-input100 col-md-8" type="text" placeholder="Nhập tên sản phẩm , giá sản phẩm , nhà sản xuất,..."
                                aria-label="Search"
                            />

                        </div>
                            <div className="px-2 col-md-2">
                                <button className="btn btn-primary" onClick={this.Search}>
                                    <i className="fa fa-search"></i>
                                    Tìm kiếm
                                </button>
                            </div>
                            </div>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">Giỏ hàng</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">

                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            {isLogin === true?
                                <li><Link to="/user/HistoryPurchase"><span className="glyphicon glyphicon-user"></span>{UserName}</Link></li>
                                :
                                <li><Link to="login"><span className="glyphicon glyphicon-user"></span>Login

                                </Link>
                                </li>
                            }
                                <li><a onClick={this.logout.bind(this)}><span className="glyphicon glyphicon-log-in"></span> Logout </a></li>

                                </ul>
                    </div>
                </nav>
            </header>
        )
    }
}export  default withRouter(Header);