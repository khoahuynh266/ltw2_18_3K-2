import React from 'react'
import { Link } from 'react-router-dom'

const Err = () => (
    <div>

        <h4 className="text-center bold size24 margin0auto">
            <p> <h1>Error!!!</h1></p>
            <img src="https://www.cheatsheet.com/wp-content/uploads/2016/06/Astonished-face-emoji-meanings.png?x23912" className="err"/>
            <p> <h3>Something went wrong.</h3></p>
            <Link to="/home/login">Back to login</Link>
        </h4>

    </div>
)

export default Err