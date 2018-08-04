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

  const currentDepth2FolderItemStyle = {
    0: '',
    1: 'level1',
    2: 'level2',
    3: 'level3'
  }

  const renderList = ({tagObj, tagTreeObj}) => {
    const listJSX = Object.keys(tagTreeObj).map((tagId, tagIdIndex) => {
      currentDepth += 1
      currentPath.push(tagId)
      const tagObjId = currentPath.join('>')

      let subListJSX
      let itemStyle = ''
      let itemDropdown = null

      if (Object.keys(tagTreeObj[tagId]).length > 0) {
        itemStyle += currentDepth2FolderItemStyle[currentDepth]
        itemDropdown = (
          <i className='caret down icon' />
        )
        subListJSX = renderList({tagObj, tagTreeObj: tagTreeObj[tagId]})
      }

      currentPath.pop()
      currentDepth -= 1

      return (
        <div className={`${itemStyle} item`} key={`${tagId}-${tagIdIndex}`}>
          <Link to={`/${categoryId}/${tagId}`}>
            {itemDropdown}
            {tagObj[tagObjId].title}
          </Link>
          {subListJSX}
        </div>
      )
    })

    const menuStyle = currentDepth === 0 ? 'ui vertical' : ''
    return (
      <div className={`${menuStyle} menu`}>
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
      <section id='main'>
        <div className='ui container'>
          <div className='ui two column stackable grid'>
            <div id='sidebar' className='six wide column'>
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
