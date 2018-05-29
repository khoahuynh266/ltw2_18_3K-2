import React from 'react'
import { Link } from 'react-router-dom';
import Error from "../error"
import UserList from "./UserList";
import UserAdd from "./UserAdd"


class AllUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: 0
        }
    }

    Logout() {
        window.localStorage.removeItem("access_token"); // remove token là access token
        document.location.href = "http://localhost:3000/"; // chuyển về trang index
    }

    render() {
        var token = window.localStorage.getItem('access_token');
        if (!token) {
            return (
                <Error/>
            )
        }
        else {
            return (
                    <section className="content-header">
                        <h3 className=" fontcolor text-center">Quản lý người dùng</h3>
                        <p className="text-center"><UserAdd handleAfterAdd={this.handleAfterAdd}/></p>
                        <div className="hover-yellow">
                            <UserList/>

                        </div>
                    </section>

            );
        }
    }
}

export default AllUser

