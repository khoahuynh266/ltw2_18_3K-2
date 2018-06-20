import React from 'react'
import er from "../error"
import { Link } from 'react-router-dom'
class Cart extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            isLogin : false,
            Username : "",
            isAdmin : false,
            CartItem : [],
            isSuccess : "hidden",
            soluong : "",
            IsPay : false,
        }

    }
    handlerGoToModalPay(id)
    {
        this.setState({IsPay:true});
    }

    EditItem(item)
    {
        this.setState({isEdit:true});


    }
    RemoveItem(item)
    {

        const CartItem = this.state.CartItem;
        var listCart = [{}];
        for(var i = 0 ; i  < CartItem.length ; i = i+4) {
            var Cart = {id: CartItem[i],tensp : CartItem[i+1],gia : CartItem[i+2] , soluong: CartItem[i+3]}
            listCart.push(Cart);
        }
        listCart = listCart.filter(function(e) { return e !== listCart[0]}) // xóa item null
        var index = 0;
        for(var j = 0 ; j < listCart.length ;j++)
        {
            if(JSON.stringify(item)===JSON.stringify(listCart[j]))
            {
                index = j;
            }
        }
        listCart = listCart.filter(function (e) {
            return e !== listCart[index];
        })

        var listTemp = [];
        for(var k = 0 ; k < listCart.length ;k++)
        {
            listTemp.push(listCart[k].id.toString());
            listTemp.push(listCart[k].tensp.toString());
            listTemp.push(listCart[k].gia.toString());
            listTemp.push(listCart[k].soluong.toString());
        }
        /*  this.setState({CartItem : listTemp});*/
        window.localStorage.setItem("UserCart",  JSON.stringify(listTemp));
        console.log(window.localStorage.getItem("UserCart"));
        this.setState({CartItem : JSON.parse(window.localStorage.getItem("UserCart"))});
    }

    Pay()
    {
        var token = window.localStorage.getItem('access_token');
        var url = "http://localhost:3001/api/orders/pay";
        fetch(url,{
            async: true,
            crossDomain: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer " + token.toString(),
                "Cache-Control": "no-cache",
            },
            mode: 'cors',
            body: JSON.stringify({
                id : window.localStorage.getItem('uid'),
                UserCart : this.state.CartItem,
            })
        }).then(()=> {
                this.setState({isSuccess: "visible"});
                window.localStorage.removeItem("UserCart");
                this.setState({CartItem : null});
            }
        )

    }

    componentDidMount()
    {
        console.log(window.localStorage.getItem("UserCart"));
        if(window.localStorage.getItem("UserCart"))
        {
            this.setState({CartItem : JSON.parse(window.localStorage.getItem("UserCart"))});
        }
        if(window.localStorage.getItem('username')) {
            this.setState({Username: window.localStorage.getItem('username'), isLogin: true});
        }

        if(window.localStorage.getItem('permission')=== 1) {
            this.setState({isAdmin: true , isLogin: true});
        }
    }

    render(){
        if(this.state.isLogin===false)
        {
            return(
                <er/>
            )
        }
        if(this.state.CartItem===null || this.state.CartItem.length===0)
        {
            return(
                <div>
                    <div className="col-md-12">
                        <div className="text-center" role="alert">
                            Giỏ hàng của bạn đang trống !!!
                        </div>
                    </div>
                    {
                        this.state.isSuccess === "visible" ?
                            <div className={this.state.isSuccess} id="pdtop20">
                                <div className="alert alert-success" id="ThongBao" role="alert">
                                    <strong>Thanh toán thành công!</strong>.
                                </div>
                            </div>

                            :
                            null
                    }
                </div>
            )
        }
        else {
            const CartItem = this.state.CartItem;
            var Total  = 0;

            for(var i = 0 ; i  < CartItem.length ; i = i+4)
            {
                Total += (CartItem[i+2]*CartItem[i+3]);
            }
            var listCart = [{}];
            for(var i = 0 ; i  < CartItem.length ; i = i+4) {
                var Cart = {id: CartItem[i],tensp : CartItem[i+1],gia : CartItem[i+2] , soluong: CartItem[i+3]}
                listCart.push(Cart);
            }
            listCart = listCart.filter(function(e) { return e !== listCart[0] })
            console.log(listCart);

            return (
                <div className="content-header">
                <div className="box m-b-110">
                <div className="box-header with-border">
                </div>
                <div className="box-body">
                    <div className="row">

                <div className="col-md-12">
                    <div className="alert alert-info text-center" role="alert">
                        Tổng tiền hóa đơn : {Total}
                    </div>

                    <div className="thumbnail">
                        <table className="table table-sm">
                            <thead className="text-center">
                            <tr>
                                <th scope="col" className="text-center">Mã sản phẫm</th>
                                <th scope="col" className="text-center">Tên sản phẩm</th>
                                <th scope="col" className="text-center">Giá</th>
                                <th scope="col" className="text-center">Số lượng</th>
                                <th scope="col" className="text-center">Quản lý</th>
                            </tr>
                            </thead>
                            {listCart.map(item => (
                                <tbody className="text-center">
                                <tr>
                                <td>{item.id}</td>
                                <td>{item.tensp}</td>
                                <td>{item.gia}</td>
                                <td>{item.soluong}</td>
                                <td>
                                    <Link to={'/EditCart/'+item.id}  onClick={this.EditItem.bind(this)} className="btn btn-default btn-xs" role="button">
                                        <span className="glyphicon glyphicon-pencil"></span>
                                    </Link>
                                    <button onClick={this.RemoveItem.bind(this,item)} className="btn btn-danger btn-xs" role="button">
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </button>
                                </td>
                                </tr>
                                </tbody>
                            ))}
                        </table>

                    </div>
                </div>
                    </div>
                    <div className="modal position p-t-20" id="ModalPay">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="fontcolor text-center ">Xác nhận thanh toán đơn hàng</div>
                                </div>
                                <p className="text-center">Bạn có muốn thanh toán đơn hàng này không ?? </p>
                                <div className="text-center">
                                    <button type="button" onClick={this.Pay.bind(this)} className="btn btn-success"
                                            data-dismiss="modal">Yes
                                    </button>
                                    <span className=" p-l-50"></span>
                                    <button type="button" className="btn btn-primary"
                                            data-dismiss="modal">No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="text-right">

                            <button data-toggle="modal" data-target="#ModalPay" className="btn btn-success" role="button" name="btnDatMua">
                                <span className="glyphicon glyphicon-shopping-cart"></span>
                                Thanh Toán
                            </button>

                        </div>
                    </div>

                </div>
                    <div className="box-footer p-b-50">
                </div>
                </div>
                </div>


                    );
        }
    }

}

export default Cart

