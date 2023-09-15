import { Link,useLocation} from "react-router-dom";
export default function AccountNav(){
    const {pathname}=useLocation();
    let subpage=pathname.split('/')?.[2];
    if(subpage===undefined){
        subpage='profile';
    }
    function linkClasses(type=null){
        let classes= 'py-2 px-6';
        if(type===subpage){
            classes+='bg-primary text-primary rounded-full';
        }
        return classes;
    }
    return(
        <nav className="w-full flex  justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('orders')} to={'/account/orders'}>My Orders</Link>
                <Link className={linkClasses('products')} to={'/account/products'}>My Products</Link>
            </nav>
    );
}