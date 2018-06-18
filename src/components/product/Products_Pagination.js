import React from 'react';
var curPage ;
var nextPage;
var prevPage;
class ProductPagination extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            isLoaded: false,
            items: [],
            totalPages: 0,
            arrPage: []
        }
        this.getItems = this.getItems.bind(this);
    }
    getItems(curPage)
    {
        fetch("http://localhost:3001/api/products/page/" + curPage, {
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

    handlerClick(i) {
        this.props.history.replace("/products/page/"+i);
        curPage =i;

        this.render();
      this.getItems(curPage);
    }

    componentDidMount() {
        if (!this.props.match.params.number) {
            this.props.history.replace("/products/page/"+1);
        }
        curPage = this.props.match.params.number;

        fetch("http://localhost:3001/api/products", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    var totalItems = result.length;
                    var totalPages = Math.ceil(totalItems / 15);
                    var arrtemp = [];
                    for (var i = 0; i < totalPages; i++) {
                        arrtemp.push(i + 1);
                    }
                    this.setState({
                        arrPage: arrtemp,
                        totalPages: totalPages
                    });

                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })

        this.getItems(curPage);
    }


    render() {
        const {error, isLoaded, items, arrPage,totalPages} = this.state;

        nextPage = parseInt(curPage) + 1;
        prevPage = curPage - 1;
        if (prevPage === 0) {
            prevPage = 1;
        }
        if (nextPage > totalPages) {
            nextPage = totalPages;
        }

        if (curPage <= 0) {
            this.props.history.replace("/products/page/"+1);
        }


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
                                    <h3 className="box-title">Danh sách sản phẩm</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="text-center">
                                            <div className="row">
                                                <div className="col-md-auto">
                                                    {items.map(item => (
                                                        <div className="col-md-4" key={item.id}>
                                                            <div className="card mb-4 box-shadow">
                                                                <img width="300" height="300" className="card-img-top"
                                                                     src={"/"+item.image} onError={(e) => {
                                                                    e.target.src = "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"
                                                                }}
                                                                     alt="Card image cap"/>
                                                                <div className="card-body">
                                                                    <h4 className="card-text p-t-10 p-b-10">{item.tensp}</h4>
                                                                    <h3 className="card-text p-t-10 p-b-10">{item.gia} VND</h3><br/>
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
                                <div className="box-footer">
                                    <div className="row">
                                            <div className="text-center ">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination">
                                                        <li>
                                                            <a aria-label="Previous" onClick={this.handlerClick.bind(this,prevPage)}>
                                                                <span aria-hidden="true">&laquo;</span>Prev</a>
                                                        </li>
                                                        {arrPage.map(item => (
                                                            <li key={item}>
                                                                {item === curPage ?
                                                                    <a className="bg-blue" onClick={this.handlerClick.bind(this,item)}>{item}</a>
                                                                    :
                                                                    <a onClick={this.handlerClick.bind(this,item)}>{item}</a>
                                                                }

                                                            </li>
                                                        ))}
                                                        <li>
                                                            <a aria-label="Next" onClick={this.handlerClick.bind(this,nextPage)}>Next
                                                                <span aria-hidden="true">&raquo;</span></a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
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

export default ProductPagination;