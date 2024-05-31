"use client"
import React from 'react'
import { LayoutDashboard } from 'lucide-react'
import { Info } from 'lucide-react'
import { ArrowLeftRight } from 'lucide-react'
import { Receipt } from 'lucide-react'
import { IndianRupee } from 'lucide-react'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { ThemeChanger } from '@/Components/ThemeChanger'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { PiggyBank } from 'lucide-react'

function Navbar({isOpen}) {

    const {theme} =useTheme();

    const {user} = useUser();
    const path=usePathname();

    const NavItems = [
        {
            name: 'Dashboard',
            icon: <LayoutDashboard />,
            link: '/dashboard'
        },
        {
            name: 'Budgets',
            link: '/dashboard/budgets',
            icon: <PiggyBank />,

        },
        // {
        //     name: 'Transactions',
        //     link: '/dashboard/transactions',
        //     icon: <ArrowLeftRight />,
        // },
        {
            name: 'Expenses',
            link: '/dashboard/expenses',
            icon: <Receipt />,
        },
        // {
        //     name: 'Incomes',
        //     link: '/dashboard/incomes',
        //     icon: <IndianRupee />,

        // },
       
        {
            name: 'About',
            icon: <Info />,
            link: '/dashboard/about'
        },
    ]

    const userButtonAppearance = {
        elements: {
          userButtonAvatarBox: {
            width: '70px', 
            height: '70px',
            marginBottom: '10px'
          },
          userButtonPopover: {
            minWidth: '200px',
            padding: '20px',
          },

        },
      };

    return (
        <div className={`z-50 absolute min-h-screen w-64 top-0 left-0  ${isOpen?"":'hidden'} left-slide  bg-opacity-95 transition-all duration-150   p-4 lg:p-0   w-full  bg-gray-800 lg:bg-transparent lg:h-100% md:h-auto   lg:sticky py-4 lg:w-full lg:col-span-2  lg:block  `}>
            <div className="user flex flex-col justify-center items-center ">
               
               {
                user?<UserButton afterSignOutUrl='/sign-in' appearance={userButtonAppearance} />: 
                <div className='p-10 rounded-full bg-gray-700 animate-pulse'>

                </div>

               }
        
                {/* <ThemeChanger appearance={userButtonAppearance}/> */}
            </div>
            <nav className='mt-4'>
                <ul>
                    {NavItems.map((item, index) => (
                        <li key={index} className='w-full'>
                            <Link href={item.link} className={`flex px-2 py-3 ${path === (item.link) && `bg-gray-700`} transition-all duration-100  rounded-lg mb-2 hover:bg-gray-700`}>
                                <span className='mr-3'>{item.icon}</span>
                                <span className='mr-3'>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}


export default Navbar