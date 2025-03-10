import React from "react";
import { useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import './styles.css'; 
import menu from '../assets/menu.png';
import DropdownMenu from "./DropdownMenu";
import axios from "axios"

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <section className=" navbar bg-base-100  left-0 w-full z-50 shadow-md px-4 md:px-8 h-16 bg-primary  ">
      <div>
        <ul className=" pl-24 hidden sm:flex menu menu-horizontal rounded-box lg:flex align-left ">
        <div className="flex items-stretch">
      <a className="btn btn-primary category btn-ghost rounded-btn"><Link to="/">Начало</Link></a>
      <div className="dropdown dropdown-start dropdown-hover">
        <div tabIndex={0} role="button" className="btn btn-primary category text-white btn-ghost rounded-btn">
          <Link to ="/products">
          Продукти</Link></div>
        <DropdownMenu categories={categories}/>
      </div>
      <a className="btn btn-primary category btn-ghost rounded-btn"><Link to ="/services">Услуги</Link></a>
      <a className="btn btn-primary category btn-ghost rounded-btn"><Link to ="/about-us">За нас</Link></a>
      <a className="btn btn-primary category btn-ghost rounded-btn"><Link to="/contacts">Контакти</Link></a>
    </div>

        </ul>
        <div className="sm:hidden z-40">
            <img src={menu} class="bx bx-menu sm:block h-6 text-5xl cursor-pointer" onClick={()=> setIsMenuOpen(!isMenuOpen)}></img>
            <div className={`absolute xl:hidden top-36 left-0 w-full bg-white flex flex-col items-center gap-6 font-semiold text-lg transform transition-transform ${isMenuOpen ? "opacity-100: " : "opacity-0"}`}>
                <li className='list-none w-full text-center p-4
            hover:bg-sky-400 hover:text-white transition-all
            cursor-pointer'><Link to="/">Начало</Link></li>
                <li className='list-none w-full text-center p-4
            hover:bg-sky-400 hover:text-white transition-all
            cursor-pointer'><Link to="/products">Продукти</Link></li>
                    <li className='list-none w-full text-center p-4
            hover:bg-sky-400 hover:text-white transition-all
            cursor-pointer'><Link to="/services">Услуги</Link></li>
                            <li className='list-none w-full text-center p-4
            hover:bg-sky-400 hover:text-white transition-all
            cursor-pointer'><Link to="contacts">За нас</Link></li>
              
            </div>


        </div>
      </div>
    </section>
  );
};

export default Categories;
