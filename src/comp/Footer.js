import React from 'react'
import {
  Link
} from 'react-router-dom'

import MENU_CLASS_SETTING from '../const/MENU_CLASS_SETTING'

export default ({tagObj, categoryObj, categoryIdArray, tagTreeObj}) => {
  if (!tagObj || !categoryObj || !categoryIdArray || !tagTreeObj) return null

  const menuClass = MENU_CLASS_SETTING[categoryIdArray.length]

  const guideJSX = categoryIdArray.map((categoryId, categoryIdIndex) => {
    const listJSX = Object.keys(tagTreeObj[categoryId]).map((tagId, tagIdIndex) => {
      return (
        <Link to={`/${categoryId}/${tagId}`} className='item' key={`${tagId}-${tagIdIndex}`} >
          {tagObj[categoryId][tagId].title}
        </Link>
      )
    })
    return (
      <div className='column' key={`${categoryId}-${categoryIdIndex}`}>
        <p>
          {categoryObj[categoryId].title}
        </p>
        <div className='ui small relaxed list'>
          {listJSX}
        </div>
      </div>
    )
  })

  return (
    <footer className='Footer'>
      <section className='guide'>
        <div className='ui container'>
          <div className={`ui ${menuClass} column stackable grid`}>
            {guideJSX}
          </div>
        </div>
      </section>
      <section className='meta'>
        <div className='ui container'>
          <div className='ui two column stackable divided grid'>
            <div className='column'>
              <div className='ui two column grid'>
                <div className='six wide column'>
                  <div className='banner accessability'>
                  </div>
                  <div className='banner gov'>
                  </div>
                </div>
                <div className='ten wide column'>
                </div>
              </div>
            </div>
            <div className='column'>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
