import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import React from "react";
// import { Link } from "react-router-dom"

const Example = () => {
  return (
    <div className="bg-neutral-800">
        <section className='w-full h-12 bg-black flex items-center justify-center'>
            <h1 className="text-white font-extrabold text-xl ">ЗАЩО ПРИ НАС?</h1>
        </section>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
<div className="absolute inset-0 z-10 grid place-content-center">
  <div className="flex flex-col items-center gap-12 text-center">
    <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-xl font-black uppercase text-slate-900 backdrop-blur-xl">
      {card.title}
    </p>
    <a
      href={card.link}
      className="btn-primary w-auto px-5 py-3  text-base font-medium text-center text-white  rounded-lg  hover:bg-slate-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
    >
      Прочети още
    </a>
  </div>
</div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Профилактика и ремонт",
    id: 1,
    link: "/services",
  },
  {
    url: "https://images.pexels.com/photos/8441790/pexels-photo-8441790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Абонаментна поддръжка за Вашия бизнес",
    id: 2,
    link: "/services",
  },
  {
    url: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Разнообразие от нови и втора ръка компютри и лаптопи",
    id: 3,
    link: "/products",
  },
  {
    url: "https://images.pexels.com/photos/19892598/pexels-photo-19892598/free-photo-of-black-computer-component.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Асемблиране на компютри",
    id: 4,
    link: "/services",
  },
  // {
  //   url: "https://images.pexels.com/photos/7709216/pexels-photo-7709216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   title: "24/7 Онлайн поддръжка",
  //   id: 5,
  // },
  {
    url: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Ремонт и настройка по домовете",
    id: 6,
    link: "/services",
  },
  {
    url: "https://images.pexels.com/photos/357514/pexels-photo-357514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Превод и легализация",
    id: 7,
    link: "/services",
  },
];

