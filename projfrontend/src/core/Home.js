import React,{useState,useEffect}from 'react';
import '../styles.css';
import {API} from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';




function Home() {
    const [products, setProducts] = useState([]);
    const [error,setError] =  useState(false);

    const loadAllproducts = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                setProducts(data);
            }
        })
    }
    useEffect(() => {
        loadAllproducts()
    }, [])
    return (
        <Base title="Home Page" description="Welcome to Tshirt Store">
           <div className="row">
              <h1 className='text-white'>All of Tshirts</h1>
              <div className="row">
                  {products.map((product,index)=>{
                      return(
                          <div key ={index} className="col-4 mb-4">
                              <Card product={product}/>

                        </div>
                      )
                  })}
              </div>
           </div>
        </Base>
          
    )
}

export default Home
