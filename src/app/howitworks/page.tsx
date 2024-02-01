import React from 'react'

const page = () => {
  return (
    <>
    <div>
      {/* <Navbar showSignIn={true} showRegister={true} /> */}
      <div className="articles max-w-5xl mt-10 ml-10 text-justify p-6">
        <h1 className="text-3xl font-semibold mb-6">How It Works: A Guide to </h1>
        
        <p>
          Welcome to  We understand that getting started with a new platform can be overwhelming, so we have created this guide to help you navigate our link shortening service.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">1. Sign Up or Log In:</h2>
          <p>
            To begin using , you can sign up for a new account or log in if you already have one. This step allows you to access additional features and track your link analytics.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">2. Dashboard Overview:</h2>
          <p>
            Once logged in, you will be directed to your dashboard. Here, you can see a summary of your shortened links, analytics, and account settings. The dashboard is designed to provide a quick overview of your link activity.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">3. Shorten Your First Link:</h2>
          <p>
            To shorten a link, simply paste the long URL into the designated area on the dashboard. Click the Shorten button, and voila You will receive a shortened version of your link that is ready to be shared.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">4. Customize Your Shortened Links:</h2>
          <p>
             Allows you to customize your shortened links. Simply click on the Customize option when shortening a link, and you can create a personalized URL that reflects your brand or content.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">5. View Link Analytics:</h2>
          <p>
            Gain insights into the performance of your links through our analytics feature. Track the number of clicks, geographic locations of users, and referral sources. This data helps you understand how your audience interacts with your links.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">6. Share Your Shortened Links:</h2>
          <p>
            Once your link is shortened, share it across your preferred platforms: social media, emails, websites, or any other channels. Your audience will be directed to the original URL when they click on the shortened link.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">7. Monitor and Manage Your Links:</h2>
          <p>
            Easily manage your shortened links from the dashboard. You can edit, delete, or track the performance of each link. This level of control ensures that your links are always up to date.
          </p>
        </section>
      </div>
    </div>
    </>
  )
}

export default page;
