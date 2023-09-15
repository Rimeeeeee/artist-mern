import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function IndexPage(){
    const [products,setProducts]=useState([]);
   useEffect(()=>{
    axios.get('/products').then(response=>{
        setProducts(response.data);
    });
   },[]);
   return(
    <div className="mt-8 grid  gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

    {products.length>0&&products.map(product=>(
              <Link to={'/products/'+product._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {product.photos?.[0]&&(
                     <img className='rounded-2xl object-contain ' src={'http://localhost:4000/uploads/'+product.photos?.[0]} alt=''/>
            )}
            </div>
            <h2 className="font-bold ">{product.owneraddress}</h2>
            <h3 className="text-sm text-gray-500 ">{product.title}</h3>
            
            <div className="mt-2">
              <span className="font-bold">${product.price} per night</span>
            </div>
            </Link>
    ))}
      </div>
    )
}