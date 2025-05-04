import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';


const Register = () => {
const [nameError , setNameError] = useState(" ");
  const {createUser , setUser, updateUser} = use(AuthContext)


  const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        if(name.length < 5){
            setNameError("Name Should be more then 5 character");
            return
        }else{
            setNameError(" ")
        }
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ name, email, photo, password });
        createUser(email, password)
        .then(result => {
            const user = result.user;
           
            updateUser({displayName: name , photoURL: photo }).then(() => {
                setUser({...user, displayName: name, photoURL: photo});
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                setUser(user)
            })
           
        })
        .catch((error) => {
           
            const errorMessage = error.errorMessage;
            alert(errorMessage)

        })
    };
    return (
         <div className='flex justify-center min-h-screen items-center'>
                  <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                   <h2 className='font-semibold text-2xl text-center'>Login your account</h2>
             <form onSubmit={handleRegister}  className="card-body">
               <fieldset  className="fieldset">
                 {/* name  */}
                 <label className="label">Name</label>
                 <input name='name' type="text" className="input" placeholder="Name" />

                 {nameError && <p className='text-xs text-error'>{nameError}</p>}
                 {/* Photo URL  */}
                 <label className="label">Photo URL</label>
                 <input name='photo' type="text" className="input" placeholder="Photo URL" />
                 {/* email  */}
                 <label className="label">Email</label>
                 <input name='email' type="email" className="input" placeholder="Email" />
                {/* password  */}
                <label className="label">Password</label>
                <input name='password' type="password" className="input" placeholder="Password" />

                 <div><a className="link link-hover">password</a></div>
                 <button type='submit' className="btn btn-neutral mt-4">Register</button>
       
                 <p className='font-semibold text-center pt-5'>
                   Already have an account? {" "} <Link className='text-secondary' to="/auth/login">Login</Link>
                 </p>
               </fieldset>
             </form>
           </div>
               </div>
    );
};

export default Register;