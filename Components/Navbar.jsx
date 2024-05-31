import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/clerk-react'; // Adjust the import based on your setup

const Navbar = ({ isOpen, user, userButtonAppearance, NavItems, path }) => {
    return (
        <>
            {/* Navbar for large screens */}
            <div className="z-50 hidden md:block min-h-screen bg-opacity-95 transition-all duration-150 p-4 lg:p-0 bg-gray-800 lg:bg-transparent py-4 w-full lg:col-span-2">
                <div className="user flex flex-col justify-center items-center ">
                    {user ? (
                        <UserButton afterSignOutUrl='/sign-in' appearance={userButtonAppearance} />
                    ) : (
                        <div className='p-10 rounded-full bg-gray-700 animate-pulse'></div>
                    )}
                </div>
                <nav className='mt-4'>
                    <ul>
                        {NavItems.map((item, index) => (
                            <li key={index} className='w-full'>
                                <Link href={item.link} className={`flex px-2 py-3 ${path === item.link && 'bg-gray-700'} transition-all duration-100 rounded-lg mb-2 hover:bg-gray-700`}>
                                    <span className='mr-3'>{item.icon}</span>
                                    <span className='mr-3'>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Navbar for mobile screens */}
            {isOpen && (
                <div className="z-50 fixed lg:hidden top-0 left-0 max-w-64 min-h-screen bg-opacity-95 transition-all duration-150 p-4 bg-gray-800 md:h-auto py-4">
                    <div className="user flex flex-col justify-center items-center ">
                        {user ? (
                            <UserButton afterSignOutUrl='/sign-in' appearance={userButtonAppearance} />
                        ) : (
                            <div className='p-10 rounded-full bg-gray-700 animate-pulse'></div>
                        )}
                    </div>
                    <nav className='mt-4'>
                        <ul>
                            {NavItems.map((item, index) => (
                                <li key={index} className='w-full'>
                                    <Link href={item.link} className={`flex px-2 py-3 ${path === item.link && 'bg-gray-700'} transition-all duration-100 rounded-lg mb-2 hover:bg-gray-700`}>
                                        <span className='mr-3'>{item.icon}</span>
                                        <span className='mr-3'>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Navbar;
