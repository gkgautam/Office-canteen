import { getAllMyOrders } from '@/actions/orders/getOrders';
import React from 'react';
import Invoice from '../../components/invoice/Invoice';
// import useUserStore from '@/store/user';

// interface PaymentDetails {
//   order_by_email: string;
//   subTotal: number;
//   shippingCharge: number;
//   grandTotal: number;
// }

// interface OrderDetail {
//   _id: string; // Assuming this is a string representation of the ObjectId
//   menuItemName: string;
//   menuItemCategory: string;
//   menuItemDescription: string;
//   menuItemPrice: number;
//   menuItemImage: string | null;
//   quantity: number;
// }

// interface Order {
//   paymentDetails: PaymentDetails ;
//   _id: string; // Assuming this is a string representation of the ObjectId
//   orderDetails: OrderDetail[]; // Array of order detail objects
//   orderStatus: 'confirmed' | 'cancelled' | 'preparing' | 'pending' | 'ready' | 'completed';
//   pickup_slot_time: string;
//   createdAt: Date; // ISO date string
//   updatedAt: Date; // ISO date string
// }[]

// interface response {
//   success: boolean,
//   statusCode: number,
//   message: string,
//   data: Order[]
// }

const MyOrdersPage = async () => {
  // const {user}= useUserStore();
  const myOrders = await getAllMyOrders('batman@gmail.com');
  // console.log('batman2', typeof myOrders.data[0].paymentDetails.subTotal);

  if (!myOrders.success) {
    return <div>Error loading orders</div>;
  }

  return (
    <>
      <div className="grid gap-8">
        {
          myOrders.data && myOrders.data.length > 0 ? (
          myOrders.data && myOrders.data.map((order, index) => {
            return (
              // <Link href="/orderitems" key={index}> 
              <div className={`rounded-lg flex justify-between border bg-white px-2 py-4 sm:px-6`} key={index} >
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
                    </div>
                  </div>

                </div>
                <div>
                  {/* {order.paymentDetails.subTotal} */}
                  {/* <Invoice order={order}/> */}
                  <Invoice key={index} order={order} id={`hs-ai-modal-${index}`} />
                </div>
              </div>
              // </Link>
            )
          })):(<div className="text-center p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">No Orders Found</h2>
            <p className="text-gray-600 mt-2">You have no order history at this moment.</p>
            <p className="text-gray-500 mt-1">Check back later or browse our menu to place a new order.</p>
          </div>)
        }
      </div>
    </>
  )
}

export default MyOrdersPage