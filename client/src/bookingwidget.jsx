
import { useContext, useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
export default function BookingWidget({product}){
    const [home_address,setHome_address]=useState('');
    const[contact_no,setContact_no]=useState('');
    const[items,setItems]=useState(1);
    
    const [redirect,setRedirect]=useState('');
    
   async function buyThisProduct(){
        const response=await axios.post('/orders',{home_address,contact_no,items,place:place._id,price:items*product.price});
        const orderId=response.data._id;
        setRedirect('/account/orders/'+orderId);
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div className="my-4 rounded-2xl p-2 text-primary">
        <div className="text-2xl">
       <b> Price: $ {product.price}</b>
       </div>
    
    <div className="my-4 bg-gray-100 text-black">
        <label>Home Address:</label>
        <input type="text" value={home_address} onChange={ev=>setHome_address(ev.target.value)}/>
    </div>
    <div className="my-4 bg-gray-100 text-black">
        <label>Contact No:</label>
        <input type="text"value={contact_no} onChange={ev=>setContact_no(ev.target.value)}/>
    </div>
    <div className="my-4 bg-gray-100 text-black">
        <label>No.of Items:</label>
        <input type="number" value={items} onChange={ev=>setItems(ev.target.value)}/>
    </div>
    
     <div className="text-xl">
     <button onClick={buyThisProduct} className="mt-2 p-2 text-white rounded-2xl shadow bg-green-500 hover:bg-green-400 active:bg-green-600">
        Buy This Product
        {items>0 && (
            <span> For ${items*product.price}</span>
        )}
        </button>
        </div>

        </div>
    );
}