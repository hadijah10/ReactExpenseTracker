import React from 'react';
import { Form, NavLink } from 'react-router-dom';
import logo from "../assets/logo.svg"
import {TrashIcon} from '@heroicons/react/24/solid';

function Nav({username}) {
  return (
    <nav>
    <NavLink
    to="/"
    aria-label= "Go to home"
    >
    <img src={logo} alt="logo" height={30} />
    <span>Home Budget</span>
    </NavLink>
    {username && (
    <Form method="post" action="/logout"
    onSubmit={(e) => {
        if (!confirm('Delete user and all data')){
            e.preventDefault();
        }
    }}
    >
        <button type='submit' className='btn btn--warning'>
            <span>Delete User</span>
            <TrashIcon width={20}/>
        </button>
    </Form>)}
    </nav>
  )
}

export default Nav