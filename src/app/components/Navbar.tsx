"use client"

import React , { useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

interface Navbar {
    showSignIn: boolean;
    showRegister: boolean;
    showHome: boolean;
  }
  
  const Navbar: React.FC<Navbar> = ({ showSignIn, showRegister, showHome }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    const handleMenuToggle = () => {
      setMenuOpen(!isMenuOpen);
    };

  return (
    <>
    <div className='flex justify-between text-white max-w-7xl m-auto p-5 nav-top-div items-center'>
<div className='flex justify-center items-center gap-10'>

<Image className='logo-head' src='/images/Linkly.png' height={45} width={150}  alt='logo'/>
 
 <Link href='/'>
{showHome && <FaHome className='inline text-4xl mb-1'/>}
 </Link>
 </div>

<div onClick={handleMenuToggle} className='normal-menu cursor-pointer block lg:hidden'>
<FaBarsStaggered className='text-xl'/>
</div>

{isMenuOpen && showSignIn && (
  <div className='absolute top-16 right-5'>
    <Link href='/login' className='block bg-blue-700 font-semibold items-center p-3 rounded-lg cursor-pointer'>
      Login
    </Link>
    {showRegister && (
      <Link href='/register' className='block p-3 bg-red-500 rounded-lg register-btn-mbl font-semibold'>
        Register Now
      </Link>
    )}
  </div>
)}

<div className='mbl-menu flex menu-items gap-10 items-center'>
  {showSignIn && (
    <Link href='/login' style={{border:'2px solid white',backgroundColor:'#181e29',borderRadius:'30px'}} className='flex font-semibold items-center p-4 rounded-3xl cursor-pointer'>
      <p className='rounded-2xl pr-1'>Login </p>
      <img src='./images/sign-in.png' alt=''/>
    </Link>
  )}
  {showRegister && (
    <Link href='/register' style={{backgroundColor:'#144ee3',borderRadius:'30px'}} className='p-4 register-btn-mbl font-semibold border-gray-700'>
      Register Now
    </Link>
  )}
</div>
</div>
    </>
  )
}

export default Navbar;
