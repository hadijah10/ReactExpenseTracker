import React from 'react'
import { useRef ,useEffect} from 'react';
import {useFetcher} from 'react-router-dom';
import {PlusCircleIcon} from '@heroicons/react/24/solid';



function AddExpenseForm({budgets}) {
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state == "submitting";
    const formRef = useRef();
    const focusRef = useRef();


    useEffect(() => {
        if(!isSubmiting){
            formRef.current.reset();
            focusRef.current.focus();
        }},[isSubmiting])

  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Add new{" "}
        <span className='accent'>
            {budgets.length === 1 && `${budgets.map(budg => budg.name)}`}
        </span>
        Expense {" "}</h2>
        <fetcher.Form method="post" className='grid-sm' ref= {formRef}>
            <div className='expense-inputs'>
                <div className='grid-xs' hidden={budgets.length === 1}>
                    <label htmlFor="newExpense">Expense Name</label>
                    <input type="text" name='newExpense' id='newExpense' placeholder='e.g , coffee' required ref={focusRef}/>
                </div>
                </div>
                <div className='grid-xs'>
                    <label htmlFor="newExpenseAmount">
                        Amount
                    </label>
                    <input type="number"
                    step="0.01"
                    inputMode="decimal"
                    name="newExpenseAmount" 
                    id="newExpenseAmount"/>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name='newExpenseBudget' id='newExpenseBudget' required>
                    {
                        budgets.sort((a,b) => 
                            a.createdAt -b.createdAt
                        ).map((budget) => {
                            return(
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            )
                        })
                    }
                    </select>
                </div>
                    <input type="hidden" name='_action' value="createExpense" />
                    <button type='submit' className='btn btn--dark' disabled={isSubmiting}>
                    {isSubmiting ? <span>Submiting</span>: (<div><span>Add Expense</span>
                <PlusCircleIcon width={20}/></div>)}
                </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm