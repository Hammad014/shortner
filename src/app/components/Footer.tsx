import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaFacebook, FaRegCopyright } from 'react-icons/fa6';

const Footer = () => {
  return (
    <>
    <footer style={{backgroundColor:'#181e29'}} className='max-w-full m-auto text-center text-white mb-0 mt-24 pt-10 pb-10 m'>
    <div className=''>
      <Image className='max-w-full m-auto' src='/images/Linkly.png' height={40} width={150} alt='logo'/>
      <div className='flex gap-7 justify-center mt-6 items-center'>
      <a href="https://twitter.com/your_twitter_handle" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={30} />
      </a>
      <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={30} />
      </a>
      <a href="https://www.linkedin.com/in/your_linkedin_profile" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={30} />
      </a>
      <a href="https://www.facebook.com/your_facebook_page" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={30} />
      </a>
      </div>
     
      <p className='mt-5'>Copyrights <FaRegCopyright className='inline mb-0.5' /> 2024 Linkly, Inc</p>
      
      </div>
      <div className='footer-menu flex gap-16 justify-center mt-7'>
        <Link className='hover:underline' href='/howitworks'> How it works ?</Link>
        <Link className='hover:underline' href='/privacypolicy'> Privacy Policy</Link>
        <Link className='hover:underline' href='/termsofservices'> Terms of Services</Link>      
      </div>
   </footer>
    </>
  )
}

export default Footer
