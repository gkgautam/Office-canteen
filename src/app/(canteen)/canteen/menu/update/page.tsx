import { getMenu } from '@/actions/menus/fetchmenu/route'
import MenuList from '@/app/(canteen)/components/Menulist'
import React from 'react'

// interface MenuItem {
//   menuItemName: string;
//   menuItemCategory: string;
//   menuItemDescription: string;
//   menuItemPrice: number;
//   menuItemImage: string | null;
// }
// interface dataResponse {
//     success: boolean,
//     statusCode: number,
//     message: string,
//     data:MenuItem[] ;
// }
async function CanteenUpdateMenu() {

  const allFetchedData : any  = await getMenu();

  return (

   <MenuList allFetchedData={allFetchedData.data}/>
  )
}

export default CanteenUpdateMenu