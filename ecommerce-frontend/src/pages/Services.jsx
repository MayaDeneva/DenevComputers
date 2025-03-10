import React from "react";
import HeroService from "../components/HeroService";
import ServiceCards from "../components/Services";

const Services = () => {
  return (
    <div>
      <HeroService />
      <div className="flex flex-col items-center">
        <h1 className="mt-8 text-3xl mb-8">Какво предлагаме?</h1>
        <ServiceCards/>
      </div>
      
  
 
    </div>
  );
};

export default Services;
