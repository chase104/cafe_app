import React from 'react'
import { Link } from 'react-router-dom';
import CategoryList from '../category_list';
import Logo from '../logo';
import UserLogOut from '../user_log_out';
import './index.css'
const Nav = () => {
  return (
    <nav className='nav'>
      <Logo />
      {/* <CategoryList /> */}
      <Link to="/orders" className="button btn-sm">Previous Orders</Link>
      <UserLogOut />
      {/* user info */}
      {/* <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link> */}
    </nav>
  )
}

export default Nav