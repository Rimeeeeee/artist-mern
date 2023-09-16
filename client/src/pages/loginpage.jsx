import {Link,Navigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
export default function loginpage(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[redirect,setRedirect]=useState(false);
   const {setUser}= useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
           const {data}= await axios.post('/login',{email,password});
           setUser(data);
            alert('Login successful');
            setRedirect(true);

        }
        catch(e){
            alert('Login failed.');
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>;
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto "onSubmit={handleLoginSubmit}>
                <input type="email" className="w-full border my-2 py-2 px-3 rounded-2xl"placeholder='you@email.com' value={email} onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" className="w-full border my-2 py-2 px-3 rounded-2xl"placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
                <button className="bg-sky-600 active:bg-blue-400 hover:bg-sky-500 p-2 w-full text-white rounded-2xl">Login</button>
                <div className='text-center py-2 text-gray-500'>
                    Don't have an account yet?
                    <Link className="underline text-black" to={'/register'}>
                        Register now
                        </Link>
                        </div>
            </form>
            </div>
        </div>
    );
}