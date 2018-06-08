
import React, {Component} from 'react';
import ProductAdd from "./ProductAdd";
import ProductList from "./ProductList";
export default class AllProducts extends Component {
    render(){
        return (
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Danh sách sản phẩm</h3>
                                    <p className="text-center">  <ProductAdd handleAfterAdd={this.handleAfterAdd}/>  </p>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="text-center">
                                            <ProductList/>
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
