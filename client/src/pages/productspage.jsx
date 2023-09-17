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
            
            <div className='mt-4 gap-4 h-10 w-1/3 inline-block '>
                {products.length>0&&products.map(product=>(
                    <Link to={'/account/products/'+product._id} >
                        <div className=' border-4 rounded-md border-slate-500 '>
                            {product.photos.length>0 &&(
                                <img className='object-cover 'src={'http://localhost:4000/uploads/'+product.photos[0]} alt=""/>
                            )}
                        </div>
                  
                        <h2 className='text-2xl font-bold'>{product.title}</h2>
                        <p className='text-lg m-4 mt-1 font-semibold'>{product.description}</p>
                   
                    </Link>
                ))}
            </div>
        </div>
    )
}