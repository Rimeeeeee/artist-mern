import { useContext, useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
export default function BookingWidget({product}){
    const [sender,setSender]=useState('');
    const[reciever,setReciever]=useState('');
    const[items,setItems]=useState(1);
    
    const [redirect,setRedirect]=useState('');
    
   async function buyThisProduct(){
        const response=await axios.post('/orders',{sender,reciever,items,place:place._id,price:items*product.price});
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
        <label>Sender:</label>
        <input type="text" value={sender} onChange={ev=>setSender(ev.target.value)}/>
    </div>
    <div className="my-4 bg-gray-100 text-black">
        <label>Reciever:</label>
        <input type="text"value={reciever} onChange={ev=>setReciever(ev.target.value)}/>
    </div>
    <div className="my-4 bg-gray-100 text-black">
        <label>No.of Items:</label>
        <input type="number" value={items} onChange={ev=>setItems(ev.target.value)}/>
    </div>
    
     <div className="text-xl">
     <button onClick={buyThisProduct} className="mt-2 p-2 bg-primary text-white rounded-2xl shadow">
        Buy This Product
        {items>0 && (
            <span> For ${items*product.price}</span>
        )}
        </button>
        </div>

        </div>
    );
}