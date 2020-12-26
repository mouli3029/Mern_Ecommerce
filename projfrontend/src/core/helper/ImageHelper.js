import React from 'react'
import { API } from '../../backend'



const ImageHelper=({product}) => {
    const imageUrl = product
     ? `${API}/product/photo/${product._id}` 
    : `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png` ;
    return (
        <div>
            <div className="rounded border border-success p-2">
                <img
                  src={imageUrl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
              </div>
        </div>
    )
}

export default ImageHelper
