"use client";

import useCartStore from '@/store/cart';
import Link from 'next/link';
import React from 'react';

const UserCart = () => {

  const { data } = useCartStore();

   
  return (
    <>
      {
        data.map((item, index) => {
          return (
            <div className="" key={index}>
              <span>{item._id}</span>
              <span>{item.menuItemName}</span>
            </div>
          )
        })
      }
      <div className="">
        <Link href="/user/checkout" className=''>
          Place your order
        </Link>
      </div>
    </>
  )
}

export default UserCart;