import React from 'react'
import BudgetList from './_components/BudgetList'
function Budget() {
  return (
    <div className=''>
        {/* <h1 className='font-bold text-2xl md:text-4xl'>My Budgets</h1>
        <h3 className=''>Browse all your budgets here!!</h3> */}
        <BudgetList/>
    </div>
  )
}

export default Budget