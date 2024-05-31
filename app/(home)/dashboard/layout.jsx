"use client";
import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
// import { useTheme } from 'next-themes';
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
import Navbar from '@/Components/Navbar';

function Layout({ children, userButtonAppearance,  path }) {
    const { theme } = useTheme();
    const [isNavbar, setNavbar] = useState(false);
    const {user} = useUser();
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

    useEffect(() => {
        console.log(isNavbar);
    }, [isNavbar]);

    return (
        <div className='grid items-center lg:items-stretch grid-cols-1 lg:grid-cols-12 md:gap-7 min-h-screen p-0 md:p-6'>
            <Navbar 
                isOpen={isNavbar} 
                user={user} 
                userButtonAppearance={userButtonAppearance} 
                NavItems={NavItems} 
                path={path} 
            />

            <div className={`col-span-1 min-h-screen md:col-span-7 lg:col-span-10 min-w-full rounded-lg p-5 ${theme !== 'light' ? 'bg-gray-900' : 'bg-gray-300'}`}>
                {children}
            </div>

            <div className='z-50 lg:hidden fixed top-5 right-5 p-2 md:p-0 bg-gray-700 rounded-lg hover:bg-gray-600'>
                <Menu className='block z-30' size="30px" onClick={() => setNavbar(!isNavbar)} />
            </div>
        </div>
    );
}

export default Layout;
