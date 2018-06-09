
import React, {Component} from 'react';
import ProductAdd from "./ProductAdd";
import ProductList from "./ProductList";
import ProductType_Detail from "./ProductType_Detail";
export default class ProductType extends Component {
    render(){
        return (
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Danh sách các hãng</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="text-center">
                                            <ProductType_Detail/>
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
