import React from 'react'
import { Button } from '@/Components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import CreateIncome from './_components/CreateIncome'
import CategoryList from './_components/CategoryList'
function Incomes() {
  return (
    <div className=' p-0 md:mt-0 mt-10 md:p-6  rounded-xl'>
      <CategoryList/>
    </div>
  )
}

export default Incomes