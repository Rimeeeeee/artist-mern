import {useContext,useState} from 'react';
import axios from'axios';
import {UserContext} from '../UserContext.jsx';
import {Link,Navigate,useParams} from 'react-router-dom';
import ProductsPage from './productspage.jsx';
import AccountNav from '../accountnav.jsx';
export default function AccountPage(){
    const[redirect,setRedirect]=useState(null);
    const {ready,user,setUser}=useContext(UserContext);
    let {subpage}=useParams();
    if(subpage===undefined){
        subpage='profile';
    }
    async function logout(){
       await  axios.post('/logout');
       
       setRedirect('/');
       setUser(null);
    }
    if(!ready){
        return 'Loading....';
    }
    if(ready&&!user&& !redirect)
    {
        return <Navigate to={'/login'}/>
    }
    
    
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div>
              <AccountNav/>
            {subpage==='profile'&&(
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={logout} className=" text-white p-2 w-full mt-2 rounded-2xl bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-300">Logout</button>
                    </div>
            )}
            {subpage==='places'&&(
                <ProductsPage/>
            )}
            </div>
    )
}