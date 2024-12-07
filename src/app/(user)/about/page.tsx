import React from 'react'
import devDp from '/public/dev.jpeg';
import Image from 'next/image';

function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://c8.alamy.com/comp/2JEJJNM/220627-fuzhou-june-27-2022-xinhua-senior-citizens-queue-up-to-get-meals-at-a-canteen-for-elderly-people-at-a-community-in-jinan-district-of-fuzhou-capital-of-southeast-chinas-fujian-province-june-21-2022-since-2019-fuzhou-has-promoted-community-based-care-for-the-elderly-people-by-providing-them-with-meal-service-and-holding-lectures-for-them-to-enrich-their-life-now-senior-citizen-could-enjoy-meal-service-at-over-180-canteens-specially-arranged-for-them-in-fuzhou-xinhuajiang-kehong-2JEJJNM.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white py-24 px-6">
          <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            About Our Canteen App
          </h1>
          <p className="text-xl font-light mb-6 animate__animated animate__fadeInUp animate__delay-2s">
            Revolutionizing your canteen experience with seamless ordering and convenience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-bold mb-4 text-primary">Our Mission</h2>
          <p className="text-lg mb-6 text-gray-700">
            Our mission is to revolutionize the way you interact with your office canteen. We aim to provide a seamless and user-friendly experience, saving you time and effort.
          </p>
        </div>

        <div className="text-center mb-16 animate__animated animate__fadeInUp animate__delay-3s">
          <h2 className="text-4xl font-bold mb-4 text-primary">How It Works</h2>
          <ol className="list-decimal list-inside mb-6 space-y-4 text-lg text-gray-700">
            <li>Browse our extensive menu and select your desired items.</li>
            <li>Place your order with a few simple taps.</li>
            <li>Track your order status in real-time.</li>
            <li>Pick up your order at your convenience.</li>
          </ol>
        </div>

        <div className="text-center mb-16 animate__animated animate__fadeInUp animate__delay-4s">
          <h2 className="text-4xl font-bold mb-4 text-primary">Our Team</h2>
          <p className="text-lg mb-6 text-gray-700">
            Our dedicated team of developers and designers has worked tirelessly to create this innovative app. We are committed to providing exceptional service and continuously improving your canteen experience.
          </p>
        </div>

        <div className="text-center animate__animated animate__fadeInUp animate__delay-5s">
          <p className="text-lg mb-4 text-gray-700">
            We believe that our app will significantly enhance your daily routine and make your canteen experience more enjoyable.
          </p>
        </div>
              {/* Developer Section with Profile Image */}
      <div className="flex flex-col items-center mt-16 bg-gray-100 p-6 rounded-lg shadow-lg">
        {/* <img
          src="devDp" // Placeholder for profile picture
          alt="Developer Picture"
          className="rounded-full w-24 h-24 mb-4"
        /> */}
                <Image
                src={devDp}
                width={100}
                height={100}
                alt="Developer"
                className="rounded-full"
              />
        <h3 className="text-xl font-semibold mb-2">About The Developer</h3>
        <p className="text-lg text-gray-700 text-center">
          Hello, I am a passionate developer with a strong background in MERN stack and web technologies. I strive to create intuitive, user-friendly applications that improve peoples everyday lives. With a focus on solving real-world problems and continuously learning new skills, I am excited about contributing to meaningful projects and enhancing user experiences.
        </p>
      </div>
      </div>
    </div>
  )
}

export default About


