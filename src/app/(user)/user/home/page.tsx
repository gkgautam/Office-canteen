import React from 'react'
import Cards from '../../components/cards/Cards'
import { getMenu } from '@/actions/menus/fetchmenu/route'

async function UserHome() {

  const allData = await getMenu();

  return (
    <>
      {/* Card Blog */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-2">
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