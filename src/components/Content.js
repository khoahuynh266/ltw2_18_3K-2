
import { BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import React, {Component} from 'react';
import AllProducts from "./product/AllProducts";
import AllUser from "./admin/AllUser";
import login from "./login";
import register from "./register";
import productType from "./product/ProductType";
import productType_List from "./product/ProductType_List";
import BestSeller from "./product/bestseller";
import home from "./home";
import search from "./product/search";
export default class Content extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return (

            <div className="content-wrapper">
                <Switch>
                    <Route exact path = "/search/:QueryStr" component={search}/>
                    <Route exact path = "/home" component={home}/>
                    <Route exact path = "/bestseller" component={BestSeller}/>
                    <Route exact path = "/product" component={AllProducts}/>
                    <Route exact path = "/productType" component={productType}/>
                    <Route exact path = "/productType_List" component={productType_List}/>
                    <Route exact path = "/user" component={AllUser}/>
                    <Route exact path = "/login" component={login}/>
                    <Route exact path = "/register" component={register}/>
                    <Route exact path = "/" component={home}/>
                </Switch>
            </div>
        )
    }
}