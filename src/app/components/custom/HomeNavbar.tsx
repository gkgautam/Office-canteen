"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: 'contact' }
  ];

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <nav className="bg-[#161851] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-2xl font-bold"
        >
          <Link href={"/"}>
            <Image
              src={`/logof.png`}
              className="w-28 rounded"
              width={200}
              height={200}
              alt="menu-image"
            /></Link>


        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-blue-300 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}

          {/* Search Bar */}
          <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
            <Search size={18} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>
          <div className="">
            <Button asChild>
              <Link href={"/signin"}>Login</Link>
            </Button>
          </div>
          <div className="">
            <Button asChild variant="outline" className='bg-inherit'>
              <Link href={"/signup"}>Register</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden absolute left-0 right-0 bg-gray-800"
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={index}
                  variants={linkVariants}
                  className="text-xl hover:text-blue-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Search */}
              <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 w-64">
                <Search size={18} className="mr-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <Button asChild>
                  <Link href={"/login"}>Login</Link>
                </Button>

                <Button asChild variant="outline" className='bg-inherit'>
                  <Link href={"/user/signup"}>Register</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNavbar;