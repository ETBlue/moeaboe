import React from 'react'
import {
  Link,
  NavLink
} from 'react-router-dom'

import MENU_CLASS_SETTING from '../const/MENU_CLASS_SETTING'

export default ({categoryObj, categoryIdArray}) => {
  if (!categoryObj || !categoryIdArray) return null

  const categoryNav = categoryIdArray.map((categoryId, categoryIdIndex) => (
    <NavLink to={`/${categoryId}`} className='item' key={`${categoryId}-${categoryIdIndex}`} >
      {categoryObj[categoryId].title}
    </NavLink>
  ))

  const menuClass = MENU_CLASS_SETTING[categoryIdArray.length]

  return (
    <section className='Navbar'>
      <nav className={`ui stackable ${menuClass} item secondary pointing menu`}>
        {categoryNav}
      </nav>
    </section>
  )
}
