import React from "react";
import { Link } from 'react-router-dom';
var producerID;
class ProductsByProducer extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.getItems = this.getItems.bind(this);
    }
    getItems(producerID)
    {
        fetch("http://localhost:3001/api/products/Producer/" + producerID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    componentDidMount() {
        if (!this.props.match.params.number) {
            this.props.history.replace("/products/producer/"+1);
        }
        producerID = this.props.match.params.number;
this.getItems(producerID);
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                    <section className="content-header">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Danh sách sản phẩm theo hãng</h3>
                                    </div>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="text-center">
                                                <div className="row">
                                                    <div className="col-md-auto">
                                                        {items.map(item => (
                                                            <div className="col-md-4" key={item.id_nsx}>
                                                                <div className="card mb-4 box-shadow">
                                                                    <img className="card-img-top"
                                                                         src={"/"+item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                                                         alt="Card image cap" />
                                                                    <div className="card-body">
                                                                        <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                                        <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3><br/>
                                                                        <a className="btn btn-default" role = "button">
                                                                            <span className="label glyphicon glyphicon-eye-open" ></span>
                                                                            Xem : {item.luotxem}
                                                                        </a>
                                                                        <a className="btn btn-default" role = "button">
                                                                            <span className="label  glyphicon glyphicon-tags"></span>
                                                                            Đã bán : {item.daban}
                                                                        </a>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <Link to={'/ProductDetail/'+item.id}
                                                                              className="btn btn-success text-center" role="button" name ="MuaNgay">
                                                                            Thêm vào giỏ hàng
                                                                        </Link>
                                                                        <Link to={'/ProductDetail/'+item.id}
                                                                              className="btn btn-danger text-center" role="button" name ="MuaNgay">
                                                                            Mua ngay
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        }
                                                    </div>
                                                    <a id="back-to-top"  className="btn btn-primary btn-lg back-to-top" role="button" title="Click to return on the top page" data-toggle="tooltip" data-placement="left"><span className="glyphicon glyphicon-chevron-up"></span></a>
                                                </div>
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
            );
        }
    }
}

export default ProductsByProducer;