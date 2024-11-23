"use client";

import { parseISO, format } from 'date-fns';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { updateOrderStatus } from '@/actions/orders/updateOrderStatus';

interface MenuItem {
  _id: string;
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number; // Assuming it's always an integer
  menuItemImage: string;
  quantity: number; // Assuming it's always an integer
}

interface PaymentDetails {
  order_by_email: string;
  subTotal: number;
  shippingCharge: number;
  grandTotal: number;
}

interface DataProps {
  _id: string;
  orderDetails: MenuItem[];
  paymentDetails: PaymentDetails;
  orderStatus: string;
  pickup_slot_time: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderStatusOptions = ['confirmed', 'cancelled', 'preparing', 'pending', 'ready', 'completed'];

function Orderlist({ data }: { data: DataProps[] }) {

  function convertDate(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy h:mm:ss a');
  }

  const [orders, setOrders] = useState<DataProps[]>(data);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(prev => (prev === orderId ? null : orderId));
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {

    // Update local state
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success) {
      alert(`Status Updated ${newStatus}`);
    }
  };


  return (
    <>
      {
        orders.length > 0 && <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                        All Orders
                      </h2>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Order No.
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Name
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Order by
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Payment Amount
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Order Status
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Order On
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-end" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {
                        orders.map((order, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="text-sm text-gray-600 lowercase font-semibold dark:text-neutral-400">
                                      {index + 1}
                                    </span>
                                  </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="text-sm text-gray-600 lowercase font-semibold dark:text-neutral-400">
                                      {order.paymentDetails.order_by_email.split("@")[0]}
                                    </span>
                                  </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <div className="flex items-center gap-x-2">
                                      <div className="grow">
                                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                                          {order.paymentDetails.order_by_email}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <div className="flex items-center gap-x-2">
                                      <div className="grow flex flex-col">
                                        <span className="text-sm text-gray-600 font-semibold dark:text-neutral-400">
                                          ₹ {order.paymentDetails.grandTotal}
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                                          ({order.orderDetails.length} Item)
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500 capitalize">
                                      <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="bg-transparent rounded-md p-1 text-xs"
                                      >
                                        {orderStatusOptions.map(status => (
                                          <option key={status} value={status}>
                                            {status}
                                          </option>
                                        ))}
                                      </select>
                                    </span>
                                  </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="text-sm text-gray-600 dark:text-neutral-400">
                                      {convertDate(String(order.createdAt))}
                                    </span>
                                  </div>
                                </td>
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-1.5">
                                    <button onClick={() => toggleOrderDetails(order._id)}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`${expandedOrder === order._id ? "rotate-180" : ""} transition-transform`}
                                      >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 9l6 6l6 -6" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              <AnimatePresence>
                                {
                                  expandedOrder === order._id && (
                                    <tr key={order._id}>
                                      <td colSpan={7}>
                                        <motion.div
                                          initial={{ height: 0 }}
                                          animate={{ height: 'auto' }}
                                          exit={{ height: 0 }}
                                          transition={{ duration: 0.3 }}
                                        >
                                          <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 py-4 bg-gray-100 dark:bg-neutral-800">
                                            <div className="flex items-center justify-between">
                                              <h3 className="text-lg font-semibold">Order Items</h3>
                                              <span>Ready by: {order.pickup_slot_time}</span>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                              {
                                                order.orderDetails.map((item, index) => {
                                                  return (
                                                    <div className={`rounded-lg flex justify-between border bg-white px-2 py-4 sm:px-6`} key={index}>
                                                      <div className={`flex items-center justify-between`} >
                                                        <div className="flex flex-col rounded-lg w-full bg-white sm:flex-row">
                                                          <div className="w-24 h-24 aspect-square">
                                                            {
                                                              item.menuItemImage && <img
                                                                className="h-full w-full aspect-square rounded-md border object-cover object-top"
                                                                src={item.menuItemImage}
                                                                alt={"menu-images"}
                                                              />
                                                            }
                                                          </div>
                                                          <div className="flex w-full flex-col px-4">
                                                           <p className="text-lg capitalize font-bold">{item.menuItemName}</p>
                                                            <span className="float-right text-sm text-gray-600 capitalize">{item.menuItemCategory}</span>
                                              
                                                            <p className="float-right text-xs mt-2 text-gray-500">Quantity: {item.quantity}</p>
                                                            <p className="text-sm font-medium">Price: Rs. {item.menuItemPrice}</p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                })
                                              }
                                            </div>
                                          </motion.div>
                                        </motion.div>
                                      </td>
                                    </tr>
                                  )
                                  // ))
                                }
                              </AnimatePresence>
                            </>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Orderlist