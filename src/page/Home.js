import React from 'react'

import Header from '../comp/Header'
import Navbar from '../comp/Navbar'
import Searchbar from '../comp/Searchbar'

import SITE_SETTING from '../const/SITE_SETTING'

export default ({categoryObj, categoryIdArray}) => {
  const blockIdArray = [
    '認識能源局',
    '最新消息',
    '能源數據',
    '近期活動',
    '能源知識帶著走'
  ]

  const blockJSX = blockIdArray.map((blockId, blockIdIndex) => {
    return (
      <section key={blockId} className='section'>
        <div className='ui container'>
          <h2 className='ui center aligned medium header'>
            {blockId}
          </h2>
        </div>
      </section>
    )
  })
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
      {blockJSX}
    </div>
  )
}
