import { redirect } from "react-router-dom";

//Local storage functions
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
    redirect("/")
}
export const generateRandomColor =() => {
    const existingBudgetLength= fetchData("budgets")?. length ?? 0;
    return `${existingBudgetLength*34} 65% 50%`;
}

export const createBudget = ({name,amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
       color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", 
        JSON.stringify([...existingBudgets,newItem]))
}
export const createExpense = ({name,amount,budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
       budgetId:budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", 
        JSON.stringify([...existingExpenses,newItem]))
}
