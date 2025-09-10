import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainRout from './MainRout/MainRout.jsx';
import HomePage from './Page/HomePage/HomPage.jsx'
import ReaRider from './Page/Be a Rider/BeaRider.jsx';
import PricingCalculator from './Page/Pricing Calculator/PricingCalculator.jsx'
import AboutUs from './Page/About Us/AboutUs.jsx';
import Consignment from './Page/Track Your Consignment/Consignment.jsx';
import Login from './Page/Authentication/Login.jsx';
import Register from './Page/Authentication/Register.jsx';
import Available64Districts from './Page/We are available in 64 districts/Available64Distists.jsx';
import AddParcel from './Page/Add Parcel/AddParcel.jsx';
import Error404Page from './Page/Error404/Error404Page.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRout/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:'/be-a-rider',
        element:<ReaRider/>
      },
      {
        path: "/pricing-calculator",
        element:<PricingCalculator/>
      },
      {
        path:"/about",
        element:<AboutUs/>
      },
      {
        path:'/consignment',
        element: <Consignment/>
      },
      {
        path:'/map-64-districts',
        element:<Available64Districts/>,
      },
      {
        path:'/AddParcel',
        element:<AddParcel/>
      },
      {
        path:'/error404',
        element:<Error404Page/>
      }
      
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/Register',
    element:<Register/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
    {/* <App /> */}
  </StrictMode>,
)
