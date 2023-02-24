import React from 'react'

const Cart = ({handleChangeQty, handleCheckout}) => {
    // handleChangeQuantity to add something to cart, change qty, or remove is qty <= 0
    // handleCheckout
    // checkoutDone == false

    let checkoutDone = false;

  return (
    <div className="Cart">
        <div className='SectionHeading'>
            {checkoutDone ?
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
                {checkoutDone ? 
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