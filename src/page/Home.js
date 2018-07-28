import React from 'react'

import Header from '../comp/Header'
import Navbar from '../comp/Navbar'
import Searchbar from '../comp/Searchbar'

import SITE_SETTING from '../const/SITE_SETTING'

export default ({categoryObj, categoryIdArray}) => {
  return (
    <div className='Home'>
      <Header>
        <Navbar categoryObj={categoryObj} categoryIdArray={categoryIdArray} />
      </Header>
      <section className='hero'>
        <div className='ui container'>
          <h2 className='ui header'>
            {SITE_SETTING.description.zh}
          </h2>
          <Searchbar />
        </div>
      </section>
    </div>
  )
}
