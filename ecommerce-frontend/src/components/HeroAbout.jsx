import React from "react";
import background from "../assets/background.jpg";
import photo from "../assets/aboutus.png" 
import { Link } from "react-router-dom";

const HeroAbout = () => {
  return (
    <section
      className="dark:bg-gray-900"
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
      }}
    >
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="text-white text-xl">За нас</h1>
            <div className="divider divider-primary m-0"></div>
          <h2 className="max-w-2xl mb-4 text-2xl text-white text-left font-bold tracking-tight leading-none md:text-2xl xl:text-2xl dark:text-white">
          Фирмата Денев Компютърс ЕООД е създадена през 2014г. като наследник на СД"Денев-Пурлантов и сие", основана през 2000г.Нашата компания е една от утвърдените фирми в България за  продажба на нови или Refurbished мобилни и настолни компютри, компоненти, монитори, мрежова, копирна техника и аксесоари.
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
