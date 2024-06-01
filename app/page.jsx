"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'

function HomePage() {
const Router = useRouter()

    useEffect(()=>
    {
        Router.push('/dashboard');
    },[])

  return (
    <div></div>
  )
}

export default HomePage