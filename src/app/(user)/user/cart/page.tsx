"use client";

import useCartStore from '@/store/cart';
import Link from 'next/link';
import React from 'react';

const UserCart = () => {

  const { data, increaseQuantity, decreaseQuantity, deleteItem } = useCartStore();

  return (
    <>

      <div className="">
        <p className="text-xl font-medium">Cart Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {
            data.map((item, index) => {
              return (
                <div className={`flex items-center border-b py-6 last:border-b-0 justify-between`} key={index}>
                  <div className="flex flex-col rounded-lg w-full bg-white sm:flex-row">
                    <div className="w-80 h-52">
                      {
                        item.menuItemImage && <img
                          className="h-full w-full aspect-square rounded-md border object-cover object-top"
                          src={item.menuItemImage}
                          alt={item.menuItemName}
                        />
                      }
                    </div>
                    <div className="flex w-full flex-col px-4">
                      <span className="font-semibold capitalize">
                        {item.menuItemName}
                      </span>
                      <span className="float-right text-gray-600 capitalize">{item.menuItemCategory}</span>
                      <p className="float-right text-sm text-gray-500">{item.menuItemDescription}</p>
                      <p className="text-lg font-bold">Rs. {item.menuItemPrice}</p>
                      <div className="py-2 inline-block bg-white rounded-lg dark:bg-neutral-900" data-hs-input-number='{"max":10, "min":1}'>
                        <div className="flex items-center gap-x-1.5">
                          <button className='p-1 rounded-full border size-8 flex items-center justify-center font-semibold' onClick={() => { decreaseQuantity(item._id) }}>-</button>
                          <span className='px-4 border rounded-lg py-1'>{item.quantity}</span>
                          <button className='p-1 rounded-full border size-8 flex items-center justify-center font-semibold' onClick={() => { increaseQuantity(item._id) }}>+</button>
                        </div>
                      </div>
                      <button onClick={() => deleteItem(item._id)} className='bg-rose-100 w-fit px-3 py-1 rounded-lg hover:bg-rose-400 hover:text-rose-100 text-rose-500 transition-colors'>Remove</button>
                    </div>
                  </div>

                </div>
              )
            })
          }

        </div>
      </div>
      <div className="mt-6">
        <Link href="/user/checkout" className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none'>
          Place your order
        </Link>
      </div>
    </>
  )
}

export default UserCart;