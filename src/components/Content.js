
import React, {Component} from 'react';
import ProductAdd from "./product/ProductAdd";
import ProductList from "./product/ProductList";
export default class Content extends Component {
    render(){
        return (
            <div className="content-wrapper">
              <ProductAdd handleAfterAdd={this.handleAfterAdd}/>
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Danh sách sản phẩm</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                            <p className="text-center">
                                                <ProductList/>
                                            </p>
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
            </div>
        )
    }
}