import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const page = () => {
  return (
    <>
    <Layout>
    <div>
      <Navbar showSignIn={true} showRegister={true} showHome={true}/>
      <div className="articles max-w-5xl font-fam text-justify mt-10 ml-10 p-6">
        <h1 className="text-3xl font-semibold mb-6">Terms of Service for [Your Link Shortener Website]</h1>
        <p>Effective Date: [Date]</p>

        <p>
          Welcome to [Your Link Shortener Website]! We are excited to have you on board. Before you start using our services, please take a moment to read our Terms of Service. By accessing or using [Your Link Shortener Website], you agree to comply with and be bound by these terms.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using [Your Link Shortener Website], you agree to be bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any part of these terms, you may not use our services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">2. Use of Services</h2>
          <h4>Link Shortening:</h4>
          <ul>
            <li>[Your Link Shortener Website] allows users to create shortened links. You agree not to use the service for any illegal or unauthorized purpose.</li>
            <li>You are responsible for the links you create, and any associated content must comply with our guidelines.</li>
          </ul>
          <h4>Account Registration:</h4>
          <ul>
            <li>To access certain features, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information.</li>
          </ul>
          <h4>Prohibited Activities:</h4>
          <ul>
            <li>You may not engage in any activities that violate applicable laws, regulations, or these Terms of Service.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">3. User Content</h2>
          <h4>Ownership:</h4>
          <p>You retain ownership of the content you submit to [Your Link Shortener Website]. By submitting content, you grant [Your Link Shortener Website] a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute the content.</p>
          <h4>Prohibited Content:</h4>
          <p>You may not submit content that is illegal, obscene, threatening, defamatory, or violates the rights of others.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
          <h4>Trademarks:</h4>
          <p>[Your Link Shortener Website] and its logo are trademarks owned by [Your Company Name]. You may not use our trademarks without our prior written permission.</p>
          <h4>Copyright:</h4>
          <p>All content and materials on [Your Link Shortener Website] are protected by copyright. You may not reproduce, distribute, or create derivative works without our permission.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">5. Privacy</h2>
          <h4>Data Collection:</h4>
          <p>[Your Link Shortener Website] collects and processes user data in accordance with our Privacy Policy. By using our services, you consent to the collection and use of your information.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
          <h4>Termination by [Your Company Name]:</h4>
          <p>[Your Company Name] reserves the right to terminate or suspend your account at any time, without prior notice, for violating these Terms of Service.</p>
          <h4>Termination by User:</h4>
          <p>You may terminate your account by discontinuing the use of our services.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>[Your Company Name] reserves the right to update or modify these Terms of Service at any time. We will notify users of significant changes, and continued use of our services after such changes constitutes acceptance of the updated terms.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at [Your Contact Email].</p>
        </section>
      </div>
    </div>
    </Layout>
    <Footer/>
    </>
  )
}

export default page
