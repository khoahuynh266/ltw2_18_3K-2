import React from 'react'
import {withRouter} from 'react-router-dom';
import Error from "../error"
import OderList_DS from "./OderList_DS";


class OderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: 0
        }
    }

    Logout() {
        window.localStorage.removeItem("access_token"); // remove token là access token
        this.props.history.push("/"); // chuyển về trang index
    }

    render() {
        // var token = window.localStorage.getItem('access_token');
        // if (!token) {
        //     return (
        //         <Error/>
        //     )
        // }
        // else {
            return (
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title fontcolor text-center">Quản lý đơn hàng</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <p style={{margin: 15, border:1 ,solid :'black'}}>
                                        <div className="hover-yellow">
                                                <OderList_DS/>
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
                </section>

            );
        //}
    }
}

export default withRouter(OderList);