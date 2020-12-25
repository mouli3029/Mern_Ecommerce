import React from 'react';
import {Link,withRouter} from 'react-router-dom';


const Menu=() => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">A. DashBoard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">SignIn</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Sign out</Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Menu);
