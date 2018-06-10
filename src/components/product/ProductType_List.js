import React, {Component} from 'react';
import ProductType_List_Detail from "./ProductType_List_Detail";
export default class ProductType_List extends Component {
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
                                            <ProductType_List_Detail/>
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