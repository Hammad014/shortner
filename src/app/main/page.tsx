"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaQuestion } from "react-icons/fa";
import {Poppins} from 'next/font/google';
import copy from 'copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import AnimationComponent from '../components/Animation';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { useShortenLink } from '../utility/ShortenUtility';

const myFont = Poppins({ weight: '400', subsets:['latin'] }) ;


interface Link {
  _id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: string;
  date: string;
}


const Main = () => {

  const {
    autoPaste,
    setAutoPaste,
    inputValue,
    setInputValue,
    shortenedUrl,
    setShortenedUrl,
    originalUrl,
    setOriginalUrl,
    isCopied,
    setIsCopied,
    copied,
    setCopied,
    copiedLinks,
    setCopiedLinks,
    links,
    isLoading,
    setLinks,
    handleSwitchClick,
    handleShortenClick,
    // shortenLink,
    copyLink,
    handleInputChange,
    handleCopyClick,
    handleLinkClick,
    buttonText,
    buttonClickHandler,
  } = useShortenLink();

  return (
    <>
   {isLoading && (
        <div className="loading-overlay">
          <div className="spinner mr-3"></div>
          <div>Shortening....</div>
        </div>
      )}

<div className={`main-content ${isLoading ? 'blurred' : ''}`} style={{ filter: `blur(${isLoading ? '8px' : '0px'})`, transition: 'filter 300ms' }}>
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
          <thead className='bg-slate-800 text-sky-600'>
            <tr className='flex mbl-gap p-5 gap-8'>
              <th className='w-48'>Short Link</th>
              <th className='w-96'>Original Link</th>
              <th className='w-40 mbl-short'>Clicks</th>
              <th className='w-40 mbl-short'>Status</th>
              <th className='w-40 mbl-short'>Date</th>
            </tr>
          </thead>
          <tbody>
            {links.slice().reverse().map((link) => (
              <tr key={link._id} className="flex relative flex-nowrap gap-5 p-5 bg-transparent">
                {copiedLinks[link.shortUrl] && (
                    <span className="text-green-500 absolute top-12 left-28 mt-1 mr-2">Copied</span>
                  )}
             <div className='scrollableshort flex justify-between cursor-pointer' onClick={() => handleLinkClick(link.shortUrl, link.originalUrl)}>
                  <td>
                    {link.shortUrl}
                  </td>
                  
                  
                </div>
                <div className='relative mr-3'>
      <Tooltip title="Copy" placement="top">
      <IconButton>
      <FaRegCopy
      onClick={() => handleCopyClick(link.shortUrl)}            
      className={`cursor-pointer absolute top-1 text-sm text-orange-600 mb-3 transition duration-300 ease-in-out transform hover:scale-110 ${copiedLinks[link.shortUrl] ? 'text-green-500' : ''}`}
      />
      </IconButton>
    </Tooltip>
    </div>
                <td className='scrollablefull'> <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">{link.originalUrl}</a></td>
                <td className='w-40 mbl-short'><LuMousePointerClick className='inline mr-4 ml-6 text-red-400 text-xl'/>{link.clicks}</td>
                <td className='table-cell text-green-600 w-40 mbl-short ml-8'>{link.status}</td>
                <td className='w-40 mbl-short ml-4' >{new Date(link.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
    </div>
    </>
  )
}

export default Main
