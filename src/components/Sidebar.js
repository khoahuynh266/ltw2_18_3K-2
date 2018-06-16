// noinspection JSAnnotator
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import Content from "./Content";
import login from "./login";

export default class Sidebar extends Component {
    constructor(props) {
        super(props)}



    render(){
        return (
            <div>
            <aside className="main-sidebar ">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/1016329_196694950495381_105340935_n.jpg?_nc_cat=0&oh=684f67ed8a47e37c799eb0d01d4d73a5&oe=5B7B257F" style={{width :45, height: 45}}  className="img-circle" />
                        </div>
                        <div className="pull-left info">
                            <p>Alexander</p>
                            <Link to="/#" className="fa fa-circle text-success" /> Online
                        </div>
                    </div>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>

                        <li className="treeview">
                            <Link to="/">
                            <i className="fa fa-files-o"></i>
                            <span>Danh sách sản phẩm</span>
                            <span className="pull-right-container">
                            </span>
                            </Link>
                            <ul className="treeview-menu">
                                <li><Link to="/product"><i className="fa fa-circle-o"></i>Tất cả sản phẩm</Link>
                                </li>
                                <li><Link to="/producer"><i className="fa fa-circle-o"></i>Theo nhà sản xuất</Link>
                                </li>
                                <li><Link to="productType"><i className="fa fa-circle-o"></i>Theo loại</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/ProductType">
                            <i className="fa fa-pie-chart"></i>
                            <span>Loại sản phẩm</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </Link>

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
        )}
};

