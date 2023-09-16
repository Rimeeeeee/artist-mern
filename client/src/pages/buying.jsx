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
        <button onClick={homereturn} className="bg-indigo-800 hover:bg-indigo-400 active:bg-indigo-600 text-white px-8 py-2 mt-4 rounded-2xl shadow font-bold">Back</button>
        </div>
    );
}