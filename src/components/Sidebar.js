// noinspection JSAnnotator
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import Content from "./Content";

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
                        <li>
                            <Link to="/products/page/1">
                                <i className="fa fa-pie-chart"></i>
                                <span>Danh sách sản phẩm</span>
                                <span className="pull-right-container">
                            </span>
                            </Link>
                        </li>
                        <li className="treeview">
                            <Link to="/productType">
                            <i className="fa fa-files-o"></i>
                            <span>Loại sản phẩm</span>
                            <span className="pull-right-container">
                                  <i className="fa fa-angle-left pull-right"></i>
                            </span>
                            </Link>
                            <ul className="treeview-menu">
                                <li><Link to="/products/productType/1"><i className="fa fa-circle-o"></i>Điện thoại</Link>
                                </li>
                                <li><Link to="/products/productType/2"><i className="fa fa-circle-o"></i>Máy tính bảng</Link>
                                </li>
                                <li><Link to="/products/productType/3"><i className="fa fa-circle-o"></i>Laptop</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/producer">
                            <i className="fa fa-pie-chart"></i>
                            <span>Nhà sản xuất</span>
                            <span className="pull-right-container">
                            </span>
                        </Link>
                        </li>
                        <li>
                            <Link to="/OderList">
                                <i className="fa fa-pie-chart"></i>
                                <span>Quản lí đơn hàng</span>
                                <span className="pull-right-container">
                            </span>
                            </Link>
                        </li>
                        <li>
                        <Link to="/user">
                            <i className="fa fa-pie-chart"></i>
                            <span>Quản lí khách hàng</span>
                            <span className="pull-right-container">

                            </span>
                        </Link>
                        </li>
                         <li>
                        <Link to="/ManageProduct">
                            <i className="fa fa-pie-chart"></i>
                            <span>Quản lí sản phẩm</span>
                            <span className="pull-right-container">
                            </span>
                        </Link>
                        </li>
                    </ul>
                </section>
            </aside>
             <Content/>
            </div>
        )}
};

