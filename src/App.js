import React, {Component} from 'react';
import './App.css';
import { Switch , Route, Link } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import Content from "./components/Content";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var token = window.localStorage.getItem('access_token');
     return (
         <div>
                <Header/>
                <SideBar/>
             </div>
        );
    }
}

export default App;
