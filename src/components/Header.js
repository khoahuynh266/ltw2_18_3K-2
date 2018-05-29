import React, {Component} from 'react';
import { Link ,Route} from 'react-router-dom';
import Content from "./Content";
export default class Header extends Component {
    render(){
        return (
            <header className="main-header  " >
                <Link to="#" className="logo">
                    <span className="logo-mini"><b>Admin</b></span>
                    <span className="logo-lg"><b></b></span>
                </Link>
                <nav className="navbar navbar-static-top navbar-inverse">
                    <Link to="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </Link>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">

                            <li className="dropdown messages-menu">
                                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <Link to="#">
                                                    <div className="pull-left">
                                                        <img src="img/user2-160x160.jpg" className="img-circle" alt="UserImage" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </Link>
                                            </li>

                                        </ul>

                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="login"><span className="glyphicon glyphicon-user"></span> Login </Link></li>
                        <li><Link to="sinup"><span className="glyphicon glyphicon-log-in"></span> Sign Up</Link></li>
                    </ul>
                </nav>


            </header>
        )
    }
}