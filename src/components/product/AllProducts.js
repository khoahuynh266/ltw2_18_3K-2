import { BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import React, {Component} from 'react';
import ProductAdd from "./ProductAdd";
import ProductList from "./ProductList";
import ProductPagination from "./Products_Pagination";
import ProductDetail from "./Product_Detail";
export default class AllProducts extends Component {
    constructor(props) {
        super(props);
    }

        render(){

        return (
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Danh sách sản phẩm</h3>
                                    <p className="text-center">
                                        <ProductAdd handleAfterAdd={this.handleAfterAdd}/>  </p>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="text-center">
                                            <Switch>
                                                <Route exact path = "/product" component={ProductList}/>
                                                <Route path = "/page/:number" component={ProductPagination}/>
                                                <Route exact path = "/productType" component={ProductList}/>
                                                <Route exact path = "/producer" component={ProductList}/>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="row">
                                        <div className="col-sm-3 col-xs-6">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}
