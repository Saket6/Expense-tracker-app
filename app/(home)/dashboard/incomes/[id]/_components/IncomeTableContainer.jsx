"use client"
import React, { useEffect, useState } from 'react'
import { Table } from '@/Components/ui/table';
import { ArrowUpDown } from "lucide-react"
import { DataTable } from '../../../expenses/[id]/_components/DataTable';
import { Button } from '@/Components/ui/button';
import { Trash2 } from 'lucide-react';
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import axios from 'axios';
import { useToast } from '@/Components/ui/use-toast';

function IncomeTableContainer({ Incomes, getIncome, flag }) {

  const [incomeData, setincomeData] = useState([]);
  const columns2 = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },

    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },

    },
    {
      accessorKey: "dateCreated",
      header: "Date of income",
    },
     flag==='all'? {
        id: "budget",
        accessorKey: "budget",
        header: "Budget",
      }:{
        id: "Category",
        accessorKey: "Category",
        header: "",
      }
      ,
    {
      id: "actions",
      cell: ({ row }) => {
        const currentincome = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem
                onClick={() => deleteincome(currentincome._id)}
              >
                <Trash2 color='red' className='mr-2' />Delete income
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  useEffect(() => {
    if (flag === 'all') {
      columns2.unshift(
        {
          accessorKey: "Category",
          header: "Category",
        },
      )
    }

  }, [flag])

  const { toast } = useToast();
  const deleteincome = async (id) => {
    try {

      const res = await axios.post('/api/delete-income', { id })
      console.log(res.data.message);
      getIncome();
      toast({ title: "income deleted" });

    }
    catch (e) { console.log(e); }
  }


  useEffect(() => {
    console.log("This is incomes",Incomes);
    setincomeData(Incomes);
  }, [Incomes])


  useEffect(() => {
    console.log("income Data", incomeData);
    // setincomeData();
  }, [incomeData])


  return (
    <div className='mb-3'>
      {
        incomeData.length > 0 ? (
          <>
            <DataTable columns={columns2} data={incomeData} flag={flag} />
          </>
        ) : ("")
      }
    </div>
  )
}

export default IncomeTableContainer