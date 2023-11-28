import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Main, { MainLoader } from './layouts/Main';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import { logoutAction } from './actions/logout';
import { ToastContainer } from 'react-toastify';
import ExpensesPage,{expensesLoader} from './pages/ExpensesPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      loader: MainLoader,
      errorElement:<Error/>,
      children: [
        {
        index: "true",
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error/>  
        },
        {
          path: "logout",
       action: logoutAction
        },
        {
          path:"expenses",
          element:<ExpensesPage />,
          looader: expensesLoader,
        }
        
    ]
  },
   
    {
      path: "*",
      element:<Error/>
    },
  ]);
  

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}

export default App
