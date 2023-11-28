import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { createBudget, createExpense, fetchData } from '../helpers';
import Intro from '../components/Intro';
import {toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

export function dashboardLoader(){
const userName = fetchData("userName");
const budgets = fetchData('budgets');
const expenses = fetchData('expenses');
return {userName, budgets,expenses}
}
export const waait = ()=>new Promise(res => setTimeout(res,Math.random()*800))

export async function dashboardAction({request}){
    await waait()
    const data = await request.formData();
   // console.log({data,request})
   const  {_action, ...values} = Object.fromEntries(data);
    //console.log(formData)
 if(_action === "newUser"){
    try{
   
        localStorage.setItem("userName",JSON.stringify(values.userName))
      return  toast.success(`Welcome ${values.userName}`)
     }
     catch(e){
        throw new Error("There was a problem creating your account")
       
     }
 }
 if (_action ==="createBudget"){
    try{
        createBudget({name:values.newBudget,
        amount: values.newBudgetAmount})
       return toast.success("Budget created")
    }catch (e){
        throw new Error ("There was a problem creating your budget")
    }
    }
    if (_action ==="createExpense"){
        try{
            createExpense({name:values.newExpense,
                amount:values.newExpenseAmount,
            budgetId:values.newExpenseBudget})
           return toast.success(`Expense ${values.newExpense} created`)
        }catch (e){
            throw new Error ("There was a problem creating your expense")
        }
    }
}

function Dashboard() {
  const {userName,budgets,expenses} = useLoaderData();
  return (
    <div>
        {userName ? (
            <div className='dashboard'>
                <h1>Welcome back, 
                    <span className='accent'>{userName}</span>
                </h1>
               
                           {budgets && budgets.length > 0 ? 
                            (<div className='grid-sm'>
                            <div className="grid-lg">
                                <div className="flex-lg">
                                <AddBudgetForm/>
                                <AddExpenseForm budgets={budgets}/>
                                </div>
                           <h2>Existing Budgets</h2>
                            <div className='budgets'>
                                {budgets.map(budget => (
                                    <BudgetItem key = {budget.id} budget={budget}/>
                                ))}
                            </div>
                            <div>
                                {
                                    expenses && expenses.length > 0 && 
                                    (
                                        <div className='grid-md'>
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses.sort((a,b) => b.createAt - a.createAt).slice(0,8)}/>
                                            <Link
                                            to="expenses"
                                            className='btn btn--dark'
                                            >
                                                View all expenses
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                    </div>
                </div>):(
                    <div className="grid-sm">
                        <p>Personal budgeting is the secret to financial freedom</p>
                        <p>Create a budget to get started!</p>
                        <AddBudgetForm budgets={budgets}/>
                    </div>
                )
                           }
               
            </div>
        ): (<Intro/>)}
        <p>Dashboard</p>
    </div>
  )
}

export default Dashboard;