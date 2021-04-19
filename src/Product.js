import React from 'react';
import './Product.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStateValue } from './StateProvider.js';

function Product({ id, title, imageSrc, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    //Add items to basket....
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        //We need all this details to be displayed on the basket
        id: id,
        title: title,
        imageSrc: imageSrc,
        price: price,
        rating: rating,
      },
    });
    toast.success('🛒Product added to cart!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {/* JS technqiue to show number of stars of the given number */}
          {Array(rating)
            // Create array with the rating no of elements in it
            .fill()
            //   Fill it with empty values in this array
            .map((_, i) => (
              //  _ means IDC what the value is
              //  Map that many no of stars
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={imageSrc} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
