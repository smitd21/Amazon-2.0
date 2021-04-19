import React from 'react';
import './Home.css';
import Product from './Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <div className="home">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg"
        alt=""
      />

      {/* Product id, title, price, rating, image */}
      <div className="home__row">
        <Product
          id="12321341"
          title="Think Like a Monk: Train Your Mind for Peace and Purpose Every Day"
          price={24.96}
          rating={5}
          imageSrc="https://images-na.ssl-images-amazon.com/images/I/41rsAHrKw1L._SX329_BO1,204,203,200_.jpg"
        />
        <Product
          id="90829333"
          title="2020 Apple MacBook Air with Apple M1 Chip(13-inch, 8GB RAM, 512GB SSD Storage) - Gold"
          price={789.98}
          rating={5}
          imageSrc="https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id="4903851"
          title="New Apple iPhone 12 mini (64GB, PRODUCT RED)"
          price={589.99}
          rating={4}
          imageSrc="https://m.media-amazon.com/images/I/71Sa8+9H3xL._FMwebp__.jpg"
        />
        <Product
          id="95445931"
          title="Apple iPhone 11 (128GB, PRODUCT Blue)"
          price={475}
          rating={5}
          imageSrc="https://m.media-amazon.com/images/I/71Dh+NR7ivL._AC_UY327_FMwebp_QL65_.jpg"
        />
        <Product
          id="3254354346"
          title="Samsung Galaxy S21 Ultra 5G  Camera, 8K Video, 108MP High Res | 128GB, Phantom Black"
          price={999}
          rating={4}
          imageSrc="https://m.media-amazon.com/images/I/61O45C5qASL._AC_UY327_FMwebp_QL65_.jpg"
        />
        <Product
          id="3254354345"
          title="OnePlus 8T Aquamarine Green, 5G Unlocked Android Smartphone U.S. Version, 256GB Storage + 12GB RAM, 120Hz Fluid Display, Quad Camera"
          price={598.99}
          rating={4}
          imageSrc="https://m.media-amazon.com/images/I/71xOScdmmAL._AC_UY327_FMwebp_QL65_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id="4903850"
          title="New Apple Watch Series 6 (GPS, 40mm) - Blue Aluminum Case with Deep Navy Sport Band"
          price={199.99}
          rating={5}
          imageSrc="https://m.media-amazon.com/images/I/71bf9IpGjtL._AC_UY327_FMwebp_QL65_.jpg"
        />
        <Product
          id="3254354347"
          title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
          price={598.99}
          rating={4}
          imageSrc="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
        />
        <Product
          id="23445930"
          title="Audio-Technica ATH-M50xBB Limited Edition Professional Studio Monitor Headphones, Blue"
          price={249.99}
          rating={5}
          imageSrc="https://m.media-amazon.com/images/I/81iL0RHE+OL._AC_UY327_FMwebp_QL65_.jpg"
        />
        <Product
          id="3254354378"
          title="Skytech Chronos Mini Gaming PC Desktop - AMD Ryzen 3 3100, NVIDIA GTX 1650 Super 4GB, 8GB DDR4, 500GB SSD, A320 Motherboard, 550 Watt Bronze"
          price={1059.99}
          rating={5}
          imageSrc="https://m.media-amazon.com/images/I/916AGUlFsrL._AC_SS450_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id="90829332"
          title="Samsung LED 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
          price={1094.98}
          rating={4}
          imageSrc="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
        />
        <Product
          id="49538094"
          title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
          price={239.0}
          rating={4}
          imageSrc="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
        />
      </div>
    </div>
  );
}
export default Home;
