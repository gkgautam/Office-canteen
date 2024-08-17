"use client";

import useCartStore from '@/store/cart';
import React from 'react';

const UserCart = () => {

  const { data } = useCartStore();

  console.log(data);
  
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
    </>
  )
}

export default UserCart;