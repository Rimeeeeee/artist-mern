import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
export default function registerpage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    async function registerUser(ev){
           ev.preventDefault();   
           try{
            await axios.post('/register',{
                name,
                email,
                password
            });
            alert('Registration Successful.Now you can login');
           } 
           catch(e){
                      alert('Registration failed.Please try again later.');
           }
       
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>
            <input type="text" className="w-full border my-2 py-2 px-3 rounded-2xl"placeholder='username' value={name} onChange={ev=>setName(ev.target.value)}/>
                <input type="email" className="w-full border my-2 py-2 px-3 rounded-2xl"placeholder='you@email.com' value={email} onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" className="w-full border my-2 py-2 px-3 rounded-2xl"placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
                <button className="bg-primary p-2 w-full text-white rounded-2xl">Register</button>
                <div className='text-center py-2 text-gray-500'>
                    Already an Member?
                    <Link className="underline text-black" to={'/login'}>
                        Login
                        </Link>
                        </div>
            </form>
            </div>
        </div>
    );
}