"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CategoryItem from './CategoryItem'
import CreateIncome from './CreateIncome'
function CategoryList() {

  const { user } = useUser();
  const [CategoryList, setCategoryList] = useState([]);
  const getCategoryList = async () => {
    try {
      const res = await axios.post('/api/get-IncomeCategories', { user });
      const categories = res.data;
      setCategoryList(categories.data);
      console.log(categories.data);
    }
    catch (e) { console.log(e); }
  }

  useEffect(() => {
    getCategoryList();
  }, [user])
  return (
    <div>
      {/* <div className='flex justify-between items-center   '> */}
        <div className='header md:border-b-2 flex md:flex-row md:justify-between md:items-center flex-col border-gray-700'>
          <div>
            <h1 className='  dark:text-white text-xl  md:text-4xl font-bold'>My Incomes</h1>
            <h3 className=' text-xs md:text-sm pb-3'>You can check your incomes here...</h3>
          </div>

          <CreateIncome refresh={getCategoryList} />
        </div>

        <div className='create'>


        </div>

      {/* </div> */}
      <div className="items row-span-1">

      </div>
      <div className="mt-4 md:py-4   budgetList grid grid-cols-1 lg:grid-cols-3 gap-5">
        {
          CategoryList?.length > 0 ? (
            CategoryList.map((category, index) => (
              <div key={index}>
                <CategoryItem category={category} />
              </div>
            ))
          ) : (
            [1, 2, 3, 4, 5, 6].map((x) => {
              return (
                <div key={x} className=' bg-gray-300 dark:bg-slate-700 px-10 py-16 rounded-lg animate-pulse ' >

                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default CategoryList