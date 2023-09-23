import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Accordion from "./accordian.jsx";

// import Footer from "../footer";
export default function IndexPage(){
    const [products,setProducts]=useState([]);
    const sections = [
      {
        title: '+ What is the concept behind "One District, One Product" (ODOP)?',
        content: " 'One District, One Product' (ODOP) is a development strategy that aims to promote and strengthen the rural economy in India. It was launched by the government of Uttar Pradesh, one of India's largest states, in 2018. The core concept behind ODOP is to identify and promote one unique product or craft from each district of the state. This product or craft is chosen based on the district's traditional expertise, resources, and skill sets."
        ,
      },
      {
        title: '+ Why should I use Artisan?',
        content: "a)Discover unique and culturally rich products. Our platform showcases one-of-a-kind items that you won't find anywhere else. b)We prioritize quality and authenticity. Each product on our platform is handcrafted with care and represents the rich heritage of the place it originated from.c)We are committed to the 'One District, One Product' initiative, which promotes economic growth and diversification at the district level. Your involvement directly supports this vision.d)Shopping on our website is easy and convenient. You can explore products from different districts, learn about their stories, and make a positive impact with every purchase.e)Our platform connects you with cottage industry products, no matter where you are in the world. Experience the beauty and culture of these regions from the comfort of your home.f)Be part of a movement that values local craftsmanship and sustainable living. Together, we can make a difference in the lives of artisans and the communities they belong to.",
      },
      {
        title: '+ Are the products on your website handmade?',
        content: " Yes, all the products featured on our website are handmade with care and craftsmanship. We take pride in promoting unique, handcrafted items that reflect our commitment to quality and creativity. Each product is made by skilled artisans who pour their passion and expertise into every piece. Thank you for supporting handmade craftsmanship!"
        ,
      },
      {
        title: '+ Can I learn more about the artisans and their stories?',
        content: " Yes, we believe in celebrating the artisans behind our handmade products. You can explore the inspiring stories and backgrounds of our talented artisans with every product. There, you'll discover the unique journeys, skills, and cultural influences that shape their creations. We're proud to share their stories with you as part of our commitment to transparency and the appreciation of craftsmanship."
        ,
      },
      {
        title: '+ Can I trust the quality of the products?',
        content: " Absolutely! At Artisan, we take quality seriously. We provide certificates of authentication for all our products, ensuring that you receive genuine and high-quality items. These certificates serve as a testament to the authenticity and craftsmanship of our offerings. We are committed to maintaining the highest standards, and our rigorous authentication process guarantees your satisfaction. Your trust in our products is of utmost importance to us."
        ,
      },
      {
        title: '+ Is there a return policy?',
        content: " Yes, we have a hassle-free return policy in place. We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with your order, please review our 'Return Policy' page for detailed information on how to initiate a return or exchange. We're here to assist you in making your shopping experience enjoyable and worry-free."
        ,
      },
      {
        title: '+ How do I contact your customer support team?',
        content: " a)Email:You can send us an email at [artisan2023@gmail.com] with your questions, concerns, or inquiries.b)Contact Form: You can also use the 'Contact Us' form on our website. Simply fill out the form with your details and message, and we'll get back to you promptly.We're committed to providing excellent customer service, and our team is ready to assist you with any questions or issues you may have."
        ,
      }
      // Add more sections as needed
    ];
  
   useEffect(()=>{
    axios.get('/products').then(response=>{
        setProducts(response.data);
    });
   },[]);
   return(
    <>
    <div className="mt-8 content-center grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1">
       
    {products.length>0&&products.map(product=>(
              <Link to={'/products/'+product._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {product.photos?.[0]&&(
                     <img className='rounded-2xl object-contain ' src={'http://localhost:4000/uploads/'+product.photos?.[2]} alt=''/>
            )}
            </div>
            {/* <h2className="font-bold overflow-hidden">{product.owneraddress}</h2> */} 
            <h3 className="text-xl font-semibold text-gray-700 ">{product.title}</h3>
            
            <div className="mt-2 flex flex-row items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z"/></svg>
              <span className="font-bold">{product.price}</span>
            </div>
            </Link>
    ))}
    {/* <Footer/> */}
    
    </div>
    <hr/>
    <div>
    <Accordion sections={sections}/>
    </div>
      </>
    )
}
