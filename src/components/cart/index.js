import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context';

const Cart = ({handleChangeQty, handleCheckout}) => {
    // handleChangeQuantity to add something to cart, change qty, or remove is qty <= 0
    // handleCheckout
    // checkoutDone == false
    let { cart } = useContext(AppContext)


  return (
    <div className="Cart">
        <div className='SectionHeading'>
            {cart.checkoutDone ?
            <>
                <span>ORDER  <span>D442DGF</span></span>
                <span>date of order</span> 
            </>
            :
            <>
                <span>NEW ORDER</span>
                <span>{new Date().toLocaleDateString()}</span> 
            </>
            }
  
        </div>
        <div className="OrderItemContainer">
            {/* various order items here */}
            <section>
                {cart.checkoutDone ? 
                <span>TOTAL</span>
                :
                <button className="btn-sm">Checkout</button>    
                }
                <span>qty</span>
                <span className="right">Order Total Price</span>
            </section>
        </div>
    </div>
  )
}

export default Cart