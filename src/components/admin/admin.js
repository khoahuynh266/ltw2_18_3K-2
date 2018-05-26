
import React, {Component} from 'react';

import AllUser from "./AllUser";


import { Switch, Route } from 'react-router-dom'


const  Admin =() =>
    (
        <Switch>
            <Route exact path = "/user" component={AllUser}/>
        </Switch>
    );
export default Admin
