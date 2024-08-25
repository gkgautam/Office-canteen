import { getAllMyOrders } from '@/actions/orders/getOrders';
import React from 'react';

interface PaymentDetails {
  order_by_email: string;
  subTotal: number;
  shippingCharge: number;
  grandTotal: number;
}

interface OrderDetail {
  _id: string; // Assuming this is a string representation of the ObjectId
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number;
  menuItemImage: string | null;
  quantity: number;
}

interface Order {
  paymentDetails: PaymentDetails;
  _id: string; // Assuming this is a string representation of the ObjectId
  orderDetails: OrderDetail[]; // Array of order detail objects
  orderStatus: 'confirmed' | 'cancelled' | 'preparing' | 'pending' | 'ready' | 'completed';
  pickup_slot_time: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number; // Version key, usually a number
}[]

interface resposne {
  success: boolean,
  statusCode: number,
  message: string,
  data: Order[]
}

const MyOrdersPage = async () => {

  // const myOrders: resposne = await getAllMyOrders("pankaj@gmail.com");

  // if (!myOrders.success) {
  //   return <div>Error loading orders</div>;
  // }

  return (
    <>
      to do
      {/* <div className="grid gap-8">
        {
          myOrders.data && myOrders.data.map((order, index) => {
            return (
              // <div className={`flex items-center justify-between`} key={index}>
              //   <div className="flex flex-col rounded-lg w-full bg-white sm:flex-row">
              //     <div className="w-52 h-32">
              //       {
              //         order.menuItemImage && <img
              //           className="h-full w-full aspect-square rounded-md border object-cover object-top"
              //           src={order.menuItemImage}
              //           alt={order.menuItemName}
              //         />
              //       }
              //     </div>
              //     <div className="flex w-full flex-col px-4">
              //       <span className="font-semibold capitalize">
              //         {order.menuItemName}
              //       </span>
              //       <span className="float-right text-sm text-gray-600 capitalize">{order.menuItemCategory}</span>
              //       <p className="float-right text-xs mt-2 text-gray-500">{order.menuItemDescription}</p>
              //       <p className="text-lg font-bold">Rs. {order.menuItemPrice}</p>
              //     </div>
              //   </div>

              // </div>
            )
          })
        }
      </div> */}
    </>
  )
}

export default MyOrdersPage