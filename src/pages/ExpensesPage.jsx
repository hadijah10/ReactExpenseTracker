import React from 'react'
import Table from '../components/Table';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers'
import {toast } from 'react-toastify';
import { deleteItem } from '../helpers';

export function expensesLoader(){
    const expenses = fetchData("expenses");
    return {expenses};
}
export async function expensesAction({request}){
    const data = await request.formData();
    const {_action,...values} = Object.fromEntries(data)
    if(_action === "deleteExpense"){
        try{
            deleteItem({
               key:"expenses",
               id:values.expenseid
            });
            return toast.success("Expense deleted")
        }catch(e){
            throw new Error("There was a problem with deleting your expense")
        }
    }
}

function ExpensesPage() {
const {expenses} = useLoaderData();

  return (
    <div
    className='grid-lg'>
        <h1>All Expenses</h1>
        {expenses && expenses.length >0 ?
            (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                    <Table expenses={expenses.sort((a,b) => b.createAt - a.createAt)}/>
                </div>
            ):
            (
                <p>No expenses to show</p>
            )
        }
    </div>
  );
}

export default ExpensesPage