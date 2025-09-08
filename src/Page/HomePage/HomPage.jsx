import React from 'react';
import Banar from './Component/Banar';
import ServicesSection from './Component/ServicesSection';
import FeaturesSection from './Component/FeaturesSection';
import TestimonialSlider from './Component/TestimonialSlider';
import FAQ from './Component/FAQ';

const HomPage = () => {
    return (
        <div>
            <Banar/>

            <ServicesSection/>
            
            <FeaturesSection/>

            {/* script file */}
            <TestimonialSlider/>

            <FAQ/>
        </div>
    );
};

export default HomPage;