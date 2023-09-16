import AccountNav from "../accountnav";
import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlaceImg from "../placeimg";
import { Link } from "react-router-dom";
export default function OrdersPage(){
   
   const [orders,setOrders]=useState([]);
   useEffect(()=>{
    axios.get('/orders').then(response=>{
         setOrders(response.data);
            });
   },[]);
    return(
        <div>
            <AccountNav/>
            <div>
                {orders?.length >0 && orders.map(order=>(
                 <>
                 <Link to={'/account/orders/'+order._id}/>
                  <div className="bg-red-500 text-white p-4 rounded-2xl mt-4 flex-justify-center">
                    <div className="flex gap-4 bg-gray-300 ">
                        <PlaceImg place={order.place}/>
                    </div>
                    <div>
                    From :{order.home_address}  
                    </div>
                    <div>
                    To:{order.contact_no}
                    
                    </div>
                    <div>
                    Total Price:${order.price}
                    </div>
                   <div>
                    No.Of Items:{order.items}
                   </div>
                   </div>
                   </>
                ))}
            </div>

        </div>
    );
}