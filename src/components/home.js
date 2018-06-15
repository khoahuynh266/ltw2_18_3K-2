import { Link } from 'react-router-dom'
import React, {Component} from 'react';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bestview: [],
            bestseller: [],
            newest: [],
        };
    }

        getbestview(){
            fetch("http://localhost:3001/api/bestview")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        bestview : result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }


        getbestsell(){
            fetch("http://localhost:3001/api/bestseller")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            bestseller: result
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }

        getnewset(){
        fetch("http://localhost:3001/api/newest")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        newest: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }

    componentDidMount() {
        this.getbestsell();
        this.getbestview();
        this.getnewset();

    }
    render(){
        const {error, isLoaded, bestseller,bestview,newest} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        } else
        return (
            <section className="content-header">
                <div className="row">
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title fs-18">10 sản phẩm mới nhất</h3>
                           <button className="btn btn-primary navbar-right" type="button" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
                           Thu gọn
                           </button>
                        </div>
                        <div className="collapse" id="collapseExample1">
                        <div className="box-body">
                            <div className="row">
                                <div className="text-center">
                                    <div>
                                        <div className="row">
                                            <div className="col-md-auto">
                                                {newest.map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <div className="card mb-4 box-shadow">
                                                            <Link to ={'/productdetal/'+item.id}>
                                                                <img  className="card-img-top"
                                                                      src={item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                                                      alt={item.tensp}
                                                                />
                                                            </Link>
                                                            <br/>
                                                            <div className="card-body">
                                                                <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                                <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3>
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
                                        </div>
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
                    <div className="box">
                        <div className="box-header with-border ">
                            <h3 className="box-title fs-18">10 sản phẩm xem nhiều</h3>
                            <button className="btn btn-primary navbar-right" type="button" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="true" aria-controls="collapseExample2">
                                Thu gọn
                            </button>
                        </div>
                        <div className="collapse" id="collapseExample2">
                        <div className="box-body">
                            <div className="row">
                                <div className="text-center">
                                    <div>
                                        <div className="row">
                                            <div className="col-md-auto">
                                                {bestview.map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <div className="card mb-4 box-shadow">
                                                            <Link to ={'/productdetal/'+item.id}>
                                                                <img  className="card-img-top"
                                                                      src={item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                                                      alt={item.tensp}
                                                                />
                                                            </Link>
                                                            <br/>
                                                            <div className="card-body">
                                                                <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                                <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3>
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
                                            </div>
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
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title fs-18">10 sản phẩm bán chạy</h3>
                            <button className="btn btn-primary navbar-right" type="button" data-toggle="collapse" data-target="#collapseExample3" aria-expanded="true" aria-controls="collapseExample3">
                                Thu gọn
                            </button>
                        </div>
                        <div className="collapse" id="collapseExample3">
                        <div className="box-body">
                            <div className="row">
                                <div className="text-center">
                                    <div>
                                        <div className="row">
                                            <div className="col-md-auto">
                                                {bestseller.map(item => (
                                                    <div className="col-md-4" key={item.id}>
                                                        <div className="card mb-4 box-shadow">
                                                            <Link to ={'/productdetal/'+item.id}>
                                                                <img  className="card-img-top"
                                                                      src={item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                                                      alt={item.tensp}
                                                                />
                                                            </Link>
                                                            <br/>
                                                            <div className="card-body">
                                                                <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                                <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3>
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
                                        </div>
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
        )
    }
}
