"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';
import  Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaEyeSlash, FaEye, FaGoogle } from "react-icons/fa";


const Login:React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailButtonClick = () => {
    setShowEmailForm((prevMode) => !prevMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    console.log('Submitting form:', formData);
  };

  return (
    <>
   <Layout>
      <div className='bg-login z-50'>
      <Navbar showSignIn={false} showRegister={true} showHome={true} />
     <div className="flex z-20 items-center justify-center">
        <div className="mt-12 font-fam p-8 rounded-xl shadow-2xl">
         
          <CgProfile className='text-6xl max-w-full m-auto font-bold mb-7'/>

          <div className="mb-4">
            <button
            style={{ borderRadius: '50px', border: `1px solid white` }}
              onClick={handleEmailButtonClick}
              className="sign-in-w text-lg mt-3 w-96 font-semibold p-3 hover:bg-red-600 focus:outline-none"
            >
              <svg className='mr-3 h-5 inline pb-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#dadfe7" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
             
               Sign in with Email
            </button>
            {showEmailForm && (
              <form className="space-y-4 mt-10 mb-10" onSubmit={handleSubmit}>
                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                  <MdEmail className='ml-2 inline h-8 pb-0.5'/>
                   
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ borderRadius: '50px', border: `1px solid white` }}
                    placeholder="Enter your email.."
                    className="sign-in-w bg-transparent mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                    required
                  />
                  
                </div>

                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                  <FaLock className='ml-2 inline h-5 pb-1'/>
              
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{ borderRadius: '50px', border: `1px solid white` }}
                    placeholder="Enter password.."
                    className="bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                   type="button"
                   onClick={togglePasswordVisibility}
                   className="absolute right-8"
                    >
                   {showPassword ? (<FaEye />) : (<FaEyeSlash />)}
                </button>
                </div>

                <button
                  className="bg-blue-500 sign-in-w w-96 text-xl mt-3 block p-3 mr-4 hover:bg-blue-600 focus:outline-none"
                  style={{ borderRadius: '50px' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            <p className='text-center text-lg mt-3'>OR</p>
            <button
            style={{ borderRadius: '50px', border: `1px solid white` }}
              onClick={() => setShowEmailForm(false)}
              className="w-96 sign-in-w text-lg mt-3 block font-semibold p-3 mr-4 hover:bg-red-600 focus:outline-none"
            >
            
              <FaGoogle className='mr-2 inline mb-0.5'/> Sign in with Google
            </button>
            <p className='text-lg text-bold text-center mt-6'>
              Do not have an account: <Link href='./register' ><span style={{ color: '#144ee3', textDecoration: 'underline' }} className='ml-2'>Sign up</span></Link>
            </p>
          </div>
        </div>
      </div> 
      </div>
      <Footer />
      </Layout>
    </>
  );
};

export default Login;
