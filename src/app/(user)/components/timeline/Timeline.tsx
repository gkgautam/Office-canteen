import React from 'react'
import Descriptionlist from '../descriptionlist/Descriptionlist'

function Timeline() {
  return (
    <>
  {/* Timeline */}
  <>
  <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <a href="#" className="text-2xl font-bold text-gray-800">
      sneekpeeks
    </a>
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
  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
            alt=""
          />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">
              Nike Air Max Pro 8888 - Super Light
            </span>
            <span className="float-right text-gray-400">42EU - 8.5US</span>
            <p className="text-lg font-bold">$138.99</p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src="https://www.foodiesfeed.com/wp-content/uploads/2023/05/pizza-salami.jpg"
            alt=""
          />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">
              Nike Air Max Pro 8888 - Super Light
            </span>
            <span className="float-right text-gray-400">42EU - 8.5US</span>
            <p className="mt-auto text-lg font-bold">$238.99</p>
          </div>
        </div>
      </div>
      <div className='pickup-slot'>
      <p className="mt-8 text-lg font-medium">Delivery</p>

                    <label
                      htmlFor="menu-item-category"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Pickup Time/delivey to desk
                    </label>
                    <select
                      id="menu-item-category"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      // {...formik.getFieldProps("menuItemCategory")}
                    >
                      <option value="">Select Slot</option>
                      <option value="appetizer">Appetizer</option>
                      <option value="main_course">Main Course</option>
                      <option value="dessert">Dessert</option>
                      <option value="beverage">Beverage</option>
                    </select>
      </div>
    </div>
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Order Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <div className="">
        <p  className="mt-4 mb-2 block text-sm font-medium">
          User : Pankaj gupta
        </p> 
        <p className="mt-4 mb-2 block text-sm font-medium">
          Phone : 9846532743
        </p>


        {/* Total */}
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">$399.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Desk Shipping</p>
            <p className="font-semibold text-gray-900">$8.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">$408.00</p>
        </div>
      </div>
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
       Make payment
      </button>
    </div>
  </div>
</>


  {/* End Timeline */}
</>

  )
}

export default Timeline