import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar';
import Footer from "../Component/Footer"

const MainRout = () => {
    return (
        <div>
            <Navbar/>
            <div className='mt-20'>
                <Outlet/>
            </div>
            
            <Footer/>
            
        </div>
    );
};

export default MainRout;