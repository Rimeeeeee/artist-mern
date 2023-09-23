import AccountNav1 from "../accountnav1";
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
            <AccountNav1/>
            <div>
                {orders?.length >0 && orders.map(order=>(
                 <>
                 <Link to={'/account/orders/'+order._id}/>
                  <div className="bg-indigo-500 text-white p-4 rounded-2xl mt-4 mb-10 flex-justify-center">
                    <div className="flex gap-4 bg-gray-300 ">
                        
                    </div>
                    <div>Order id:{order._id}</div>
                    <div>
                    Shipping Address :{order.home_address}  
                    </div>
                    <div>
                     Contact Number:{order.contact_no}
                    
                    </div>
                    <div>
                    Price:&#8377;{order.price}
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
