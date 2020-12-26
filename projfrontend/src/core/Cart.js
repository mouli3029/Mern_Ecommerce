import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import PaymentB from "./PaymentB";

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        setProducts(loadCart());
    }, [reload])

    const loadAllProducts = (products) => {

        return(
            <div>
                <h2>This section is to load pridcts</h2>
                {products.map((product,index)=>(
                    <Card 
                      key = {index}
                      product = {product}
                      AddtoCart = {false}
                      removeFromCart = {true}
                      setReload={setReload}
                      reload = {reload}
                    />
                ))}
            </div>
        )
    }
    const loadCheckout = () =>{
        return(
            <div>
               <PaymentB products ={products} setReload={setReload}/>
            </div>
        )
    }

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
          <div className="col-6">{products.length>0 ? loadAllProducts(products):(<h3>No Products in Cart</h3>)}</div>
          <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
}
