import moment from 'moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import './Order.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import OrderedProducts from './OrderedProducts';
function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue(); //*Our Data Layers used
  return (
    <div className="order">
      <h2>Order Summary</h2>
      {/* <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p> */}
      {/* <p className="order__id">
        <small>{order.id}</small>
      </p> */}
      {basket.map((item) => (
        <OrderedProducts
          id={item.id}
          title={item.title}
          imageSrc={item.imageSrc}
          price={item.price}
          rating={item.rating}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
    </div>
  );
}

export default Order;
