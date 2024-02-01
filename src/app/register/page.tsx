"use client"

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link'


interface pageProps {
  darkMode: boolean;
  handletoggle: boolean;
}

interface FormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email: string;
  password: string;
  confirmPassword: string;
  recaptcha: string;
}
 
  
const Register: React.FC<pageProps> = ({ darkMode, handletoggle }) => {
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [errors, setErrors] = useState<Errors>({
      email: '',
      password: '',
      confirmPassword: '',
      recaptcha: '',
    });
  
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
      setErrors({
        ...errors,
        [name]: '', // Clear the error when the user starts typing
      });
    };
  
    const handleRecaptchaChange = (value: string | null) => {
      setRecaptchaValue(value);
      setErrors({
        ...errors,
        recaptcha: '', // Clear the recaptcha error when the user completes it
      });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Check if the recaptchaValue is not null before submitting the form
      if (!recaptchaValue) {
        setErrors({
          ...errors,
          recaptcha: 'Please complete the reCAPTCHA',
        });
        return;
      }
  
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match',
        });
        return;
      }
  
      // Proceed with form submission
      console.log('Submitting form:', formData);
    };

  return (
    <>
    {/* <Navbar showSignIn={true} showRegister={false} /> */}
      <div className="flex z-10 items-center font-fam justify-center">
        <div className="mt-12 p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-fam text-center font-semibold mb-7">Sign up</h2>

          <div className="mb-4">
            <button
              style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
              onClick={handleEmailButtonClick}
              className="text-lg sign-in-w font-semibold mt-3 w-96 block p-3 hover:bg-red-600 focus:outline-none"
            >
              {/* <FontAwesomeIcon className='mr-2' icon="fa-solid fa-envelope" />  */}
              Sign up with Mail
            </button>
            {showEmailForm && (
              <form className="space-y-4 mt-10 mb-10" onSubmit={handleSubmit}>
                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                    {/* <FontAwesomeIcon className='ml-2' icon="fa-solid fa-user" /> */}
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
                    placeholder="First Name"
                    className="bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                    {/* <FontAwesomeIcon className='ml-2' icon="fa-solid fa-envelope" /> */}
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
                    placeholder="Email"
                    className="bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                    {/* <FontAwesomeIcon className=' ml-2 ' icon="fa-solid fa-lock" /> */}
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
                    placeholder="Password"
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

                <div className="relative flex items-center align-middle">
                  <span className="absolute left-4 mt-1">
                    {/* <FontAwesomeIcon className=' ml-2 ' icon="fa-solid fa-lock" /> */}
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
                    placeholder="Confirm Password"
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

                {/* <ReCAPTCHA
                  className='mbl-captcha mt-7 mb-7 ml-10'
                  sitekey="6LczPV8pAAAAANXdZmrlZ-lXfdPWp7t0B8cIfXrh"
                  onChange={handleRecaptchaChange}
                  required
                /> */}
                {errors.recaptcha && <p className="text-red-500 flex justify-center">{errors.recaptcha}</p>}
                {errors.confirmPassword && <p className="text-red-500 flex justify-center">{errors.confirmPassword}</p>}
                
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
              style={{ borderRadius: '50px', border: `1px solid ${darkMode ? 'white' : 'black'}` }}
              onClick={() => setShowEmailForm(false)}
              className="w-96 sign-in-w text-lg font-semibold mt-3 block p-3 mr-4 hover:bg-red-600 focus:outline-none"
            >
              {/* <FontAwesomeIcon className='mr-2' icon="fa-brands fa-google" /> */}
               Sign up with Google
            </button>
            <p className='text-lg text-center mt-6'>
              Already have an account: <Link href='/login' ><span style={{ color: '#144ee3', textDecoration: 'underline' }} className='ml-2'>Sign in</span></Link>
            </p>
          </div>

        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
  
}

export default Register;