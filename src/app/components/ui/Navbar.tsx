import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <>
    <nav className='py-10'>
    <header className="sticky inset-x-0 z-30 mx-auto w-11/12 border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg rounded-3xl">
  <div className="px-4">
    <div className="flex items-center justify-between">
      <div className="flex shrink-0">
        <Link aria-current="page" className="flex items-center" href="/">
          <Image
            className="h-7 w-auto"
            width={200}
            height={200}
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Logo"
          />
          <p className="sr-only">Website Title</p>
        </Link>
      </div>
      <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
        <Link
          aria-current="page"
          className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="#"
        >
          Home
        </Link>
        <Link
          className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="#"
        >
          Cart
        </Link>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Link
          className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
          href="/login"
        >
         Login
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/login"
        >
           Sign up
        </Link>
      </div>
    </div>
  </div>
</header>
    </nav>

    </>
  )
}

export default Navbar