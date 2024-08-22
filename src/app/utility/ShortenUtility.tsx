// commonUtils.ts

import { useEffect, useState } from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';


interface Link {
  _id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: string;
  date: string;
}

export const useShortenLink = () => {
  const [autoPaste, setAutoPaste] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);


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
      const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl: inputValue });
      setShortenedUrl(`${response.data.shortUrl}`);
      setIsCopied(false);
    } catch (error) {
      console.error('Error shortening link:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const shortenLink = async () => {
    try {
      const userEmail=localStorage.getItem('email');
      console.log('Eamail is ', userEmail);
      const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl: inputValue });
      setShortenedUrl(response.data.shortUrl);
      setIsCopied(false);
    } catch (error) {
      console.error('Error shortening link:', error);
    }
  };

 
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        
        const userEmail=localStorage.getItem('email');
        console.log('Eamail is ', userEmail);
        const response = await axios.get('http://localhost:5000/api/links');
        const baseShortUrl = `http://localhost:5000/`;
        const sortedLinks = response.data
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((link: any) => ({
          ...link,
          shortUrl: baseShortUrl + link.shortUrl,  // Append the base URL here
        }));

      setLinks(sortedLinks);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };
  
    fetchLinks();
  }, []);

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
      // Remove the frontend redirecting logic here
      // No need for axios.get(`http://localhost:5000/api/link/${shortUrl}`);
      // Remove the window.open logic

      // Now the redirection is handled on the server side
    } catch (error) {
      console.error('Error tracking link click:', error);
    }
  };

  const buttonText = shortenedUrl ? (isCopied ? 'Copied!' : 'Copy') : 'Shorten';

  const buttonClickHandler = shortenedUrl ? () => setIsCopied(copy(shortenedUrl)) : handleShortenClick;

  return {
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
    setLinks,
    handleSwitchClick,
    handleShortenClick,
    isLoading,
    shortenLink,
    copyLink,
    handleInputChange,
    handleCopyClick,
    handleLinkClick,
    buttonText,
    buttonClickHandler,


    
  };
};
