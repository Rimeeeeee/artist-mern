import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../bookingwidget.jsx";
//import Deletepage from "../delete.jsx";
export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/products/' + id).then(response => {
            setProduct(response.data);
        })
    }, [id]);
    if (!product) return '';
    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 ">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos Of {product.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-amber-200 hover:bg-amber-400 active:bg-amber-100 text-white shadow shadow-gray-500">Close Photos</button>
                    </div>
                    {product?.photos?.length > 0 && product.photos.map(photo => (
                        <div>
                            <img src={'http://localhost:4000/uploads/' + photo} alt="" className=" h-2/3 " />
                        </div>

                    ))}
                </div>
            </div>
        );
    }

    return (<>
        <h1 className="text-4xl flex font-bold bg-blue-200 m-4 p-2 rounded-full">{product.title}</h1>

        <div>
            <div className="flex flex-col items-center justify-center">
            <a className="flex gap-1 my-3 font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + product.owneraddress}>{product.owneraddress}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

            </a>
            <div className="flex gap-4 my-4 w-1/2 rounded-3xl overflow-hidden">
                <div className="object-cover w-80">
                    {product.photos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square relative top-2 cursor-pointer" src={'http://localhost:4000/uploads/' + product.photos[2]} alt="" />
                    )}
                </div>
                <div className="object-cover w-80">
                    {product.photos?.[3] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square relative top-2 cursor-pointer" src={'http://localhost:4000/uploads/' + product.photos[3]} alt="" />
                    )}
                </div>
                <div className="object-cover w-80">
                    {product.photos?.[4] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square relative top-2 cursor-pointer" src={'http://localhost:4000/uploads/' + product.photos[4]} alt="" />
                    )}
                </div>
            </div>
            <br/>
            <div className="flex gap-4 my-4 w-1/2 rounded-3xl overflow-hidden">
                <h1 className="font-bold text-2xl underline my-4">Prove of Authentication:</h1>
                <div className="object-cover w-80">
                    {product.photos?.[0] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square  cursor-pointer" src={'http://localhost:4000/uploads/' + product.photos[0]} alt="" />
                    )}
                </div>
                <div className="object-cover w-80">
                    {product.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square  cursor-pointer" src={'http://localhost:4000/uploads/' + product.photos[1]} alt="" />
                    )}
                </div>
            </div>
            </div>
            
            {/* right */}
            <div>
            <div className="my-4 flex justify-center items-center flex-col">
                    <h5 className="font-bold ">Unique Artisan No:{product.owner}</h5>
                    <h2 className="font-semibold text-3xl">District</h2>
                    <h2 className="font-bold text-lg "> {product.district}</h2>
                    <h2 className="font-semibold text-3xl  ">Description</h2>
                    <p className="w-2/3 text-right">{product.description}</p>
                    <h2 className="font-semibold text-3xl  ">History</h2>
                    <p className="w-2/3 text-right">{product.history}</p>
                    <h2 className="font-semibold text-3xl  ">Artist Authetic Proof</h2>
                    <p className="w-2/3 text-right">{product.artistauth}</p>

                    <h2 className="font-semibold text-3xl ">Artist History</h2>
                    <p className="w-2/3 ">{product.artistdes}</p>
                    <div className=""><b>Stock: {product.stock}</b><br />
                        <b>Catagory: {product.catagory}</b>
                        <b>{product.perks.length > 0 && (<ul><li>{product.perks[0]}</li><li>{product.perks[1]}</li><li>{product.perks[2]}</li></ul>)}</b>
                        <div className="mt-2 mb-4 text-sm text-gray-700 leading-8">

                        </div>
                    </div>
                    <BookingWidget product={product} />
                </div>
            </div>
        </div>


    </>
    );
}
