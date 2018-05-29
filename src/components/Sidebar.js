import React, {Component} from 'react';
import { Link ,Route, Switch} from 'react-router-dom';
import Content from "./Content";

export default class Sidebar extends Component {
    render(){
        return (
            <div>
            <aside className="main-sidebar ">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/1016329_196694950495381_105340935_n.jpg?_nc_cat=0&oh=684f67ed8a47e37c799eb0d01d4d73a5&oe=5B7B257F" style={{width :45, height: 45}}  className="img-circle " alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Alexander</p>
                            <Link to="/#" className="fa fa-circle text-success" /> Online
                        </div>
                    </div>
                    <form action="" method="get" className="sidebar-form">
                        <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="treeview">
                            <Link to="/product">
                                <i className="fa fa-files-o"></i>
                                <span>Danh sách sản phẩm</span>
                                <span className="pull-right-container">
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/ProductType">
                            <i className="fa fa-pie-chart"></i>
                            <span>Loại sản phẩm</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </Link>
                            <ul className="treeview-menu">
                                <li><Link to="#"><i className="fa fa-circle-o"></i>Laptop</Link></li>
                                <li><Link to="#"><i className="fa fa-circle-o"></i> Tables</Link></li>
                                <li><Link to="#"><i className="fa fa-circle-o"></i> Phone</Link></li>
                            </ul>
                        </li>

                        <li>
                        <Link to="/user">
                            <i className="fa fa-pie-chart"></i>
                            <span>User</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </Link>
                        </li>
                    </ul>
                </section>

            </aside>
                <Switch>
        <Route path="/" component={Content}/>
                </Switch>
            </div>
        )
    }
};

