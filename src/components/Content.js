
import { BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import React, {Component} from 'react';
import AllProducts from "./product/AllProducts";
import AllUser from "./admin/AllUser";
import login from "./Login";
import register from "./register";
import ProducerList from "./product/ProducerList";
import ProductsByProducer from "./product/ProductsByProducer";
import BestSeller from "./product/bestseller";
import home from "./home";
import search from "./product/search";
import ProductPagination from "./product/Products_Pagination";
import ProductDetail from "./product/Product_Detail";
import ProductCart from "./product/ProductCart";
import ManageProduct from "./product/ManageProduct";
import OderList from "./admin/OderList";
import er from "./error";
export default class Content extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <div className="content-wrapper">
            <Switch>
                <Route exact path = "/search/:QueryStr" component={search}/>
                <Route exact path = "/home" component={home}/>
                <Route exact path = "/bestseller" component={BestSeller}/>
                <Route exact path = "/product" component={AllProducts}/>
                <Route exact path = "/producer" component={ProducerList}/>
                <Route exact path = "/products/producer/:number" component={ProductsByProducer}/>
                <Route exact path = "/user" component={AllUser}/>
                <Route exact path = "/login" component={login}/>
                <Route exact path = "/register" component={register}/>
                <Route exact path = "/" component={home}/>
                <Route exacr path = "/products/page/:number" component={ProductPagination}/>
                <Route exacr path = "/productDetail/:number" component={ProductDetail}/>
                <Route exacr path = "/ProductCart" component={ProductCart}/>
                <Route exacr path = "/OderList" component={OderList}/>
                <Route exacr path = "/ManageProduct" component={ManageProduct}/>
                <Route component={er}/>
            </Switch>
        </div>
    )
    }}