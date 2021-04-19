import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Footer from './Footer';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './Order';

const promise = loadStripe(
  'pk_test_51IeD9DSGcevQvo9hL74fwI0MlW3GwtKfLDnjlYo8SZ50jhBuuyfbC8ws6BXppwWR8VJWYI0JsuiNUMM2QHcYGRuP00YeMqsEby'
);

function App() {
  const [{ user, basket }, dispatch] = useStateValue();

  //* useEffect Hook  <<<<< Very Powerful (your bestf)
  //* Piece of code which runs based on a given condition

  useEffect(() => {
    //* STEP 2 : Add listener after redirecting after login or logout
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Login --> Push the user into the data layer
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        //Logout  --> Set the user to null
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  console.log('USER IS >>>>', user); //* Check for the user debugging technique

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            {/* Same as */}
            <ToastContainer />
          </Route>
          <Route path="/orders">
            <Header />
            <Order />
          </Route>
          <Route path="/login">
            <Login />
            <ToastContainer
              position="top-center"
              autoClose={700}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Route>
          {/*BOTTOM ONE IS THE DEFAULT ONE*/}
          {/*amazon.com/blabla --> anything other than route 
          by default will go to home page*/}
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
