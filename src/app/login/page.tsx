// Login.tsx
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaEyeSlash, FaEye, FaGoogle } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Animate from '../components/RouteAnimate';

const Login: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPin, setResetPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState(1);
  const [resetMessage, setResetMessage] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailButtonClick = () => {
    setShowEmailForm((prevMode) => !prevMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      if (response.data.message === 'Login successful') {
        localStorage.setItem('token', response.data.token);

        setLoginError('');
        setSuccessMessage('Login successful! Redirecting...');
        const { _id, firstName, email } = response.data.user;
        localStorage.setItem('user', JSON.stringify({ _id, firstName, email }));

        router.push(`/Shorten?firstName=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`);
      }
    } catch (error: any) {
      console.error('Error logging in:', error.response.data);
      setLoginError('Incorrect username or password');
      setSuccessMessage('');
    }
  };

  const handlePasswordResetRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/reset-password-request', { email: resetEmail });
      setResetMessage(response.data.message);
      setResetStep(2); // Move to PIN entry step
    } catch (error: any) {
      console.error('Error sending password reset PIN:', error.response.data);
      setResetMessage('Error sending password reset PIN');
    }
  };

  const handlePinSubmit = async () => {
    try {
      setResetStep(3); // Move to new password entry step
    } catch (error: any) {
      console.error('Error verifying PIN:', error.response.data);
      setResetMessage('Invalid PIN');
    }
  };

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };
  

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/reset-password', {
        email: resetEmail,
        pin: resetPin,
        newPassword,
      });
      setResetMessage(response.data.message);
      setResetStep(1); // Reset the steps after success
      setIsResettingPassword(false);
    } catch (error: any) {
      console.error('Error resetting password:', error.response.data);
      setResetMessage('Error resetting password');
    }
  };

  return (
    <>
      <Animate>
        <Layout>
          <div className='bg-login z-50'>
            <Navbar showSignIn={false} showRegister={true} showHome={true} />
            <div className='flex z-20 items-center justify-center'>
              <div className='mt-12 font-fam p-8 rounded-xl shadow-2xl'>
                <CgProfile className='text-6xl max-w-full m-auto font-bold mb-7' />

                <div className='mb-4'>
                  <button
                    style={{ borderRadius: '50px', border: `1px solid white` }}
                    onClick={handleEmailButtonClick}
                    className='sign-in-w text-lg mt-3 w-96 font-semibold p-3 hover:bg-red-600 focus:outline-none'
                  >
                    <MdEmail className='mr-3 h-5 inline pb-0.5' /> Sign in with Email
                  </button>

                  {showEmailForm && (
                    <form className='space-y-4 mt-10 mb-10' onSubmit={handleSubmit}>
                      <div className='relative flex items-center align-middle'>
                        <span className='absolute left-4 mt-1'>
                          <MdEmail className='ml-2 inline h-8 pb-0.5' />
                        </span>
                        <input
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{ borderRadius: '50px', border: `1px solid white` }}
                          placeholder='Enter your email..'
                          className='sign-in-w bg-transparent mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>

                      <div className='relative flex items-center align-middle'>
                        <span className='absolute left-4 mt-1'>
                          <FaLock className='ml-2 inline h-5 pb-1' />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          value={formData.password}
                          onChange={handleInputChange}
                          style={{ borderRadius: '50px', border: `1px solid white` }}
                          placeholder='Enter password..'
                          className='bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500'
                          required
                        />
                        <button type='button' onClick={togglePasswordVisibility} className='absolute right-8'>
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>

                      {loginError && <p className='text-red-500 flex justify-center'>{loginError}</p>}
                      {successMessage && <p className='text-green-500 flex justify-center'>{successMessage}</p>}

                      <button
                        className='bg-blue-500 sign-in-w w-96 text-xl mt-3 block p-3 mr-4 hover:bg-blue-600 focus:outline-none'
                        style={{ borderRadius: '50px' }}
                        type='submit'
                      >
                        Submit
                      </button>

                      <div className='flex justify-center'>
                        <button
                          type='button'
                          onClick={() => setIsResettingPassword(true)}
                          className='text-blue-500 hover:underline mt-4'
                        >
                          Forgot Password?
                        </button>
                      </div>

                      {isResettingPassword && (
                        <div style={{backgroundColor: "#0b101b"}} className='fixed -inset-4 flex items-center justify-center z-50'>
                          <div className='p-8 rounded-lg m-auto flex items-center justify-center text-center align-middle shadow-lg' style={{ width: '500px', height: '400px', backgroundColor: "#181e29" }}>
                            {resetStep === 1 && (
                              <div>
                                <h2 className='text-center text-xl mb-4'>Reset Password</h2>
                                <div className='relative flex items-center align-middle'>
                                  <span className='absolute left-4 mt-1'>
                                    <MdEmail className='ml-2 inline h-8 pb-0.5' />
                                  </span>
                                  <input
                                    type='email'
                                    value={resetEmail}
                                    onChange={handleResetEmailChange}
                                    style={{ borderRadius: '50px', border: `1px solid gray` }}
                                    placeholder='Enter your email to reset password..'
                                    className='sign-in-w bg-transparent mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500'
                                    required
                                  />
                                </div>
                                <button
                                  className='bg-blue-500 sign-in-w w-96 text-xl mt-3 block p-3 mr-4 hover:bg-blue-600 focus:outline-none'
                                  style={{ borderRadius: '50px' }}
                                  onClick={handlePasswordResetRequest}
                                >
                                  Send PIN
                                </button>
                              </div>
                            )}

                            {resetStep === 2 && (
                              <div>
                                <h2 className='text-center text-xl mb-4'>Enter PIN</h2>
                                <div className='relative flex items-center align-middle'>
                                  <input
                                    type='text'
                                    value={resetPin}
                                    onChange={(e) => setResetPin(e.target.value)}
                                    style={{ borderRadius: '50px', border: `1px solid gray` }}
                                    placeholder='Enter the 6-digit PIN sent to your email'
                                    className='sign-in-w bg-transparent mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500'
                                    required
                                  />
                                </div>
                                <button
                                  className='bg-blue-500 sign-in-w w-96 text-xl mt-3 block p-3 mr-4 hover:bg-blue-600 focus:outline-none'
                                  style={{ borderRadius: '50px' }}
                                  onClick={handlePinSubmit}
                                >
                                  Verify PIN
                                </button>
                              </div>
                            )}

                            {resetStep === 3 && (
                              <div>
                                <h2 className='text-center text-xl mb-4'>Set New Password</h2>
                                <div className='relative flex items-center align-middle'>
                                  <span className='absolute left-4 mt-1'>
                                    <FaLock className='ml-2 inline h-5 pb-1' />
                                  </span>
                                  <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ borderRadius: '50px', border: `1px solid gray` }}
                                    placeholder='Enter new password'
                                    className='bg-transparent sign-in-w mt-1 p-3 w-96 border pl-12 focus:outline-none focus:border-blue-500'
                                    required
                                  />
                                </div>
                                <button
                                  className='bg-blue-500 sign-in-w w-96 text-xl mt-3 block p-3 mr-4 hover:bg-blue-600 focus:outline-none'
                                  style={{ borderRadius: '50px' }}
                                  onClick={handlePasswordReset}
                                >
                                  Reset Password
                                </button>
                              </div>
                            )}

                            {resetMessage && <p className='text-center mt-4'>{resetMessage}</p>}

                            <button
                              className='absolute text-2xl top-5 right-10 text-neutral-100 hover:text-white-700'
                              onClick={() => setIsResettingPassword(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  )}

                  <p className='text-center text-lg mt-3'>OR</p>
                  <button
                    style={{ borderRadius: '50px', border: `1px solid white` }}
                    onClick={() => setShowEmailForm(false)}
                    className='w-96 sign-in-w text-lg mt-3 block font-semibold p-3 mr-4 hover:bg-red-600 focus:outline-none'
                  >
                    <FaGoogle className='mr-2 inline mb-0.5' /> Sign in with Google
                  </button>
                  <p className='text-lg text-bold text-center mt-6'>
                    Do not have an account:{' '}
                    <Link href='./register'>
                      <span style={{ color: '#144ee3', textDecoration: 'underline' }} className='ml-2'>
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
        <Footer />
      </Animate>
    </>
  );
};

export default Login;
