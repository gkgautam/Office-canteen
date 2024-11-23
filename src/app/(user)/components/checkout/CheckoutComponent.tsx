"use client";

import { addOrder } from '@/actions/orders/addOrder';
import useCartStore from '@/store/cart';
import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface MenuDataProps {
  orderDetails: {
    _id: string;
    menuItemName: string;
    menuItemCategory: string;
    menuItemDescription: string;
    menuItemPrice: number;
    menuItemImage: string | null;
    quantity: number | 1; // Ensure quantity is a number
  }[],
  paymentDetails: {
    order_by_email: string;
    subTotal: number;
    shippingCharge: number;
    grandTotal: number;
  },
  orderStatus: string | 'confirmed' | 'cancelled' | 'preparing' | 'pending' | 'ready' | 'completed';
  pickup_slot_time: string;
}

function CheckoutComponent() {

  const { data, increaseQuantity, decreaseQuantity, deleteItem, orderItemId, setOrderItemId } = useCartStore();
  const { user } = useUserStore();

  const [pickupSlot, setPickupSlot] = useState("12pm");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePickupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPickupSlot(event.target.value)
  }

  // const totalAmount = data.reduce((total, item) => {
  //   return total + (item.menuItemPrice * item.quantity);
  // }, 0);

  const shippingCharge = 1;

  const [orderData, setOrderData] = useState<MenuDataProps>({
    orderDetails: [],
    paymentDetails: {
      order_by_email: "",
      subTotal: 0,
      shippingCharge: 0,
      grandTotal: 0,
    },
    orderStatus: '',
    pickup_slot_time: ""
  });


  useEffect(() => {

    let itemsToDisplay = data;

    if (orderItemId) {
      itemsToDisplay = data.filter(item => item._id === orderItemId);
    }

    const totalAmount = itemsToDisplay.reduce((total, item) => {
      return total + (item.menuItemPrice * item.quantity);
    }, 0);

    const shippingCharge = 1;

    setOrderData({
      orderDetails: itemsToDisplay,
      paymentDetails: {
        order_by_email: user?.email || "",
        subTotal: totalAmount,
        shippingCharge: shippingCharge,
        grandTotal: totalAmount + shippingCharge
      },
      orderStatus: "confirmed",
      pickup_slot_time: pickupSlot
    });

  }, [data, pickupSlot, orderItemId, user?.email]);

  async function handleOrderSubmit() {
    setLoading(true);
    const res = await addOrder(orderData);
    if (res.success) {
      alert("Order Placed Successfully !");
      for (let i = 0; i < data.length; i++) {
        deleteItem(data[i]._id);
      }
      setOrderItemId(null);
      router.push("/user/my-orders");
    }
    else {
      alert("nhi hua")
    }
    setLoading(false);
  }

  if (data.length === 0) {
    return "Please add items."
  }

  return (
    <>
      <div className="flex items-center border-b bg-white py-4 w-full">
        <div className="text-2xl font-bold text-gray-800">
          Order Checkout
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <div className="mt-8">

          <div className="rounded-lg border bg-white px-2 py-6 sm:px-6 space-y-6">
            {
              orderData.orderDetails.map((item, index) => { // cart array
                return (
                  <div className={`flex items-center justify-between`} key={index}>
                    <div className="flex flex-col rounded-lg w-full bg-white sm:flex-row">
                      <div className="w-52 h-32">
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
                        <span className="float-right text-sm text-gray-600 capitalize">{item.menuItemCategory}</span>
                        <p className="float-right text-xs mt-2 text-gray-500">{item.menuItemDescription}</p>
                        <p className="text-lg font-bold">Rs. {item.menuItemPrice * item.quantity}</p>
                        <div className="py-2 inline-block bg-white rounded-lg dark:bg-neutral-900" data-hs-input-number='{"max":10, "min":1}'>
                          <div className="flex items-center gap-x-1.5">
                            <button className='p-1 rounded-full border size-6 flex items-center justify-center font-semibold' onClick={() => { decreaseQuantity(item._id) }}>-</button>
                            <span className='px-2 border rounded-lg'>{item.quantity}</span>
                            <button className='p-1 rounded-full border size-6 flex items-center justify-center font-semibold' onClick={() => { increaseQuantity(item._id) }}>+</button>
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

          <div className='pickup-slot'>
            <p className="mt-8 text-lg font-medium">Delivery</p>
            <label
              htmlFor="menu-item-category"
              className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
            >
              Get your order ready by:
            </label>
            <select
              id="menu-item-category"
              value={pickupSlot}
              className="py-3 px-4 block w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 text-xl"
              onChange={handlePickupChange}
            >
              <option value="12pm">12 PM</option>
              <option value="1pm">1 PM</option>
              <option value="2pm">2 PM</option>
              <option value="3pm">3 PM</option>
              <option value="4pm">4 PM</option>
              <option value="5pm">5 PM</option>
              <option value="6pm">6 PM</option>
              <option value="7pm">7 PM</option>
              <option value="8pm">8 PM</option>
              <option value="9pm">9 PM</option>
            </select>
          </div>
        </div>
        <div className=" bg-gray-50 px-4 mt-8 p-4">
          <p className="text-xl font-medium">Order Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Order by</p>
                <p className="font-semibold text-gray-900">{user?.email}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">Rs. {orderData.paymentDetails.subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Desk Shipping</p>
                <p className="font-semibold text-gray-900">Rs {shippingCharge}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Grand Total</p>
              <p className="text-2xl font-semibold text-gray-900">Rs {orderData.paymentDetails.grandTotal}</p>
            </div>
          </div>
          <button onClick={handleOrderSubmit} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Make payment
          </button>
        </div>
      </div>
    </>
  )
}

export default CheckoutComponent