import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CelebrityList from "./components/CelebrityList";
import CelebrityCreate from "./components/CelebrityCreate";
import Modal from 'react-modal';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
    }
    openModal = () => {
        this.setState({modalIsOpen: true});
    }
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    onClose = () => {
        this.closeModal();
        window.parent.location = window.parent.location.href;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <button  className="btn btn-primary my-2" onClick={this.openModal}>Add new celebrity</button>


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"

                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 ref={subtitle => this.subtitle = subtitle} className="modal-title" id="exampleModalLabel">Add new celebrity</h2>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <CelebrityCreate/>

                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClose}>close</button>

                            </div>
                        </div>
                    </div>
                </Modal>
                <CelebrityList/>
            </div>
        );
    }
}

export default App;
