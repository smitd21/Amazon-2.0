import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import SubmitButton from './SubmitButton';
import styled from '@emotion/styled';
import Row from './Row';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #2f5d62;
  color: #fff;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

function Payment({ price, onSuccssfulCheckout }) {
  const [{ basket, user }, dispatch] = useStateValue(); //*Our Data Layers used
  const history = useHistory();

  //* Two powerful hooks to implement our Stripe
  const stripe = useStripe();
  const elements = useElements();

  //state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState();
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  useEffect(() => {
    //Create PaymentIntent as soon as the page loads
    //!Important snippet
    //*whenever the basket(dependency) changes it will make this request
    //*and it will update the special stripe secret which allows us to charge a customer the correct amount

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        //Stripe expects the total in a currencies subunits
        //If  dollars it expects you to pass the total amount in cents (thats why *100)
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log('THE SECRET IS >>>', clientSecret);

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    setDisabled(event.empty); //if event empty go ahead and disable the button
    setError(event.error ? event.error.message : ''); //if error show error otherwise nothing
  };

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);
    dispatch({
      type: 'EMPTY_BASKET',
    });
    setSucceeded(true);
    setError(null);
    toast.success('🚀 Payment Successfull!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push('/orders');

    const cardElement = elements.getElement('card');

    try {
      const { data: clientSecret } = await axios.post('/api/payment_intents', {
        amount: price * 100,
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      console.log(paymentMethodReq);

      if (paymentMethodReq.error) {
        setError(paymentMethodReq.error.message);
        setProcessing(false);
        return;
      }
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }
    } catch (err) {}
  };

  const iframeStyles = {
    base: {
      color: '#fff',
      fontSize: '16px',
      iconColor: '#fff',
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
    complete: {
      iconColor: '#cbf4c9',
    },
  };

  const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
  };
  const notify = () => {};

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to={'/checkout'}>{basket?.length} items</Link>)
        </h1>
        {/* Payment srction - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
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
        </div>
        <div className=" payment__section">
          <div className="payment__title " role="alert">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form className="Form" onSubmit={handleSubmit}>
              {/* <Row>
                <BillingDetailsFields />
              </Row> */}
              <Row>
                <CardElementContainer>
                  <CardElement
                    options={cardElementOpts}
                    onChange={handleChange}
                  />
                </CardElementContainer>
              </Row>
              <Row>
                {/* TIP always disable your submit button while processing payments */}
                <SubmitButton
                  onClick={handleSubmit}
                  disabled={processing || disabled || succeeded}
                >
                  {processing
                    ? 'Payment Done'
                    : `Pay $${getBasketTotal(basket)}`}
                </SubmitButton>
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </Row>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
