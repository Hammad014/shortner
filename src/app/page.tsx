import Image from "next/image";
import Footer from "./components/Footer";
import Main from './main/page'
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
   <Navbar showSignIn={true} showRegister={true}/>
     <Main/>
    <Footer/>
    </>
  );
}
