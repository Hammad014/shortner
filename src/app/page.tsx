"use client"

import Image from "next/image";
import { useState , useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "./components/Footer";
import Main from './main/page';
import Login from "./login/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "./components/Navbar";
// import Layout from "./components/Layout";


export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0b101b' : '#c8cdd5';
    document.body.style.color = darkMode ? 'white' : 'black';
    
    // document.body.style.border = darkMode ? '1px solid white' : '1px solid black';
  }, [darkMode]);




  const handletoggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <>
        <div className="relative max-w-full" >
        {darkMode && (
          <>
            <Image className='mbl-cube1 cube1 absolute z-0 top-0 right-10' src='/images/Rectangle 4 (1).png' height={250} width={350} alt='cube1'/>
            <Image className='mbl-cube2 cube2 md:cube2 absolute top-80 right-60 z-0' src='/images/Rectangle 4.png' height={250} width={350} alt='cube2'/>
            <Image className='mbl-cube3 cube3 absolute z-0 top-28 left-10' src='/images/Rectangle 5 (1).png' height={100} width={350} alt='cube3'/>
            {/* <Image className='mbl-cube4 cube4 absolute z-0 ' src='/images/Rectangle 5 (2).png'  height={100} width={350} alt='cube4'/> */}
          </>
        )}
        {!darkMode && (
          <>
            <div className='w-64 h-36 mbl-cube1 white-thm-1 bg-gradient-to-br from-blue-400 to-rose-300 cube1 rounded-b-full absolute z-0 top-0 left-0' ></div>
            <div className='mbl-cube2 cube2 md:cube2 absolute top-80 right-60 z-0'></div>
            <div className='w-52 h-96 mbl-cube3 white-thm-3 bg-gradient-to-br from-green-500 to-rose-300 cube3 rounded-s-full absolute z-0 top-44 right-0' ></div>
            <div className='mbl-cube4 cube4 absolute z-0 '></div>
          </>
        )}
        

      </div>
            <div className='z-50 relative'>
          <div className='absolute theme-mbl transform rotate-90 top-80 right-5 '>
        <div className={`switchtheme ${darkMode ? 'on' : ''}`} onClick={handletoggle}>
          <div className='flex justify-between'> 
          <svg className="small-scn2 h-10 w-10 m-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#edeff2" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>
          <svg className="small-scn1 h-10 w-10 m-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#f7f7f8" d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/></svg>
          
          </div>
            <div className='slidertheme'></div>
          </div>
          </div>
        
        </div>
    

  <Main/>
  
    </>
  );
}
