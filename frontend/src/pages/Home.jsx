import React from 'react'
import { toast } from 'react-hot-toast';
const Home = () => {
  return (
    <>
    <div className='text-green-200'>Home</div>
    <button className='btn btn-primary' onClick={()=> toast.success("Success")}>Click Me</button>
    </>
  )
}

export default Home