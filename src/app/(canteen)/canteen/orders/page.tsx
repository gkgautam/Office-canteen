import React from 'react'
import Orderlist from '../../components/Orderlist'
import { getOrders } from '@/actions/orders/getOrders';

async function CanteenOrder() {

  let data = null;
  const res = await getOrders();
  if (res.success && res.data) {
    data = JSON.parse(res.data);
  }

  return (
    <>
      <Orderlist data={data} />
    </>
  )
}

export default CanteenOrder