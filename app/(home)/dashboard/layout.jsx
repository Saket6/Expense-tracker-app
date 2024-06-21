"use client"
import Navbar from '@/Components/Navbar'
import { useTheme } from 'next-themes'

import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

function Layout({ children }) {

    const { theme } = useTheme();
    const [isNavbar, setNavbar] = useState(false);


    useEffect(()=>
    {
        console.log(theme);
    },[theme])

    useEffect(() => {
        console.log(isNavbar);
    }, [isNavbar])

    return (

        <div className='grid  items-center lg:items-stretch  grid-cols-1 lg:grid-cols-11   min-h-screen p-0'>
            {/* <div className=''> */}
            <  >
            <div className='sticly top-0 col-span-2 flex justify-center items-start dark:bg-gray-950'>
             <Navbar isOpen={isNavbar} />
            </div>
              
                {/* <div className='p-7 flex justify-end lg:hidden z-10 bg-gray-900 w-full  sticky top-0 right-0 '> */}
                    <div className=' z-50  lg:hidden fixed top-5 right-5 p-2 md:p-0 bg-gray-300 dark:bg-gray-800 rounded-sm transitin-all duration-100 hover:bg-gray-200 dark:hover:bg-gray-600'>
                        {
                            !isNavbar?<Menu className=' block z-30' size="20px" onClick={() => setNavbar(!isNavbar)} />:
                            <X className=' block z-30' size="20px" onClick={() => setNavbar(!isNavbar)}   />
                        }
                        
                    </div>
                {/* </div> */}
            </>
            {/* </div> */}
            <div className={` col-span-1 min-h-screen md:col-span-7 lg:col-span-9 min-w-full rounded-lg p-5 lg:px-8  '} `}>
                {children}
            </div>
        </div>
    )
}

export default Layout