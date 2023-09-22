import PhotosUploader from "../photosuploader.jsx";
import Perks from '../perkslabel.jsx';
import Catagory from "D:/hdd/CODES/Programming/HTML/hackHeritage/artist-mern/client/catagorylabel.jsx";
import { useState,useEffect } from "react";
import { Navigate,useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../accountnav.jsx";
export default function ProductsFormPage(){
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [owneraddress,setOwnerAddress]=useState('');
    
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [catagory,setCatagory]=useState('');
    const [stock,setStock]=useState(0);
    const[history,setHistory]=useState('');
    const[artistdes,setArtistdes]=useState('');
    const[district,setDistrict]=useState('');
    const [price,setPrice]=useState(100);
    const[redirect,setRedirect]=useState(false);
    useEffect(()=>{
           if(!id){
            return;
           }
           axios.get('/products/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title);
            setOwnerAddress(data.owneraddressaddress);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setCatagory(data.catagory);
            setStock(data.stock);
            setArtistdes(data.artistdes);
            setDistrict(data.district);
            setHistory(data.history);
            setPrice(data.price);
           })
    },[id]);
    async function addNewProduct(ev){
        ev.preventDefault();
        const productData={
            title,owneraddress,addedPhotos,description,perks,catagory,price,stock,district,history,artistdes
        }
        if(id){
            await  axios.put('/products',{id,...productData});
            setRedirect(true);
        }
        else
        {
            await  axios.post('/products',productData);
            setRedirect(true);
        }
        
   }
   if(redirect){
    return <Navigate to={'/account/products'}/>
   }
    return(
        <div > 
                 <AccountNav/>
                <form onSubmit={addNewProduct} >
                    <h2 className='text-2xl mt-4'>Title</h2>
                    <p className='text-gray-500 text-sm'>Title for your product.</p>
                    <input className='w-full border my-2 py-2 px-3 rounded-2xl' type='text' value={title} onChange={ev=>setTitle(ev.target.value)}placeholder='title, for eg:Kashmir famous saffron'/>
                    
                    <h2 className='text-2xl mt-4'>Address Of Store</h2>
                    <p className='text-gray-500 text-sm'>Where is the store located.</p>
                    <input className='w-full border my-2 py-2 px-3 rounded-2xl' type='text'  value={owneraddress} onChange={ev=>setOwnerAddress(ev.target.value)}placeholder='Srinagar,Jammu & Kashmir'/>
                    <h2 className='text-2xl mt-4'>District</h2>
                    <p className='text-gray-500 text-sm'>District Of The product.</p>
                    <input className='w-full border my-2 py-2 px-3 rounded-2xl' type='text' value={district} onChange={ev=>setDistrict(ev.target.value)}placeholder='District Of The Product'/>
                    
                    <h2 className='text-2xl mt-4'>Photos</h2>
                    <p className='text-gray-500 text-sm'>Showcase Product</p>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    
                    <h2 className='text-2xl mt-4'>Description</h2>
                    <p className='text-gray-500 text-sm'>Description of the product</p>
                    <textarea className='w-full border my-2 py-2 px-3 rounded-2xl'  value={description} onChange={ev=>setDescription(ev.target.value)}/>
                    <h2 className='text-2xl mt-4'>History Of Product</h2>
                    <p className='text-gray-500 text-sm'>The rich cultural association of product</p>
                    <textarea className='w-full border my-2 py-2 px-3 rounded-2xl'  value={history} onChange={ev=>setHistory(ev.target.value)}/>
                    
                    <Perks selected={perks} onChange={setPerks}/>
                    
                    
                    <Catagory selected={catagory} onChange={setCatagory}/>
                    
                    <h2 className='text-2xl mt-4'>Stock</h2>
                    <p className='text-gray-500 text-sm'>Provide stock</p>
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div className='mt-2 -mb-1'>
                            <h3>Stock</h3>
                            <input type='number' value={stock} onChange={ev=>setStock(ev.target.value)} placeholder='1'/>
                        </div>
                        
                        <div className='mt-2 -mb-1'>
                        <h3>Price </h3>
                            <input type='number'  value={price} onChange={ev=>setPrice(ev.target.value)} placeholder='100'/>
                        </div>
                        <br/>
                        
                      
                    
                    </div>
                    <div className="flex flex-col items-center my-6 justify-center">
                            
                        <h2 className='text-2xl mt-4'>Artist Description</h2>
                    <p className='text-gray-500 text-sm '>Description of the artist</p>
                    <textarea className='w-full border my-2 py-2 px-3 rounded-2xl'  value={artistdes} onChange={ev=>setArtistdes(ev.target.value)}/>
                    
                        </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-300 px-8 py-2  text-white rounded-full my-6">Save</button>
                </form>
                </div>
    )
}