import React from "react";

class CelebrityCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [{
            name: '',
            image_url: '',
            description: '',}],
            modalIsOpen: false
        };

        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

        handleChangeName = (e) => {
            this.setState({
                name: e.target.value
            })
        }

        handleChangeImage = (e) => {
            this.setState({
                image_url: e.target.value
            })
        }

        handleChangeDescription = (e) => {
            this.setState({
                description: e.target.value
            })
        }


    handleSubmit = (e) => {
        e.preventDefault()
        fetch("https://tuan05-1560266.herokuapp.com/api/celebrities",
            {
                credentials: 'omit',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': this.state.name,
                    'image_url': this.state.image_url,
                    'description': this.state.description
                }),
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer',// *client, no-referrer

            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,

                    });

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

    }

        // handleSubmit = (e) => {
    //     e.preventDefault()
    //     let url = "http://localhost:3001/api/celebrities"
    //     const data = {
    //         name: this.state.name,
    //         image_url: this.state.image_url,
    //         description: this.state.description
    //     }
    //     axios.post(url, data)
    //         .then(response => {
    //             this.props.history.push('/users')
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // }

    render() {
        return (
            <div id = "created">
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    {<input type="text" className="form-control" value={this.state.name} id="name" name="name" onChange={this.handleChangeName} />}
                </div>
                <div className="form-group">
                    <label htmlFor="image-link">Image link</label>
                    <input type="text" className="form-control" value={this.state.image_url} name="image_url"
                           id="image-link" onChange={this.handleChangeImage} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" value={this.state.description} id="description"
                           name="description" onChange={this.handleChangeDescription}  />
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" id="add-celebrity"
                        onClick={this.handleSubmit} >Add</button>
                </div>
            </div>
            </div>
        );

    }


}

export default CelebrityCreate;
