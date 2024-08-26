"use client";
import { addUser } from '@/actions/users/signup/route';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface UserProfile {
    profileImage: File | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone:string // Changed type to File | null
    gender:string
  }

function SignUp() {
    const [initialValues, setInitialValues] = useState({
        profileImage: null,
        firstName: "",
        lastName : "",
        email: "",
        password: "",
        phone: "",
        gender:""
      });



      const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

      useEffect(() => {
        if (initialValues.profileImage !== null && typeof initialValues.profileImage === "object") {
          // Generate a preview URL for the existing image if it's a File object
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(initialValues.profileImage);
        } else {
          setImagePreview(null);
        }
      }, [initialValues.profileImage]);
    
      const formik = useFormik({
        initialValues, onSubmit
      });
    
      async function onSubmit(value: UserProfile) {
        const formData = new FormData();
        // console.log('superman',value);
        formData.append("firstName", value.firstName);
        formData.append("lastName", value.lastName);
        formData.append("email", value.email);
        formData.append("password", value.password);
        formData.append("phone",value.phone)
        formData.append("gender",value.gender)
    
        if (value.profileImage) {
          formData.append("profileImage", value.profileImage);
        }
        const res = await addUser(formData);
    // console.log(res);
      alert(res.message);
    
      }
    
      const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
        formik.setFieldValue("profileImage", file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview(null);
        }
      };


  return (
    <>
  {/* Card Section */}
  <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
    {/* Card */}
    <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Signup
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Add your name, password and account settings.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Grid */}
        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
              Profile photo
            </label>
          </div>
          {/* End Col */}
          <div className="sm:col-span-9">
            <div className="flex items-center gap-5">
            {imagePreview ? (
                      <Image
                        src={imagePreview as string}
                        className=" size-16 rounded-full ring-2 ring-dark dark:ring-neutral-900"
                        width={100}
                        height={100}
                        alt="profile-image"
                      />
                    ) :       <img
                    className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    src="https://preline.co/assets/img/160x160/img1.jpg"
                    alt="Avatar"
                  />
                    }
              
              <div className="flex gap-x-2">
              <input
                      type="file"
                      id="menu-item-image"
                      accept='image/*'
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      onChange={handleImageChange}
                    />
              </div>
            </div>
          </div>
          {/* End Col */}
          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-full-name"
              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Full name
            </label>
            <div className="hs-tooltip inline-block">
              <svg
                className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              <span
                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                role="tooltip"
              >
                Displayed on public forums, such as office-canteen
              </span>
            </div>
          </div>
          {/* End Col */}
          <div className="sm:col-span-9">
            <div className="sm:flex">
              <input
                id="af-account-full-name"
                type="text"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-200"
                placeholder="Maria"
                {...formik.getFieldProps("firstName")}
              />
              <input
                type="text"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Boone"
                {...formik.getFieldProps("lastName")}
              />
            </div>
          </div>
          {/* End Col */}
          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-email"
              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Email
            </label>
          </div>
          {/* End Col */}
          <div className="sm:col-span-9">
            <input
              id="af-account-email"
              type="email"
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="maria@site.com"
              {...formik.getFieldProps("email")}
            />
          </div>
          {/* End Col */}
          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-password"
              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Password
            </label>
          </div>
          {/* End Col */}
          <div className="sm:col-span-9">
            <div className="space-y-2">
              <input
                id="af-account-password"
                type="text"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}

              />

            </div>
          </div>
          {/* End Col */}
          <div className="sm:col-span-3">
            <div className="inline-block">
              <label
                htmlFor="af-account-phone"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Phone
              </label>
            </div>
          </div>
          {/* End Col */}
          <div className="sm:col-span-9">
            <div className="sm:flex">
              <input
                id="af-account-phone"
                type="text"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="+x(xxx)xxx-xx-xx"
                {...formik.getFieldProps("phone")}
                
              />
            </div>
          </div>
          {/* End Col */}
          <div className="sm:col-span-3">
            <label
              htmlFor="af-account-gender-checkbox"
              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Gender
            </label>
          </div>
          {/* End Col */}
          <div className="sm:col-span-9">
            <div className="sm:flex">
              <label
                htmlFor="af-account-gender-checkbox"
                className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500"
                  checked={formik.values.gender === 'male'}
                  onChange={() => formik.setFieldValue('gender', 'male')}
                />
                <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                  Male
                </span>
              </label>
              <label
                htmlFor="af-account-gender-checkbox-female"
                className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500"
                    checked={formik.values.gender === 'female'}
                    onChange={() => formik.setFieldValue('gender', 'female')}
                  />

                <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                  Female
                </span>
              </label>
              <label
                htmlFor="af-account-gender-checkbox-other"
                className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              >
                <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500"
                    checked={formik.values.gender === 'other'}
                    onChange={() => formik.setFieldValue('gender', 'other')}
                  />
                <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                  Other
                </span>
              </label>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
        <div className="mt-5 flex justify-end gap-x-2">
          <button
            type="submit"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
    {/* End Card */}
  </div>
  {/* End Card Section */}
</>

  )
}

export default SignUp