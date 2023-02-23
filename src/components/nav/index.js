import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import CategoryList from '../category_list';
import Logo from '../logo';
import UserLogOut from '../user_log_out';
import './index.css'



const Nav = () => {

  const location = useLocation().pathname;
  console.log(location);

  return (
    <nav className='nav'>
      <Logo />
      {location == "/orders/new" ? 
      <>
        <CategoryList />
        <Link to="/orders" className="button btn-sm">Previous Orders</Link>
      </>
       :
       <Link to="/orders/new" className="button btn-sm">New Order</Link>
      }
      <UserLogOut />
    </nav>
  )
}

export default Nav