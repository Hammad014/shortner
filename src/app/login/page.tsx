"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';
import  Navbar from '../components/Navbar';



const Login = () => {
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
    
      <Navbar showSignIn={false} showRegister={true} />
     <div className="flex z-20 items-center justify-center">
        <div className="mt-12 font-fam p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl text-center font-bold mb-7">Login</h2>

          <div className="mb-4">
            <button
            //   style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
              onClick={handleEmailButtonClick}
              className="sign-in-w text-lg mt-3 w-96 font-semibold p-3 hover:bg-red-600 focus:outline-none"
            >
              {/* <FontAwesomeIcon className='mr-2' icon="fa-solid fa-envelope" /> Sign in with Email */}
            </button>
            {showEmailForm && (
              <form className="space-y-4 mt-10 mb-10" onSubmit={handleSubmit}>
                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                    {/* <FontAwesomeIcon className='ml-2' icon="fa-solid fa-envelope" /> */}
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    // style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
                    placeholder="Enter your email.."
                    className="sign-in-w bg-transparent mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                    required
                  />
                  
                </div>

                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                    {/* <FontAwesomeIcon className='ml-2' icon="fa-solid fa-lock" /> */}
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    // style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
                    placeholder="Enter password.."
                    className="bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                   type="button"
                   onClick={togglePasswordVisibility}
                   className="absolute right-8"
                    >
                   {/* <FontAwesomeIcon icon={`fa-solid fa-eye${showPassword ? '' : '-slash'}`} /> */}
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
            //   style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
              onClick={() => setShowEmailForm(false)}
              className="w-96 sign-in-w text-lg mt-3 block font-semibold p-3 mr-4 hover:bg-red-600 focus:outline-none"
            >
              {/* <FontAwesomeIcon className='mr-2' icon="fa-brands fa-google" /> Sign in with Google */}
            </button>
            <p className='text-lg text-bold text-center mt-6'>
              Do not have an account: <Link href='./register' ><span style={{ color: '#144ee3', textDecoration: 'underline' }} className='ml-2'>Sign up</span></Link>
            </p>
          </div>
        </div>
      </div> 
      <Footer />
     
    </>
  );
};

export default Login;
