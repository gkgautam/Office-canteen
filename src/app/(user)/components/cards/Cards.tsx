"use client";

import useCartStore from '@/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface MenuData {
  currentItem: {
    _id: string;
    menuItemName: string;
    menuItemCategory: string;
    menuItemDescription: string;
    menuItemPrice: number;
    menuItemImage: string | null; // Changed type to File | null
    quantity: number;
  }
}
function Cards({ currentItem }: MenuData) {

  const { addItem, data } = useCartStore();

  const saveToCart = () => {
    addItem(currentItem);
  }

  return (
    <>
      <div className="group overflow-hidden flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className=" flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
          {
            currentItem.menuItemImage !== null &&
            <Image className='w-full h-60 object-cover' src={currentItem.menuItemImage} width={500} height={500} alt='MenuItem Image' />
          }
        </div>
        <div className="p-4 md:p-6 h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                {currentItem.menuItemName}
              </h3>
              <span className="mt-3 text-gray-500 dark:text-neutral-500">
                {currentItem.menuItemCategory}
              </span>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                {currentItem.menuItemDescription}
              </p>
            </div>
            <p className="mt-auto font-bold text-xl text-gray-800 dark:text-neutral-300">
              ₹ {currentItem.menuItemPrice}
            </p>
          </div>
        </div>
        <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
          {
            data.find((item => item._id === currentItem._id))?.quantity as number > 0 ? <Link href="/user/cart" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">Go to cart</Link> : <button
              onClick={saveToCart}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              Add to Cart
            </button>
          }
          <button
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            Order Now
          </button>

        </div>
      </div>
    </>
  )
}

export default Cards