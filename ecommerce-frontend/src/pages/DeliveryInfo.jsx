import React from "react";
import DeliverySurvey from "../components/DeliverySurvey";

const DeliveryInfo = () => {

    
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-4xl underline mt-8 mb-0">Поръчка</h1>
      <section className="bg-white w-3/4 antialiased dark:bg-gray-900 ">
       
          <div className="sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <DeliverySurvey/>
            </div>
            
      </section>
    </div>
  );
};

export default DeliveryInfo;
