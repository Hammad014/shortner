"use client"

import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Animate from '../components/RouteAnimate';

const page = () => {
  return (
    <>
    <Animate>
    <Layout>
   
    <div className='font-fam relative'>
        <Navbar showSignIn={true} showRegister={true} showHome={true}/>
        <div className='articles max-w-5xl mt-10 ml-10 p-6'>
          <h1 className='font-semibold text-justify text-3xl mb-4'>
            Privacy Policy for <Image className='inline h-8' width={130} height={40} src='/images/Linkly.png' alt='Linkly Logo' /> :
          </h1>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>1. Introduction</h2>
            <p>
              Welcome to [Your Website Name]! This Privacy Policy outlines how we collect, use, disclose, and safeguard
              your personal information when you use our link shortening services. By accessing or using our website, you
              consent to the terms outlined in this Privacy Policy.
            </p>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>2. Information We Collect</h2>
            <h3 className='text-xl font-semibold mb-2'>a. Personal Information</h3>
            <p>
              When you use our link shortening services, we may collect the following personal information:
            </p>
            <ul className='list-disc pl-6'>
              <li>Email Address: We may collect your email address if you choose to create an account on our platform.</li>
              <li>User Account Information: If you create an account, we may collect information such as your username,
                password, and other account details.
              </li>
            </ul>
            <h3 className='text-xl font-semibold mb-2'>b. Non-Personal Information</h3>
            <p>
              We may also collect non-personal information, including:
            </p>
            <ul className='list-disc pl-6'>
              <li>Device Information: We may collect information about the device you use to access our services, such as
                the device type, operating system, and browser.
              </li>
              <li>Usage Information: We may collect information about how you interact with our website, including the
                pages you visit, the links you create, and other actions you take.
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>3. How We Use Your Information</h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className='list-disc pl-6'>
              <li>Providing Services: To create and manage short links, deliver services, and provide customer support.</li>
              <li>Account Management: To manage your account, process your requests, and send important notifications.</li>
              <li>Improving Services: To analyze user behavior, improve our website, and enhance user experience.</li>
              <li>Marketing Communications: With your consent, we may send you promotional emails about our services, new
                features, or other updates.
              </li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:</p>
            <ul className='list-disc pl-6'>
              <li>Third-Party Service Providers: We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you.</li>
              <li>Legal Compliance: We may disclose your information if required by law or in response to lawful requests by public authorities.</li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>5. Security</h2>
            <p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>6. Cookies</h2>
            <p>We use cookies to enhance your user experience. You can control and manage cookie preferences through your browser settings.</p>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>7. Your Choices</h2>
            <p>You have the right to:</p>
            <ul className='list-disc pl-6'>
              <li>Access, Update, or Delete Your Information: You can access, update, or delete your personal information by logging into your account or contacting us.</li>
              <li>Opt-Out of Marketing Communications: You can opt-out of receiving promotional emails by following the instructions in the emails or contacting us.</li>
            </ul>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>8. Children Privacy</h2>
            <p>Our services are not intended for users under the age of 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>9. Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated policy will be effective upon posting on our website. We recommend checking this page periodically for any changes.</p>
          </section>

          <section className='mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>10. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at [your contact email].</p>
          </section>
        </div>
      </div>
      </Layout>
      <Footer/>
      </Animate>
    </>
  )
}

export default page
