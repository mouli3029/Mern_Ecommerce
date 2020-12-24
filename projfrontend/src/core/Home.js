import React from 'react';
import '../styles.css';
import {API} from '../backend';


function Home() {
    console.log("API is",API);
    return (
        <div>
            <h1 className="text-white">Hello front end</h1>
        </div>
    )
}

export default Home
