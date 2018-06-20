
import React from 'react';
import { Link } from 'react-router-dom'
var QueryStr ='';
class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            items: [],
        }
        this.getSerchItems=this.getSerchItems.bind(this);
    }
    getSerchItems(QueryStr)
    {
    fetch("http://localhost:3001/api/products/search/"+QueryStr,{
        method: "get",
        headers: {
            'Content-Type': 'application/json',
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
    componentWillReceiveProps() {
        QueryStr =  this.props.match.params.QueryStr
        this.getSerchItems(QueryStr)

    }
    componentDidMount() {
        QueryStr =  this.props.match.params.QueryStr
        this.getSerchItems(QueryStr);
    }

    render() {
        const {error, isLoaded,items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;

        }
        else
            return (
                <section className="content-header">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box">
                            <div className="box-header with-border">
                                <div className="p-t-5 text-center  bg-light fs-18">
                                    <div>
                                        <p>Từ khóa tìm kiếm:  <span className="bold fs-20">{QueryStr}</span></p>
                                        <p>Có <span className="bold fs-20">{items.length}</span> kết quả tìm thấy </p>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="text-center">
                                            <div className="row">
                                                {items.length === 0?
                                                                <div className="text-center text-red fs-18">
                                                                    Không có sản phẩm nào thỏa điều kiện!
                                                                </div>
                                                        :
                                                        <div className="col-md-auto">
                                                            {items.map(item => (
                                                                <div className="col-md-4" key={item.id}>
                                                                    <div className="card mb-4 box-shadow">
                                                                        <img width="300" height="300" className="card-img-top"
                                                                             src={"/"+item.image}  onError={(e)=>{e.target.src= "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}}
                                                                             alt="Card image cap" />
                                                                        
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
                                                }
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


export default  Search
