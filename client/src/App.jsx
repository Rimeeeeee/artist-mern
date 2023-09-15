import './App.css'
import {Route,Routes} from 'react-router-dom';
import IndexPage from './pages/indexpage.jsx';
import LoginPage from './pages/loginpage.jsx';
import RegisterPage from './pages/registerpage.jsx';
import AccountPage from './pages/account.jsx';
import Layout from './layout';
import axios from 'axios';
import { useEffect } from 'react';
import { UserContextProvider } from './UserContext.jsx';
import ProductsPage from './pages/productspage.jsx';
import ProductsFormPage from './pages/productsformpage.jsx';
import ProductPage from './pages/productpage.jsx';
import OrdersPage from './pages/orderspage.jsx';
import BuyingPage from './pages/buying.jsx';
axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;
function App() {
  

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/account" element={<AccountPage/>}/>
      <Route path="/account/products" element={<ProductsPage/>}/>
      <Route path="/account/products/new" element={<ProductsFormPage/>}/>
      <Route path="/account/products/:id" element={<ProductsFormPage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/>
      <Route path="/account/orders" element={<BuyingPage/>}/>
      <Route path="/account/orders/:id" element={<OrdersPage/>}/>
        </Route>
      
    </Routes>
    </UserContextProvider>
    
  )
}

export default App
