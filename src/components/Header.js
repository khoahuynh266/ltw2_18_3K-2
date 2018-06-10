import React, {Component} from 'react';
import { Link ,Route} from 'react-router-dom';

export default class Header extends Component{

logout()
{
    window.localStorage.clear();
    document.location.href = "http://localhost:3000/";
}
    render(){
        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-lg" ><b>2K Shop</b></span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="login"><span className="glyphicon glyphicon-user"></span> Login </Link></li>
                            <li><a onClick={this.logout.bind(this)}><span className="glyphicon glyphicon-log-in"></span> Logout </a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}