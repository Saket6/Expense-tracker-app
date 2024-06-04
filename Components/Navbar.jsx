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
        <>
         <div className="lg:border-r-2 lg:px-4  dark:bg-gray-950 dark:border-gray-800 lg:sticky  lg:top-0 lg:left-0 hidden md:block  min-h-screen left-slide  bg-opacity-95 transition-all duration-150 lg:py-8 lg:bg-transparent lg:h-100% md:h-auto  w-full lg:col-span-2">
            <div className="user flex flex-col justify-center items-center ">
               
               {
                user?<UserButton afterSignOutUrl='/sign-in' appearance={userButtonAppearance} />: 
                <div className='p-10 rounded-full bg-gray-700 animate-pulse'>

                </div>

               }
        
                <ThemeChanger appearance={userButtonAppearance}/>
            </div>
            <nav className='mt-4'>
                <ul>
                    {NavItems.map((item, index) => (
                        <li key={index} className='w-full'>
                            <Link href={item.link} className={`flex px-2 py-3 ${path === (item.link) && `bg-gray-300  dark:bg-gray-900`} transition-all duration-100  rounded-lg mb-2  hover:bg-gray-300 dark:hover:bg-gray-900`}>
                                <span className='mr-3'>{item.icon}</span>
                                <span className='mr-3'>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>

        {
            isOpen?(
                <div className="z-50 fixed lg:hidden top-0 left-0 min-w-64 min-h-screen  left-slide  dark:bg-opacity-95 bg-opacity-95 transition-all duration-150   p-4  bg-gray-300 dark:bg-gray-950 md:h-auto  py-4 ">
                <div className="user flex flex-col justify-center items-center ">
                   
                   {
                    user?<UserButton afterSignOutUrl='/sign-in' appearance={userButtonAppearance} />: 
                    <div className='p-10 rounded-full bg-gray-700 animate-pulse'>
    
                    </div>
    
                   }
            
                    <ThemeChanger appearance={userButtonAppearance}/>
                </div>
                <nav className='mt-4'>
                    <ul>
                        {NavItems.map((item, index) => (
                            <li key={index} className='w-full'>
                                <Link href={item.link} className={`flex px-2 py-3 ${path === (item.link) && `bg-gray-400 dark:bg-gray-900`} transition-all duration-100  rounded-lg mb-2 hover:bg-gray-400 dark:hover:bg-gray-900`}>
                                    <span className='mr-3'>{item.icon}</span>
                                    <span className='mr-3'>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            ):""
        }
        </>
       
    )
}


export default Navbar