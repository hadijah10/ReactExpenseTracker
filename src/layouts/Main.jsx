import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { fetchData } from '../helpers';
import wave from "../assets/wave.svg"
import Nav from '../components/Nav';

export function MainLoader(){
    const username = fetchData("userName")
    return {username}
}

function Main() {
    const {username} = useLoaderData();
  return (
    <div className='layout'>
        <Nav username = {username}/>
       <main>
       <Outlet/>
       </main>
       <img src={wave} alt="wave"/>
    </div>
  )
}

export default Main