import { Link,useLocation} from "react-router-dom";
export default function AccountNav1(){
    const {pathname}=useLocation();
    let subpage=pathname.split('/')?.[2];
    if(subpage===undefined){
        subpage='profile';
    }
    function linkClasses(type=null){
        let classes= 'py-2 px-6';
        /*if(type===subpage){
            classes+='bg-primary text-primary rounded-full';
        }*/
        return classes;
    }
    return(
        <nav className="flex justify-center m-2 gap-2 nav_bar ">
            <div className="px-2 border-r border-gray-300"><Link className={linkClasses('products')} to={'/'}>Home</Link></div>
            <div className="px-2 border-r border-gray-300"><Link className={linkClasses('profile') } to={'/account'}>My Profile</Link></div> 
           <div className="px-2 border-r border-gray-300"><Link className={linkClasses('orders')} to={'/account/orders'}>My Orders</Link></div>     
          
            </nav>
    );
}
