import React from 'react';
import '../styles.css';
import {API} from '../backend';
import Base from './Base';
import Card from './Card';




function Home() {
    console.log("API is",API);
    return (
        <Base title="Home Page" description="Welcome to Tshirt Store">
           <div className="row">
               <div className="col-4 text-center">
                  <Card/>
               </div>
               <div className="col-4">
                   <button className='btn-success'>Test</button>
               </div>
               <div className="col-4">
                   <button className='btn-success'>Test</button>
               </div>
           </div>
        </Base>
          
    )
}

export default Home
