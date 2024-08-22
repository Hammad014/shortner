'use client'
import React, { useState } from 'react';
import Footer from '../components/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar  from '../components/Navbar';
import Layout from '../components/Layout';
import { MdEmail , MdOutlineEmail} from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import axios from 'axios';
import Animate from '../components/RouteAnimate';
import { FaEyeSlash, FaEye, FaGoogle, FaUser, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Register = () => {
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    recaptcha: '',
  });

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    containsNum: false,
    containsAlpha: false,
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
      [name]: '',
    });

    if (name === 'password') {
      const minLength = value.length >= 8;
      const containsNum = /\d/.test(value);
      const containsAlpha = /[a-zA-Z]/.test(value);
      setPasswordValidations({
        minLength,
        containsNum,
        containsAlpha,
      });
    }
  };

  const handleRecaptchaChange = async (value: string | null) => {
    // Check if value is not null before setting the state
    if (!value || value === '') {
      setErrors({
        ...errors,
        recaptcha: 'Please complete the reCAPTCHA',
      });
      setRecaptchaValue(''); // Make sure to set recaptchaValue to an empty string
      return;
    }

    // If the recaptcha is completed successfully, clear the error
    setErrors({
      ...errors,
      recaptcha: '',
    });
    setRecaptchaValue(value);
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptchaValue) {
      setErrors({
        ...errors,
        recaptcha: 'Please complete the reCAPTCHA',
      });
      return;
    }

    if (!passwordValidations.minLength || !passwordValidations.containsNum || !passwordValidations.containsAlpha) {
      setErrors({
        ...errors,
        password: 'Password does not meet all requirements',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match',
      });
      return;
    }

    setIsLoading(true); // Start loading before the request

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formData);
      console.log(response.data);
      setFormSubmitted(true);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push(`/Shorten`);
    } catch (error: any) {
      console.error('Error registering user:', error.response.data);
      setErrors({
        ...errors,
        email: error.response.data.error || '',
      });
    } finally {
      setIsLoading(false); // Stop loading after the request is handled
    }
  };

  return (
    <>
    {isLoading && (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <div className='ml-3'>Registering...</div>
      </div>
    )}
    <Animate>
      <Layout>
        <Navbar showSignIn={true} showRegister={false} showHome={true} />
        <div className="flex z-10 items-center font-fam justify-center">
          <div className="mt-12 p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-fam text-center font-semibold mb-7">Sign up</h2>

            <div className="mb-4">
              <button
                style={{ borderRadius: '50px', border: `1px solid white` }}
                onClick={handleEmailButtonClick}
                className="text-lg sign-in-w font-semibold mt-3 w-96 block p-3 hover:bg-red-600 focus:outline-none"
              >
                <svg className='mr-3 h-5 inline pb-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#dadfe7" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                Sign up with Mail
              </button>
              {showEmailForm && (
                <form className="space-y-4 mt-10 mb-10" onSubmit={handleSubmit}>
                  <div className="relative flex items-center align-middle">
                    <span className="absolute left-4 mt-1">
                      <FaUser className='ml-2 inline h-4 pb-0.5'/>
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{ borderRadius: '50px', border: `1px solid white` }}
                      placeholder="First Name"
                      className="bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

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
                      placeholder="Email"
                      className="bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500"
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
                      placeholder="Password"
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

                  <ul className="list-disc pl-10 text-gray-500">
                  <li className='font-semibold text-lg' style={{ color: passwordValidations.minLength ? 'green' : 'gray' }}>Should at least 8 characters</li>
                  <li className='font-semibold text-lg' style={{ color: passwordValidations.containsAlpha ? 'green' : 'gray' }}>It should contains an alphabet</li>
                  <li className='font-semibold text-lg' style={{ color: passwordValidations.containsNum ? 'green' : 'gray' }}>It should Contains a number</li>
                </ul>

                  <div className="relative flex items-center align-middle">
                    <span className="absolute left-4 mt-1">
                      <FaLock className='ml-2 inline h-5 pb-1'/>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      style={{ borderRadius: '50px', border: `1px solid white` }}
                      placeholder="Confirm Password"
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

                  <ReCAPTCHA
                    className='mbl-captcha mt-7 mb-7 ml-10'
                    sitekey="6LczPV8pAAAAANXdZmrlZ-lXfdPWp7t0B8cIfXrh"
                    onChange={handleRecaptchaChange}
                  />

                  {errors.recaptcha && <p className="text-red-500 flex justify-center">{errors.recaptcha}</p>}
                  {errors.confirmPassword && <p className="text-red-500 flex justify-center">{errors.confirmPassword}</p>}
                  {errors.email && <p className="text-red-500 flex justify-center">{errors.email}</p>}
                  {errors.password && <p className="text-red-500 flex justify-center">{errors.password}</p>}

                  <button
                    className="bg-blue-500 sign-in-w w-96 text-xl mt-3 block p-3 mr-4 hover:bg-blue-600 focus:outline-none"
                    style={{ borderRadius: '50px' }}
                    type="submit"
                  >
                    Submit
                  </button>
                  {formSubmitted && <FaCheckCircle className='text-6xl max-w-full m-auto text-green-500'/>}
                </form>
              )}

              <p className='text-center text-lg mt-3'>OR</p>
              <button
                style={{ borderRadius: '50px', border: `1px solid white` }}
                onClick={() => setShowEmailForm(false)}
                className="w-96 sign-in-w text-lg font-semibold mt-3 block p-3 mr-4 hover:bg-red-600 focus:outline-none"
              >
                <FaGoogle className='mr-2 inline mb-0.5'/> 
                Sign up with Google
              </button>
              <p className='text-lg text-center mt-6'>
                Already have an account: <Link href='../login' ><span style={{ color: '#144ee3', textDecoration: 'underline' }} className='ml-2'>Sign in</span></Link>
              </p>
            </div>

          </div>
        </div>
        <Footer />
      </Layout>
      </Animate>
    </>
  );
}

export default Register;
