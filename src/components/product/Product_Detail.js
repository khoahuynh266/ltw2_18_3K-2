import React from 'react';
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            list: [],
            items_P: [],
            items_T: [],
            isHidden: "hidden",
            ID: this.props.match.number,
            Quantity: null,
            ErrBuy: "hidden",
            ErrBuy1: "hidden",
            ErrBuy2: "hidden",
            SaveProduct: []
        }
        this.Get5ItemProduct_Producer = this.Get5ItemProduct_Producer.bind(this);
        this.Get5ItemProduct_Type = this.Get5ItemProduct_Type.bind(this);
        this.UpdateView = this.UpdateView.bind(this);
        this.GetProductDetail = this.GetProductDetail.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
    }


    handlerClick(i) {
        this.props.history.push("/productDetail/"+i);
        this.UpdateView(i);
        this.GetProductDetail(i);
    }
    Get5ItemProduct_Type() // lấy 5 sản phẩm cùng loại
    {

        var url = "http://localhost:3001/api/products/5productSamType/" + this.state.list[0].loai;;
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items_T: result,

                    });
                }
            )
    }

    Get5ItemProduct_Producer() // lấy 5 sản phẩm cùng nhà sản xuất
    {

        var url2 = "http://localhost:3001/api/products/5productSamProducer/" + this.state.list[0].id_nsx; // mã nhà sản xuất
        fetch(url2, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items_P: result,

                    });
                    console.log(result)
                },

                (error) => {
                    console.log("error cmnr");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    HandlerBuy(id) {
        if (window.localStorage.getItem("permission") === null) {
            this.props.history.push("/register");
        }
        if (!this.Quantity.value) {
            this.setState({ErrBuy: "visible"});
            return;
        }
        if (isNaN(this.Quantity.value)) {
            this.setState({ErrBuy: "visible"});
        }

        else if (this.Quantity.value > this.state.Quantity) {
            this.setState({ErrBuy1: "visible"});
        }

    }

    //tăng lượt xem
    UpdateView(ID) {

        var url = "http://localhost:3001/api/products/UpdateView/" + ID;
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

    }
    GetProductDetail(ID)
    {
        fetch("http://localhost:3001/api/products/" + ID, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        list: result,
                        Quantity: result[0].soluong,
                    });
                    this.Get5ItemProduct_Type();
                    this.Get5ItemProduct_Producer();
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {
        var ID = this.props.match.params.number;
        this.UpdateView(ID);
        this.GetProductDetail(ID);
    }

    render() {
        const {list, items_P, items_T} = this.state;

        return (
            <div className="content-header">
            <div className="box">
                <div className="box-header with-border">
                </div>
                <div className="box-body">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="text-center">
                            <div className="col-md-auto">
                            {list.map(item => (
                    <div className="card mb-4 box-shadow text-center">
                        <img className="card-img-top"
                             src={"/"+item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                             alt="Card image cap" />
                        <div className="card-body fs-16">
                           <h2 className="text-center text-blue">Thông tin sản phẩm</h2>
                               <li>Tên sản phẩm : <span className="bold"> {item.tensp}  </span></li>
                               <li>Giá : <span className="bold">{item.gia}</span></li>
                               <li>Tên nhà sản xuất : <span className="bold">{item.ten_nsx} </span></li>
                               <li>Xuất sứ : <span className="bold">{item.xuatsu}</span></li>
                               <li>Mô tả chi tiết sản phẩm :
                                <div>{item.mota}</div>
                               </li>
                                <a className="btn btn-default" role="button">
                                    <span className="glyphicon glyphicon-eye-open"></span>
                                    Lượt xem : {item.luotxem}
                                </a>
                                <a className="btn btn-default" role="button">
                                    <span className="glyphicon glyphicon-ok-circle"></span>
                                    Đã Bán : {item.daban}
                                </a>
                                <a className="btn btn-default" role="button">
                                    <span className="glyphicon glyphicon-ok-circle"></span>
                                    Số lượng tồn : {item.soluong}
                                </a>
                            <div className="d-flex justify-content-between align-items-center p-b-70">
                                <form className="form-inline">
                                    <div className="form-group">
                                        <label className="sr-only">Số lượng</label>
                                    </div>
                                    <div className="form-group">
                                        <label for="txtSoLuong" className="sr-only">Số lượng</label>
                                        <input ref={input => this.Quantity = input} type="text" className="form-control"
                                               id="txtSoLuong" name="txtSoLuong"
                                               placeholder="Nhập số lượng cần mua"/>
                                    </div>
                                    <button onClick={this.HandlerBuy.bind(this, item.id)} className="btn btn-danger"
                                            name="btnDatMua">
                                        <span className="glyphicon glyphicon-shopping-cart"></span>
                                        Đặt mua
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                ))}
                            <div className={this.state.ErrBuy} id="p-t-20">
                                <div className="alert alert-danger" id="ThongBao" role="alert">
                                    <strong>Vui lòng chỉ nhập số ! , đặt mua thất bại !.</strong>.
                                </div>
                            </div>

                            <div className={this.state.ErrBuy1} id="p-t-20">
                                <div className="alert alert-danger" id="ThongBao" role="alert">
                                    <strong>Số lượng nhập lớn hơn số lượng tồn , đặt mua thất bại !.</strong>
                                </div>
                            </div>
                            <div className={this.state.ErrBuy2} id="p-t-20">
                                <div className="alert alert-success" id="ThongBao" role="alert">
                                    <strong>Đặt mua thành công , vui lòng kiểm tra
                                        <Link to='/home/cart/'> giỏ hàng của bạn</Link>
                                        !.</strong>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="box-footer p-b-20">
                </div>
            </div>
            </div>

                <div className="box">
                    <div className="box-header bg-blue-active with-border">
                        <div className="bg-blue-active"><h3 className="font">5 Sản phẩm cùng loại</h3>
                            </div>
                        </div>
                        <div className="box-body">
                        <div className="row">
                            <div className="text-center">
                                <div className="col-md-auto">
                                    {items_T.map(item => (
                                        <div className="col-md-4" key={item.id}>
                                            <div className="card mb-4 box-shadow">
                                                <Link to={'/productDetail/' + item.id}>
                                                    <img className="card-img-top"
                                                         src={"/"+item.image} onError={(e) => {
                                                        e.target.src = "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"
                                                    }}
                                                         alt={item.tensp}
                                                    />
                                                </Link>
                                                <br/>
                                                <div className="card-body text-center">
                                                    <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                    <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3>
                                                    <a className="btn btn-default" role="button">
                                                        <span className="label glyphicon glyphicon-eye-open"></span>
                                                        Xem : {item.luotxem}
                                                    </a>
                                                    <a className="btn btn-default" role="button">
                                                        <span className="label  glyphicon glyphicon-tags"></span>
                                                        Đã bán : {item.daban}
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link to={'/productDetail/' + item.id}
                                                          className="btn btn-danger text-center" role="button"
                                                          name="MuaNgay">
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
                    <div className="box">
                        <div className="box-header bg-blue-active with-border">
                        <div className="bg-blue-active"><h3 className="font">5 Sản phẩm cùng nhà sản xuất</h3>
                        </div></div>
                    <div className="box-body">
                                <div className="row">
                            <div className="text-center">
                                <div className="col-md-auto">
                                    {items_P.map(item => (
                                        <div className="col-md-4" key={item.id}>
                                            <div className="card mb-4 box-shadow">
                                                <Link to={'/productDetail/' + item.id}>
                                                    <img className="card-img-top"
                                                         src={"/"+item.image} onError={(e) => {
                                                        e.target.src = "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"
                                                    }}
                                                         alt={item.tensp}
                                                    />
                                                </Link>
                                                <br/>
                                                <div className="card-body">
                                                    <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                    <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3>
                                                    <a className="btn btn-default" role="button">
                                                        <span className="label glyphicon glyphicon-eye-open"></span>
                                                        Xem : {item.luotxem}
                                                    </a>
                                                    <a className="btn btn-default" role="button">
                                                        <span className="label  glyphicon glyphicon-tags"></span>
                                                        Đã bán : {item.daban}
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link to={'/productDetail/' + item.id}
                                                          className="btn btn-danger text-center" role="button"
                                                          name="MuaNgay">
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
        )
    }
}



export default ProductDetail