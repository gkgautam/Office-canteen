import React from 'react'

function page() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="w-full h-96 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://www.shutterstock.com/shutterstock/photos/284024960/display_1500/stock-photo-vintage-office-desk-hero-header-image-284024960.jpg)' }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">Contact Us</h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-10">
        <p className="text-lg mb-6 text-center">
          Have a question or suggestion? Feel free to reach out to us. We are always happy to help!
        </p>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default page;
