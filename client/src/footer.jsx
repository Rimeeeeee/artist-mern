import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext.jsx';

export default function Footer(){
  const {user}=useContext(UserContext);
      return(
        <footer className=" text-white py-5 bg-indigo-900 mt-16 rounded-lg ">
      <div className="container">
        <div className="row flex gap-4 items-center justify-evenly">
          <div className="col-lg-3 col-md-6 mb-lg-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-lg-0">
            <h5 className="text-uppercase">Categories</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/men">Men</a>
              </li>
              <li>
                <a href="/women">Women</a>
              </li>
              <li>
                <a href="/kids">Kids</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-lg-0">
            <h5 className="text-uppercase">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/shipping">Shipping</a>
              </li>
              <li>
                <a href="/returns">Returns</a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
      <div className="text-center py-3">
      <div className="col-lg-3 col-md-6 mb-2 mb-lg-0">
            <h5 className="text-uppercase">Connect with Us</h5>
            <p>Follow us on social media for the latest updates and promotions.</p>
            
          </div>
        &copy; {new Date().getFullYear()} Your Clothing Brand. All rights reserved.
      </div>
      </footer>
      )
}