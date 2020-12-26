import React from 'react'
import ImageHelper from './helper/ImageHelper';
const Card = ({
    product,
    AddtoCart = true,
    removeFromCart = false,
}) => {

    const cardTitle = product ? product.name :"Photo from pexels";
    const cardDescription = product ? product.description :"Default description";
    const cardPrice = product ? product.price :"DEFAULT";



    const showAddToCart = () => {
        return(
            AddtoCart && (
                <button
                onClick={() => {}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        )

    }
    const showRemoveFromCart = removeFromCart => {
        return(
            removeFromCart && (
                <button
                    onClick={() => {}}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
            )
        )
        
    }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
              <ImageHelper product={product} />
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">{cardPrice}</p>
              <div className="row">
                <div className="col-12">
                 {showAddToCart(AddtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
};
export default Card
