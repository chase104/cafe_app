import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context'
import MenuListItem from '../menu_list_item';

const MenuList = () => {
    const { activeCat, items } = useContext(AppContext);
    console.log(items);

    let itemsJSX = items.map((item) => {
        // check if this item is the same as active category
        // if yes return JSX
        // if NO, return nothing
        // if ("Drinks" === "Drinks")
        if (item.category.name === activeCat) {
            return (
                <MenuListItem itemData={item}/>
            )
        }
    })

  return (
    <div>{itemsJSX}</div>
  )
}

export default MenuList