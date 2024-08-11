import React from 'react'

function CanteenAddMenu() {
  return (
    <>
  {/* Hire Us */}
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto menu-form">
    <div className="max-w-xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
          Some new Recipe?
        </h1>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
        Fresh Flavors That Inspire Your Taste Buds!
        </p>
      </div>
      <div className="mt-12">
        {/* Form */}
        <form>
  <div className="grid gap-4 lg:gap-6">
    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
      <div>
        <label
          htmlFor="menu-item-name"
          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
        >
          Menu Item Name
        </label>
        <input
          type="text"
          name="menu-item-name"
          id="menu-item-name"
          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        />
      </div>
      <div>
        <label
          htmlFor="menu-item-category"
          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
        >
          Category
        </label>
        <select
          name="menu-item-category"
          id="menu-item-category"
          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        >
          <option value="">Select Category</option>
          <option value="appetizer">Appetizer</option>
          <option value="main-course">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>
    </div>
    {/* End Grid */}
    <div>
      <label
        htmlFor="menu-item-description"
        className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
      >
        Description
      </label>
      <textarea
        id="menu-item-description"
        name="menu-item-description"
        rows={4}
        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        defaultValue={""}
      />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
      <div>
        <label
          htmlFor="menu-item-price"
          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
        >
          Price
        </label>
        <input
          type="number"
          name="menu-item-price"
          id="menu-item-price"
          step="0.01"
          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        />
      </div>
      <div>
        <label
          htmlFor="menu-item-image"
          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
        >
          Upload Image
        </label>
        <input
          type="file"
          name="menu-item-image"
          id="menu-item-image"
          accept='image/*'
          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        />
      </div>
    </div>
    {/* End Grid */}
    <div className="mt-6 grid">
      <button
        type="submit"
        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Add Menu Item
      </button>
    </div>
    <div className="mt-3 text-center">
      <p className="text-sm text-gray-500 dark:text-neutral-500">
        Ensure all details are correct before submitting.
      </p>
    </div>
  </div>
</form>

        {/* End Form */}
      </div>
    </div>
  </div>
  {/* End Hire Us */}
</>

  )
}

export default CanteenAddMenu