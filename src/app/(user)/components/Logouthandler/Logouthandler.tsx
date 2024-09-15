import React from 'react'
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/user';
import { destroyCookie } from 'nookies';

function Logouthandler() {
    const { clearUser } = useUserStore();
    const router = useRouter();
  
    const handleLogout = () => {
      // Clear user data from Zustand store
      clearUser();
  
      // Remove cookie
      destroyCookie(null, 'token', { path: '/' });
  
      // Redirect to login page
      router.push('/signin');
    };
  
    return (
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Log Out
      </button>
    );
  };

export default Logouthandler