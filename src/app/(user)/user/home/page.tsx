import React from 'react'
import Cards from '../../components/cards/Cards'
import { getMenu } from '@/actions/menus/fetchmenu/route'
// import Process from '../../components/process/Process';

async function UserHome() {

  const allData = await getMenu();

  return (
    <>
      {/* Card Blog */}
      {/* <Process/> */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card */}
          {
            allData.data?.map((menuItem, index) => {
              return <Cards currentItem={menuItem as any} key={index} />
            })
          }

        </div>
        {/* End Grid */}
      </div>
      {/* End Card Blog */}
    </>

  )
}

export default UserHome