"use client";

import { getAllMyOrders } from '@/actions/orders/getAllMyOrders';
import React, { useEffect, useState } from 'react';
import Invoice from '../../components/invoice/Invoice';
import { useUserStore } from '@/store/user';

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

type OrderResponse = MenuDataProps[];

const MyOrdersPage = () => {

  const [myOrders, setMyOrders] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  const getMyorders = async (email: string) => {
    try {
      setIsLoading(true);
      const res = await getAllMyOrders(email);
      if (res.success) {
        setMyOrders(JSON.parse(res.data as string));
      }
    } catch (err) {
      console.log('An error occurred', err);
    }
    finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (user?.email) {
      getMyorders(user.email);
    }
  }, [user]);

  // Mapping of order status to Tailwind CSS classes for background color
  const statusColors: Record<string, string> = {
    confirmed: "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500",
    preparing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500",
    pending: "bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500",
    ready: "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-500",
    completed: "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500",
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid gap-8">
        {
          myOrders && myOrders.length > 0 ? myOrders.map((order, index) => {
            return (
              <div className={`rounded-lg flex justify-between border bg-white px-2 py-4 sm:px-6`} key={index}>
                <div className={`flex items-center justify-between`} >
                  <div className="flex flex-col rounded-lg w-full bg-white sm:flex-row">
                    <div className="w-52 h-32">
                      {
                        order.orderDetails && order.orderDetails[0].menuItemImage && <img
                          className="h-full w-full aspect-square rounded-md border object-cover object-top"
                          src={order.orderDetails[0].menuItemImage}
                          alt={"menu-images"}
                        />
                      }
                    </div>
                    <div className="flex w-full flex-col px-4">
                      <span className="font-semibold capitalize">
                        {order.orderDetails[0].menuItemName} {order.orderDetails.length <= 1 ? "" : `+ ${order.orderDetails.length} items`}
                      </span>
                      <span className="float-right text-sm text-gray-600 capitalize">{order.orderDetails[0].menuItemCategory}</span>
                      <p className="float-right text-xs mt-2 text-gray-500">{order.orderDetails[0].menuItemDescription}</p>
                      <p className="text-lg font-bold">Total: Rs. {order.paymentDetails && order.paymentDetails.grandTotal}</p>
                      <p>
                        Status:
                        <span className={`py-1 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg w-fit capitalize ${statusColors[order.orderStatus as keyof typeof statusColors]}`}>
                          {order.orderStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    order && <Invoice key={index} order={order} id={`hs-ai-modal-${index}`} />
                  }
                </div>
              </div>
            )
          }) :
            (
              <div className="text-center p-6 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800">No Orders Found</h2>
                <p className="text-gray-600 mt-2">You have no order history at this moment.</p>
                <p className="text-gray-500 mt-1">Check back later or browse our menu to place a new order.</p>
              </div>
            )
        }
      </div>
    </>
  );
};

export default MyOrdersPage;