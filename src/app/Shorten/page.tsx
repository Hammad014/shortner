'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaAngleDown, FaHistory, FaUserCircle } from 'react-icons/fa';
import { IoNotificationsCircleOutline } from 'react-icons/io5';
import { Transition } from 'react-transition-group';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { FaRegCopy } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { PiLinkSimpleBold } from "react-icons/pi";
import { LuMousePointerClick } from "react-icons/lu";
import { useShortenLink } from '../utility/ShortenUtility';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MdDelete } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import StatisticsTable from '../components/StatisticsTable';
import LinkShorteningChart from '../components/LinkShorteningChart';
import ProtectedRoute from '../components/ProtecttedRoute';
import copy from 'copy-to-clipboard';
import AnimationComponent from '../components/Animation';

interface Link {
  _id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: string;
  date: Date;
  userEmail: string;
}


const Page: React.FC = () => {
  
  const [age, setAge] = React.useState('');
  const [value, setValue] = React.useState('1');
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);

  const [autoPaste, setAutoPaste] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [allLinks, setAllLinks] = useState<Link[]>([]);
  const [userLinks, setUserLinks] = useState<Link[]>([]);


  const handleSwitchClick = async () => {
    let newAutoPasteState = autoPaste;

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
    setIsLoading(true); // Start loading
  
    try {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
  
      if (!user) {
        // Handle error: User is not logged in
        console.error('User not logged in');
        return;
      }
  
      // Automatically set the tab to "2" if a user is found
      setValue('2');
  
      const endpoint = '/api/shorten/user';
      const requestBody = { email: user.email, originalUrl: inputValue };
  
      const response = await axios.post(`http://localhost:5000${endpoint}`, requestBody);
      setShortenedUrl(response.data.shortUrl);
      setIsCopied(false);
    } catch (error) {
      console.error('Error shortening link:', error);
      alert('An error occurred while shortening the link. Please try again later.');
    } finally {
      setIsLoading(false); // End loading
    }
  };
  

  // const handleShortenClick = async () => {
  //   setIsLoading(true); // Start loading
  
  //   try {
  //     const storedUser = localStorage.getItem('user');
  //     const user = storedUser ? JSON.parse(storedUser) : null;
  
  //     if (!user) {
  //       // Handle error: User is not logged in
  //       console.error('User not logged in');
  //       return;
  //     }
  
  //     const endpoint = value === '2' ? '/api/shorten/user' : '/api/shorten';
  //     const requestBody = value === '2' ? { email: user.email, originalUrl: inputValue } : { originalUrl: inputValue };
  
  //     const response = await axios.post(`http://localhost:5000${endpoint}`, requestBody);
  //     setShortenedUrl(response.data.shortUrl);
  //     setIsCopied(false);
  //   } catch (error) {
  //     console.error('Error shortening link:', error);
  //     // Handle error: Display an error message to the user
  //     // For example:
  //     alert('An error occurred while shortening the link. Please try again later.');
  //   } finally {
  //     setIsLoading(false); // End loading
  //   }
  // };

  const shortenLink = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl: inputValue });
      setShortenedUrl(response.data.shortUrl);
      setIsCopied(false);
    } catch (error) {
      console.error('Error shortening link:', error);
    }
  };


// Fetch all links
const fetchAllLinks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/links');
    const baseShortUrl = 'http://localhost:5000/';
    const sortedLinks = response.data
      // .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sorting by date (newest first)
      .map((link: any) => ({
        ...link,
        shortUrl: baseShortUrl + link.shortUrl,
      }));
    setAllLinks(sortedLinks); // Store in allLinks
  } catch (error) {
    console.error('Error fetching all links:', error);
  }
};


// Fetch user-specific links
const fetchUserLinks = async () => {
  try {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      console.error('User not logged in');
      return;
    }

    const response = await axios.get('http://localhost:5000/api/links/user', {
      params: {
        email: user.email,
      },
    });
    const baseShortUrl = 'http://localhost:5000/';
    const sortedLinks = response.data
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((link: any) => ({
        ...link,
        shortUrl: baseShortUrl + link.shortUrl,
      }));
    setUserLinks(sortedLinks); // Store in userLinks
  } catch (error) {
    console.error('Error fetching user links:', error);
  }
};

// Use effects to fetch data when component mounts
useEffect(() => {
  fetchAllLinks();
}, []);

useEffect(() => {
  fetchUserLinks();
}, []);

  
  // // ... existing code for filtering, rendering links, etc.

  // const filteredLinks = React.useMemo(() => {
  //   if (!currentUserEmail) {
  //     return []; // Return empty array if email is not yet available
  //   }

  //   return links.filter((link) => link.userEmail === currentUserEmail);
  // }, [currentUserEmail, links]);

  // console.log('filteredLinks:', filteredLinks);


// Render the filtered links

  // useEffect(() => {
  //   const fetchLinks = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/links');
  //       const baseShortUrl = `http://localhost:5000/`;
  //       const sortedLinks = response.data
  //       .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //       .map((link: any) => ({
  //         ...link,
  //         shortUrl: baseShortUrl + link.shortUrl,  // Append the base URL here
  //       }));

  //     setLinks(sortedLinks);
  //     } catch (error) {
  //       console.error('Error fetching links:', error);
  //     }
  //   };
  
  //   fetchLinks();
  // }, []);

  const copyLink = (shortUrl: any) => {
    copy(shortUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShortenedUrl('');
    setIsCopied(false);
  };

  const handleCopyClick = (shortUrl: any) => {
    copy(shortUrl);

    setCopiedLinks((prevCopiedLinks) => ({
      ...prevCopiedLinks,
      [shortUrl]: true,
    }));

    setTimeout(() => {
      setCopiedLinks((prevCopiedLinks) => ({
        ...prevCopiedLinks,
        [shortUrl]: false,
      }));
    }, 1000);
  };


  const handleLinkClick = async (shortUrl: string, originalUrl: string) => {
    try {
      window.open(originalUrl, '_blank');                        
    } catch (error) {
      console.error('Error tracking link click:', error);
    }
  };


  
  const handleProfile = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  const openDeleteConfirmation = (linkId: string) => {
    setLinkToDelete(linkId);  // This should now work without any type error
    setIsConfirmationModalOpen(true);
  };  
  

  const closeDeleteConfirmation = () => {
    setIsConfirmationModalOpen(false); // Close the modal
    setLinkToDelete(null); // Reset the selected link ID
  };  
  

  const handleDeleteLink = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
  
      if (!user) {
        console.error('User not logged in');
        return;
      }
  
      const response = await axios.delete(`http://localhost:5000/api/delete/${linkToDelete}`, {
        params: {
          email: user.email,  // Send the user's email as a query parameter
        },
      });
  
      if (response.status === 200) {
        setUserLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkToDelete));
        closeDeleteConfirmation(); // Close the modal after successful deletion
      } else {
        console.error('Failed to delete link');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };
  
  
  
  
  

  const handleCancelDelete = () => {
    // Reset state variables
    setLinkToDelete(null);
    setIsConfirmationModalOpen(false);
  };

   // Fetch first name from local storage on component mount
   useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log('Stored User:', storedUser);
  
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        console.log('User Object:', userObject);
        setUser(userObject);
        setFirstName(userObject.firstName); // if you still need firstName separately
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }, []);
  

  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage and redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    router.push('/login');
  };

    //const {

    //   // const statisticsData = [
    //   //   // Populate this array with your actual statistics data
    //   //   // For example:
    //   //   { link: 'example.com/link1', totalClicks: 100, clicksPerDay: 20, topReferrer: 'referrer.com', countries: ['USA', 'Canada'] },
    //   //   // Add more items as needed
    //   // ];

      const buttonText = shortenedUrl ? (isCopied ? 'Copied!' : 'Copy') : 'Shorten';

      const buttonClickHandler = shortenedUrl ? () => setIsCopied(copy(shortenedUrl)) : handleShortenClick;
    

  return (
    <>
    {isLoading && (
        <div className="loading-overlay">
          <div className="spinner mr-3"></div>
          <div>Shortening....</div>
        </div>
      )}
      <div className={`main-content ${isLoading ? 'blurred' : ''}`} style={{ filter: `blur(${isLoading ? '8px' : '0px'})`, transition: 'filter 300ms' }}>
    <ProtectedRoute>
<Layout>

       <div className='flex justify-between text-white max-w-7xl m-auto p-5 nav-top-div items-center'>
        <div className='flex justify-center items-center gap-10'>
          <Image className='logo-head' src='/images/Linkly.png' height={45} width={150} alt='logo' />
         
        </div>

        <div className="relative dashboard-input m-auto mb-4 mt-5 ml-16">
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
            className="pl-14 pt-5 w-full text-white pb-5 pr-8 sm:pr-4 py-2 link-input border-2 focus:outline-none focus:border-blue-500"
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

        <div className="mbl-menu flex menu-items gap-10 items-start">
          
        <div className="lg:text-xl font-fam font-semibold p-2 relative">
  <div
    className="cursor-pointer profilic absolute -top-5 right-5"
    onClick={() => setDropdownVisible(!dropdownVisible)}
  >
    {firstName && (
      <div className="flex items-center">
        <FaUserCircle  className='inline mr-2'/>
        <span className="text-white mr-2">{firstName}</span>
        <FaAngleDown className="text-white" />
      </div>
    )}
    <Transition
      in={dropdownVisible}
      timeout={300}
      unmountOnExit
      mountOnEnter
    >
      {(state) => (
        <div
          className={`dropdown-content transition-max-height ease-out duration-300 overflow-hidden ${state}`}
          style={{
            height: state === 'entered' ? '80px' : '0',
          }}
          onClick={() => setDropdownVisible(false)}
        >
          <div className="logout-container flex justify-center">
            <button 
            onClick={handleLogout}
            className="logout-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 max-w-32 px-4 mt-8 rounded-2xl">
              Logout
            </button>
          </div>
        </div>
      )}
    </Transition>
  </div>
</div>
    </div>

      </div>
      <div className='flex justify-center items-center gap-2 m-auto mb-20'>
          <div className={`switch ${autoPaste ? 'on' : ''}`} onClick={handleSwitchClick}>
            <div className='slider'></div>
          </div>
          <h3 className='font-semibold font-fam'>Auto Paste from Clipboard</h3>
        </div>

        <Box sx={{ width: '100%', typography: 'body1', maxWidth:'100%', display:'inline' }}>
      <TabContext value={value}>
      
        <Box className='relative flex justify-center' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
          <TabList className='' onChange={handleChange} aria-label="lab API tabs example">
          <GoHistory className='absolute top-4 left-3 text-sm'/>
            <Tab className='text-md text-yellow-800 font-bold mr-4 pl-8' label='All History' value="1" />
          <PiLinkSimpleBold className='absolute top-4 right-28 text-sm'/>
            <Tab className='text-md text-yellow-800 font-bold pl-8' label="Your Links" value="2" />
            {/* <Tab className='text-white' label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        
        <TabPanel value="1">
  <div className='text-left max-w-7xl m-auto mt-10'>
    <p className='font-bold text-lg ml-16 inline p-4 border border-solid border-amber-500 rounded-3xl'>
      History: ({allLinks.length})
    </p>
    <table className="lg:max-w-full mt-10 table-long m-auto border-collapse md:max-w-4xl">
      <thead className='bg-slate-800 text-sky-600'>
        <tr className='flex mbl-gap p-5 gap-5'>
          <th className='w-48'>Short Link</th>
          <th className='w-96'>Original Link</th>
          <th className='w-40 mbl-short'>Clicks</th>
          <th className='w-40 mbl-short'>Status</th>
          <th className='w-40 mbl-short'>Date</th>
        </tr>
      </thead>
      <tbody>
        {allLinks.slice().reverse().map((link) => (
          <tr key={link._id} className="flex relative flex-nowrap gap-5 p-5 bg-transparent">
            <div className='scrollableshort flex justify-between cursor-pointer' onClick={() => handleLinkClick(link.shortUrl, link.originalUrl)}>
              <td>{link.shortUrl}</td>
              {copiedLinks[link.shortUrl] && (
                <span className="text-green-500 absolute top-12 left-32 mt-1 mr-2">Copied</span>
              )}
            </div>
            <div className='relative mr-3'>
              <Tooltip title="Copy Short Link" placement="top">
                <IconButton>
                  <FaRegCopy
                    onClick={() => handleCopyClick(link.shortUrl)}
                    className={`cursor-pointer absolute top-0 text-sm text-orange-600 mb-3 transition duration-300 ease-in-out transform hover:scale-110 ${copiedLinks[link.shortUrl] ? 'text-green-500' : ''}`}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <td className='scrollablefull'><a href={link.originalUrl} target="_blank" rel="noopener noreferrer">{link.originalUrl}</a></td>
            <td className='w-40 mbl-short'><LuMousePointerClick className='inline mr-4 text-red-400 text-xl'/>{link.clicks}</td>
            <td className='table-cell text-green-600 w-40 mbl-short'>{link.status}</td>
            <td className='w-40 mbl-short'>{new Date(link.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</TabPanel>

        
        <TabPanel value="2">
        <h2 className='text-center font-semibold'>Customize your links Here</h2>
        <div className='text-left max-w-7xl m-auto mt-14'>
        <table className="lg:max-w-full mt-10 table-long m-auto border-collapse md:max-w-4xl">
          <thead className='bg-slate-800 text-sky-600'>
            <tr className='flex mbl-gap p-5 gap-5'>
            
            <th className='w-20'>ID</th>
              <th className='w-48'>Short Link</th>
              <th className='w-96'>Original Link</th>
              <th className='w-32 mbl-short'>Clicks</th>
              <th className='w-32 mbl-short'>Status</th>
              <th className='w-32 mbl-short'>Date</th>
              <th className='w-20 mbl-short'>Action</th>
            </tr>
          </thead>
          <tbody>
  {userLinks
    .slice()
    .reverse()
    .map((link, index) => (
      <div key={link._id}> {/* Added the key prop here */}
        <tr key={link._id} className="relative flex flex-nowrap gap-5 p-5 bg-transparent">
          <td className='w-20 mbl-short'>{index + 1}</td>
          <div className='scrollableshort flex justify-between cursor-pointer' onClick={() => handleLinkClick(link.shortUrl, link.originalUrl)}>
            <td>{link.shortUrl}</td>
            {copiedLinks[link.shortUrl] && (
              <span className="text-green-500 absolute top-12 left-56 mt-1 mr-2">Copied</span>
            )}
          </div>
          <div className='relative mr-3'>
            <Tooltip title="Copy Short Link" placement="top">
              <IconButton>
                <FaRegCopy
                  onClick={() => handleCopyClick(link.shortUrl)}
                  className={`cursor-pointer absolute top-0 text-sm text-orange-600 mb-3 transition duration-300 ease-in-out transform hover:scale-110 ${copiedLinks[link.shortUrl] ? 'text-green-500' : ''}`}
                />
              </IconButton>
            </Tooltip>
          </div>      
          <td className='scrollablefull'><a href={link.originalUrl} target="_blank" rel="noopener noreferrer">{link.originalUrl}</a></td>
          <td className='w-32 mbl-short'><LuMousePointerClick className='inline mr-4 text-red-400 text-xl'/>{link.clicks}</td>
          <td className='table-cell text-green-600 w-32 mbl-short'>{link.status}</td>
          <td className='w-32 mbl-short'>{new Date(link.date).toLocaleDateString()}</td>
          <td className='w-20 mbl-short'>
            <div className='relative mr-3'>
              <Tooltip title="Delete Link" placement="top">
                <IconButton>
                  <MdDelete
                    className='inline absolute -top-1 text-orange-600 h-5 mt-0 mb-3 cursor-pointer'
                    onClick={() => openDeleteConfirmation(link._id)}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </td>
        </tr>
        {isConfirmationModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-transparent opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white p-4">
                  <p className="text-xl text-gray-700 font-bold">Confirm Deletion</p>
                  <p className='text-gray-700'>Are you sure you want to delete this link?</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleDeleteLink}   // Use linkToDelete state
                      className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
</tbody>

        </table>
      </div>
      {userLinks.length === 0 && <p>No links found.</p>}
        </TabPanel>
        
        {/* <TabPanel value="3">
        <LinkShorteningChart />
        </TabPanel> */}
      </TabContext>
    </Box>

      </Layout>
    <Footer/>
    </ProtectedRoute>
    </div>
    </>
  )
}

export default Page;
