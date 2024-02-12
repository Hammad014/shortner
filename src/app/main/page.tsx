"use client"

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaQuestion } from "react-icons/fa";
import {Poppins} from 'next/font/google';
import copy from 'copy-to-clipboard';
import {nanoid} from 'nanoid';
import AnimationComponent from '../components/Animation';

const myFont = Poppins({ weight: '400', subsets:['latin'] }) ;

const Main = () => {

    const [autoPaste, setAutoPaste] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);
  
    const handleSwitchClick = async () => {
      let newAutoPasteState = autoPaste; // Store the current state
  
      if (!autoPaste) {
        try {
          const textFromClipboard = await navigator.clipboard.readText();
          setInputValue(textFromClipboard);
        } catch (error) {
          console.error('Error reading from clipboard:', error);
        }
      } else {
        setInputValue('');
      }
  
      newAutoPasteState = !newAutoPasteState;
      setAutoPaste(newAutoPasteState);
    };

    const handleShortenClick = async () => {
      const longUrl = inputValue;
  
      if (longUrl) {
        const newShortUrl = nanoid();
        setShortenedUrl(newShortUrl);
        copy(newShortUrl);
        setIsCopied(true); // Indicate successful copy
  
        // Optionally display a success message
        console.log('URL shortened and copied to clipboard!');
      } else {
        // Handle the case where the input field is empty
        console.warn('Please enter a URL to shorten.');
      }
    };
   
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setShortenedUrl(''); // Clear existing shortened URL on input change
      setIsCopied(false); // Reset copy status on input change
    };
    
  const buttonText = shortenedUrl ? (isCopied ? 'Copied!' : 'Copy') : 'Shorten';
  const buttonClickHandler = shortenedUrl ? () => setIsCopied(copy(shortenedUrl)) : handleShortenClick;

  return (
    <>
     <AnimationComponent />
    <div className={myFont.className}>
    <Navbar showSignIn={true} showRegister={true} showHome={false}/>
      <div className='lg:max-w-4xl font-fam m-auto text-center mt-20 md:max-w-lg main-div'>
        <h1 className='gradient-text lg:text-5xl font-fam font-extrabold p-3 md:text-4xl sm:text-3xl main-heading'>Shorten Your Loooong Links :(</h1>
        <p className='mbl-main-dis1 font-fam mt-5 max-w-lg m-auto text-lg text-center main-p '>
          Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
        </p>
        <div className="relative max-w-lg m-auto mb-4 mt-5">
          <div className="absolute inset-y-0 left-2 lg:left-4 flex items-center pointer-events-none">
            <Image style={{ backgroundColor: '#0b101b' }} src='/images/link.png' width={30}
      height={30} alt="link icon" />
          </div>
          <input
            style={{ backgroundColor: '#0b101b', borderRadius:'45px'}}
            type="text"
            placeholder="Enter your link"
            value={shortenedUrl || inputValue}
            onChange={handleInputChange}
            className="pl-14 pt-5 text-white pb-5 pr-8 sm:pr-4 w-full py-2 link-input border-2 focus:outline-none focus:border-blue-500"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center">
          <button
          style={{ borderRadius: '45px', marginRight: '2px' }}
          className="bg-blue-700 text-white sm:py-4 sm:px-9 align-middle link-btn border-t-0 hover:bg-blue-600 focus:outline-none"
          onClick={buttonClickHandler}
          >
          {/* <span className='shorten-btn text-lg'>{autoPaste ? 'Copy' : 'Shorten'}</span>  */}
          <span className='shorten-btn text-lg'>{buttonText}</span> 
          <svg className='shorten-icon-btn h-7 inline pl-1 pb-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#e1e4ea" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </button>
        {/* {shortenedUrl && (
        <div className="">
          {shortenedUrl}
        </div>
      )} */}
          </div>
        </div>

        <div className='flex justify-center items-center gap-2 m-auto mb-5'>
          <div className={`switch ${autoPaste ? 'on' : ''}`} onClick={handleSwitchClick}>
            <div className='slider'></div>
          </div>
          <h3 className='font-semibold font-fam'>Auto Paste from Clipboard</h3>
        </div>

        <div className='inline mbl-main-dis1 max-w-lg align-middle m-auto'>
          <p className='mr-2 text-lg'>
            You can create <span className='mr-1' style={{ color: '#eb568e', fontWeight: 'bolder' }}>05</span> 
            more links. Register Now to enjoy Unlimited usage
            <FaQuestion className='inline mb-0.5 ml-1'/>
          </p>
        </div>
      </div>

      <div className='text-left max-w-7xl m-auto mt-14'>
        <table className="lg:max-w-full table-long m-auto border-collapse md:max-w-4xl">
          <thead>
            <tr className='flex mbl-gap lg:gap-36 md:gap-24 sm:gap-12'>
              <th>Short Link</th>
              <th>Original Link</th>
              <th className='mbl-short'>Clicks</th>
              <th className='mbl-short'>Status</th>
              <th className='mbl-short'>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="even:bg-gray-100 odd:bg-gray-200">
              <td></td>
              <td></td>
              <td className='mbl-short'></td>
              <td className='mbl-short'></td>
              <td className='mbl-short'></td>
            </tr> */}
            {shortenedUrl && ( // Display the shortened URL if it exists
              <tr className="">
                <td>{shortenedUrl}</td>
                <td>{inputValue}</td>
                <td className='mbl-short'></td>
                <td className='mbl-short'></td>
                <td className='mbl-short'></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default Main
