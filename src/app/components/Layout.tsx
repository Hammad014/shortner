"use client"

import Image from "next/image";
import { ReactNode } from 'react';
import { useState , useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);


  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0b101b' : '';
    document.body.style.color = darkMode ? 'white' : 'black';
    // document.body.style.border = darkMode ? '1px solid white' : '1px solid black';
  }, [darkMode]);



  return (
    <>
    {darkMode && (
          <>
            <Image className='mbl-cube1 cube1 absolute z-0 top-0 right-10' src='/images/Rectangle 4 (1).png' height={250} width={350} alt='cube1'/>
            <Image className='mbl-cube2 cube2 md:cube2 absolute top-80 right-60 z-0' src='/images/Rectangle 4.png' height={250} width={350} alt='cube2'/>
            <Image className='mbl-cube3 cube3 absolute z-0 top-28 left-10' src='/images/Rectangle 5 (1).png' height={100} width={350} alt='cube3'/>
            {/* <Image className='mbl-cube4 cube4 absolute z-0 ' src='/images/Rectangle 5 (2).png'  height={100} width={350} alt='cube4'/> */}
          </>
        )}

      {children}
    </>
  );
}
export default Layout;
