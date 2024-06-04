import React, { useState } from 'react';
import {AiOutlineHome, 
  AiOutlineShopping, 
  AiOutlineLogin, 
  AiOutlineUserAdd, 
  AiOutlineShoppingCart} from 'react-icons/ai';

import {FaHeart, FaLaugh} from 'react-icons/fa';  
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import {logout} from '../../redux/features/auth/authSlice'


const Navigation = () => {

  const {userInfo} = useSelector(state => state.auth);

  const [dropdownOpned, setDropdownOpen] = useState(false);
  const [showSidebar, SetShowSidebar] = useState(false);


  const togglerDropdown = () =>{
    setDropdownOpen(!dropdownOpned);
  }

const[logoutApiCall] = useLoginMutation();

const logoutHandler = async()=>{
  try {

    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate('/login');
    
  } catch (error) {
    console.log(error);
    
  }
}
  const togglerSidebar = () =>{
    SetShowSidebar(!showSidebar);
  }

  const closeSidebar = () =>{
    SetShowSidebar(false);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
  <div
    style={{ zIndex: 9999 }}
    className={`${showSidebar ? "hidden" : "flex"
    } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
    id="navigation-container"
  >
    <div className="flex flex-col justify-center space-y-4">
        <Link
              to="/"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link
              to="/shop"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Shop</span>{" "}
        </Link>

        <Link
              to="/cart"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
        </Link>

        <Link
              to="/favorite"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <FaHeart className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{" "}
        </Link>
    </div>

    <div className='relative'>
      <button onClick={togglerDropdown} className='flex items-center
      text-gray-8000 focus:outline-none'>
        {userInfo ? <span className='text-white'>{userInfo.username}</span>
        : <></>}
      </button>
    </div>

    <ul>
      <li>
      <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
        </Link>
      </li>

      <li>
      <Link
              to="/logout"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
        </Link>
      </li>

    </ul>  

  </div>
  );
}; 
export default Navigation;
