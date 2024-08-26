import { getAllMyOrders } from '@/actions/orders/getOrders';
import React from 'react';
import Invoice from '../../components/invoice/Invoice';

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

  const myOrders: any = await getAllMyOrders("pankaj@gmail.com");
  console.log('batman', myOrders.data[0]);


  if (!myOrders.success) {
    return <div>Error loading orders</div>;
  }

  return (
    <>
      to do
      <div className="grid gap-8">
        {
          myOrders.data && myOrders.data.map((order:any, index:number) => {
            return (
              <div className={`rounded-lg flex justify-between border bg-white px-2 py-4 sm:px-6`} key={index}>
              <div className={`flex items-center justify-between`} >
                <div className="flex flex-col rounded-lg w-full bg-white sm:flex-row">
                  <div className="w-52 h-32">
                    {
                      order.orderDetails && order.orderDetails[0].menuItemImage && <img
                        className="h-full w-full aspect-square rounded-md border object-cover object-top"
                        src={order.orderDetails[0].menuItemImage}
                        alt={order.orderDetails[0].menuItemName}
                      />
                    }
                  </div>
                  <div className="flex w-full flex-col px-4">
                    <span className="font-semibold capitalize">
                      {order.orderDetails[0].menuItemName}
                    </span>
                    <span className="float-right text-sm text-gray-600 capitalize">{order.orderDetails[0].menuItemCategory}</span>
                    <p className="float-right text-xs mt-2 text-gray-500">{order.orderDetails[0].menuItemDescription}</p>
                    <p className="text-lg font-bold">Rs. {order.orderDetails[0].menuItemPrice}</p>
                  </div>
                </div>

              </div>
              <div>
                    {/* {order.paymentDetails.subTotal} */}
                    <Invoice order={order}/>

              </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default MyOrdersPage