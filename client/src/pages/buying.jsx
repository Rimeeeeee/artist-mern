import { useParams } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
export default function BuyingPage(){
    const [redirect,setRedirect]=useState('');
    const {id}=useParams();
    function homereturn(){
        setRedirect('/account');
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div className="text-primary p-10 mt-2 mb-4">
        <div>Booking Id :{id}</div>
        <h2>Your Booking Is Successfull!</h2>
        <button onClick={homereturn} className="bg-primary text-white p-2 mt-4 rounded-2xl shadow">Back</button>
        </div>
    );
}