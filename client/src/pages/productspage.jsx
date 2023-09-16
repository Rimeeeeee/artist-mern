import {Link,useParams}from 'react-router-dom';
import AccountNav from '../accountnav.jsx';
import { useEffect,useState } from 'react';
import axios from 'axios';
export default function ProductsPage(){
   const [products,setProducts]=useState([]);
   useEffect(()=>{
    axios.get('/user-products').then(({data})=>{
          setProducts(data);
    });
   },[]);
    
    
   
    return(
        <div>
            <AccountNav/>
            
                <div className='text-center'>
                    
                <Link className=' inline-flex text-white py-2 px-6 rounded-full bg-blue-600 hover:bg-blue-400 font-semibold' to={'/account/products/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        
        Add new product</Link>
                </div>
            
            <div className='mt-4'>
                {products.length>0&&products.map(product=>(
                    <Link to={'/account/products/'+product._id} className='flex cursor-pointer gap-4 p-4 rounded-2xl bg-blue-500'>
                        <div className=' flex w-32 h-32 bg-gray-300 grow shrink-0'>
                            {product.photos.length>0 &&(
                                <img className='object-cover'src={'http://localhost:4000/uploads/'+product.photos[0]} alt=""/>
                            )}
                        </div>
                        <div className='grow-0 shrink'>
                        <h2 className='text-xl'>{product.title}</h2>
                        <p className='text-sm mt-2'>{product.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}