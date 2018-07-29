import React from 'react'
import {
  Link
} from 'react-router-dom'

import Header from '../comp/Header'
import Navbar from '../comp/Navbar'

export default ({categoryId, tagId, categoryObj, categoryIdArray, tagObj, tagTreeObj}) => {
  if (!categoryId || !categoryObj || !categoryIdArray || !tagObj || !tagTreeObj) return null

  const categoryText = categoryObj && categoryObj[categoryId] ? ` > ${categoryObj[categoryId].title}` : ''
  const tagText = tagObj && tagObj[tagId] ? ` > ${tagObj[tagId].title}` : ''

  let currentDepth = 0
  let currentPath = []

  const renderList = ({tagObj, tagTreeObj}) => {
    const listJSX = Object.keys(tagTreeObj).map((tagId, tagIdIndex) => {
      currentPath.push(tagId)
      const tagObjId = currentPath.join('>')

      let subListJSX
      if (Object.keys(tagTreeObj[tagId]).length > 0) {
        subListJSX = renderList({tagObj, tagTreeObj: tagTreeObj[tagId]})
      }

      currentPath.pop()
      return (
        <div className='item' key={`${tagId}-${tagIdIndex}`}>
          {tagObj[tagObjId].title}
          {subListJSX}
        </div>
      )
    })
    return (
      <div className='ui relaxed list'>
        {listJSX}
      </div>
    )
  }

  const sidebarJSX = renderList({tagObj: tagObj[categoryId], tagTreeObj: tagTreeObj[categoryId]})

  return (
    <div className='Category'>
      <Header>
        <Navbar categoryObj={categoryObj} categoryIdArray={categoryIdArray} />
      </Header>
      <section className='page headline'>
        <div className='center aligned ui container'>
          <h2 className='ui header'>
            {categoryObj[categoryId].title}
          </h2>
        </div>
      </section>
      <section className='breadcumb'>
        <div className='ui container'>
          <Link to='/'>
            首頁
          </Link>
          {categoryText}
          {tagText}
        </div>
      </section>
      <section className='result'>
        <div className='ui container'>
          <div className='ui two column stackable grid'>
            <div className='six wide column'>
              {sidebarJSX}
            </div>
            <div className='ten wide column'>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
