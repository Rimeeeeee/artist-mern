import { Navigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import BookingWidget from "../bookingwidget.jsx";
//import Deletepage from "../delete.jsx";
export default function ProductPage(){
    const {id}=useParams();
    const [product,setProduct]=useState(null);
    const [showAllPhotos,setShowAllPhotos]=useState(false);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/products/'+id).then(response=>{
                setProduct(response.data);
        })
    },[id]);
    if(!product) return '';
    if(showAllPhotos)
    {
        return(
          <div className="absolute inset-0 ">
            <div className="p-8 grid gap-4">
                <div>
                   <h2 className="text-3xl mr-48">Photos Of {product.title}</h2>
                    <button onClick={()=>setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-amber-200 hover:bg-amber-400 active:bg-amber-100 text-white shadow shadow-gray-500">Close Photos</button>
                </div>
           {product?.photos?.length>0 && product.photos.map(photo=>(
            <div>
                <img src={'http://localhost:4000/uploads/'+photo} alt="" className=" h-2/3 "/>
            </div>
            
           ))}
            </div>
            </div>
        );
    }

    return(<>
    
  
        <h1 className="text-3xl font-bold bg-blue-200 m-4 p-2 rounded-full">{product.title}</h1>
        <div className="mt-4 mx-2 px-2 py-8 flex">
            
            
            <div>
            
            <a className="flex gap-1 my-3 font-semibold underline"target="_blank" href={'https://maps.google.com/?q='+product.owneraddress}>{product.owneraddress}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

</a>
             <div className="relative">
             <div className="flex gap-2 rounded-3xl overflow-hidden">
                <div>
                    {product.photos?.[0]&&(
                        <img onClick={()=>setShowAllPhotos(true)}className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/'+product.photos[0]} alt=""/>
                    )}
                </div>
                <div className="grid">
                    {product.photos?.[1]&&(
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/'+product.photos[1]} alt=""/>
                    )}
                
                    <div className="overflow-hidden">
                    {product.photos?.[2]&&(
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square object-cover relative top-2 cursor-pointer" src={'http://localhost:4000/uploads/'+product.photos[2]} alt=""/>
                    )}
                    </div>
                </div>
             </div>
        </div>
        <button onClick={()=>setShowAllPhotos(true)}className=" flex gap-1 bottom-2  right-2 my-2 px-2 py-4 bg-amber-200 hover:bg-amber-400 active:bg-amber-100 rounded-2xl text-primary shadow shadow-md shadow-primary">Show More Photos</button>
            </div>
            
        <div className="mr-0">
        <div className="my-4 mr-0">
        <h2 className="font-semibold text-2xl mr-0 ">District</h2>
            {product.district}
            <h2 className="font-semibold text-2xl mr-0 ">Description</h2>
            {product.description}
            <h2 className="font-semibold text-2xl mr-0 ">History</h2>
            {product.history}
            <h2 className="font-semibold text-2xl mr-0 ">Artist History</h2>
            {product.artistdes}
            </div>
            <div className="grid grid-cols-[2fr_1fr] ">
                 <div><b>Stock: {product.stock}</b><br/>
                 <b>Catagory: {product.catagory}</b>
                 <b>{product.perks.length>0&&(<ul><li>{product.perks[0]}</li><li>{product.perks[1]}</li><li>{product.perks[2]}</li></ul>)}</b>
                 <div className="mt-2 mb-4 text-sm text-gray-700 leading-8">
                 
                    </div>
                   <BookingWidget product={product}/>
                   
                 </div>
                 
            </div>
            </div>
        </div>
        </>
    );
}