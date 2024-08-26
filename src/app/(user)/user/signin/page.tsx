"use client";
import { signInUser } from '@/actions/users/signin/route';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';

interface SignInValues {
  email: string;
  password: string;
}

function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: SignInValues) => {
        console.log('signin:',values);
        const formData = new FormData();
        // console.log('superman',value);
        formData.append("email", values.email);
        formData.append("password", values.password);
        const res = await signInUser(formData);
    // console.log(res);
      alert(res.message);
    },
  });

  return (
    <>
      {/* Card Section */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
              Sign In
            </h2>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Enter your email and password to sign in.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
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
                <input
                  id="af-account-password"
                  type="password"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign In
              </button>
            </div>
          </form>
          <Link href="/user/signup" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          signup
          </Link>
        </div>
        {/* End Card */}
      </div>
      {/* End Card Section */}
    </>
  );
}

export default SignIn;
