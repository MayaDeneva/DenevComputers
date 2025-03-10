import React from "react";
import background from "../assets/background.jpg";
import hero from "../assets/hero.png" 
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="dark:bg-gray-900"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
      }}
    >
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">

          <h2 className="max-w-2xl mb-4  text-2xl text-white text-left font-bold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-white">
            Вашият доверен партньор за поддръжка на хардуер вече над <span className="text-primary">20 години</span>!
          </h2>
          <div className="flex space-x-4 mt-40">
            <a
              href="#"
              className="btn btn-primary inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              <Link to="/contacts">
              Свържете се с нас!
              </Link>
            </a>
            <a
              href="#"
              className=" btn btn-home inline-flex items-center justify-center  font-medium text-center text-gray-900  rounded-lg text-white"
            >
              <Link to ="/products">
              Виж Продукти
              </Link>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
