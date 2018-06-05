
import { Switch, Route } from 'react-router-dom'
import React, {Component} from 'react';
import AllProducts from "./product/AllProducts";
import AllUser from "./admin/AllUser";
import login from "./login";
import register from "./register";
export default class Content extends Component {
    render(){
        return (

            <div className="content-wrapper">
                <Switch>
                    <Route exact path = "/product" component={AllProducts}/>
                    <Route exact path = "/user" component={AllUser}/>
                    <Route exact path = "/login" component={login}/>
                    <Route exact path = "/register" component={register}/>
                    <Route exact path = "/" component={AllProducts}/>
                </Switch>
            </div>

        )
    }
}