import React from 'react'
import er from "../error"
class HistoryPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            UserName: "",
            isAdmin: false,
            Orders: [],
            OrderDetail: [],
            isSuccess: "hidden",
            totalOrder: "",
            OrderID: null
        }

    }

    getOrderDetail(OrderID) {
        var token = window.localStorage.getItem('access_token');
        this.setState({OrderID: OrderID});
        var url = "http://localhost:3001/api/orders/" + OrderID;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "bearer "+token.toString(),
            },
        }).then(res => res.json())
            .then((res) => {
            this.setState({OrderDetail: res})
        })
    }

    componentDidMount() {
        if (window.localStorage.getItem('access_token')) {
            var token = window.localStorage.getItem('access_token');
            var id = window.localStorage.getItem('uid');
            fetch("http://localhost:3001/api/PurchaseHistory", {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": "bearer "+token.toString(),
                },
            }).then(res => res.json()).then((res) => {
                this.setState({
                    Orders: res,
                    totalOrder: res.length
                })
            })
        }
    }

    render() {
        const {OrderDetail, Orders, totalOrder, OrderID} = this.state;
        if (!window.localStorage.getItem('access_token')) {
            return (
                <er/>
            )
        }
        else {

            for (var i = 0; i < Orders.length; i++) {
                if (Orders[i].trangthai === 0) {
                    Orders[i].trangthai = <td
                        className="label label-danger">"Chưa giao"</td>;

                }
                else if (Orders[i].trangthai === 1) {
                    Orders[i].trangthai = <td
                         className="label label-info"> "Đang giao"</td>;
                }

                else if (Orders[i].trangthai === 2) {
                    Orders[i].trangthai = <td
                        className="label label-success"> "Đã giao"</td>;
                }
            }
            return (
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Lịch sử mua hàng của bạn</h3>
                                    </div>
                                <div className="box-body">
                                    <div className="row">
                                        <p style={{margin: 15, border:1 ,solid :'black'}}>
                                            <div className="hover-yellow">
                                        <div className="alert alert-success text-center ">
                                            {totalOrder === null || totalOrder === 0 ?
                                                <span
                                                    className="alert-link tex-center">Bạn không có đơn đặt hàng nào</span>
                                                :
                                                <span
                                                    className="alert-link tex-center">Bạn có {totalOrder} đơn hàng</span>
                                            }
                                        </div>

                                        <table className="table table-sm">
                                            <thead className="text-center">
                                            <tr>
                                                <th scope="col" className="text-center">Mã hóa đơn</th>
                                                <th scope="col" className="text-center">Ngày lập</th>
                                                <th scope="col" className="text-center">Trạng thái</th>
                                                <th scope="col" className="text-center">Chi tiết</th>

                                            </tr>
                                            </thead>
                                            {Orders.map(item => (
                                                <tbody className="text-center">
                                                <tr>
                                                    <td scope="row"> {item.id}</td>
                                                    <td className="text-center">{item.created_at}</td>
                                                    {item.trangthai}
                                                    <td className="text-center">
                                                        <button onClick={this.getOrderDetail.bind(this, item.id)}
                                                                className="btn btn-info btn-s " name="btnXemChiTiet"
                                                                role="button">
                                                            <span className="glyphicon glyphicon-search"></span>
                                                            Xem chi tiết
                                                        </button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            ))}
                                        </table>

                                        {OrderID != null ?
                                            <div className=".col-md-8">
                                                <div className="alert alert-info text-center">
                                                    <span
                                                        className="alert-link text-center"> Thông tin chi tiết hóa đơn : {OrderID}  </span>
                                                </div>
                                                <table className="table table-hover text-center spacing">
                                                    <thead>

                                                    <tr>
                                                        <th scope="col">Mã sản phẩm</th>
                                                        <th scope="col">Tên sản phẩm</th>
                                                        <th scope="col">Giá</th>
                                                        <th scope="col" className="text-center">Số lượng</th>

                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    {OrderDetail.map(item => (
                                                        <tr className="bg-info bold">
                                                            <td scope="row"> {item.id_sanpham}</td>
                                                            <td> {item.tensp}</td>
                                                            <td>{item.gia}</td>
                                                            <td> {item.soluong}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            :
                                            null
                                        }
                                            </div>
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
                    </div>
                </section>
            )
        }
    }
}




export default HistoryPurchase

