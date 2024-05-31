import React, { useEffect, useState } from 'react'
import { ResponsiveContainer } from 'recharts';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";


function BarchartDashboard({ BudgetList }) {

    const [transformedData, setData] = useState();

    useEffect(() => {
        const transformedBudget = BudgetList?.map((budget) => {
            const totalExpense = budget.expense.reduce((acc, curr) => acc + curr.amount, 0);
            return { ...budget._doc, totalExpense };
        });

        setData(transformedBudget);
        console.log(transformedBudget);

    }, [BudgetList])

    useEffect(()=>
    {
        console.log("Transformed Data", transformedData);
    },[transformedData])

    return (
        <div className='h-[350px] md:h-[400px] mx-[-20px] md:w-[600px] mt-5'>
          <ResponsiveContainer  >
            {
                transformedData && 
                    <BarChart
                        width={700}
                        height={500}
                        data={transformedData}
                        margin={{
                            top:  15,
                            right:  15,
                            left:  15,
                            bottom: 15,
                        }}
                      
                    >
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalExpense" stackId="a" fill="#FF7D29" />
                        <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
                    </BarChart>
              
                

            }
            </ResponsiveContainer >
        </div>
    )
}

export default BarchartDashboard