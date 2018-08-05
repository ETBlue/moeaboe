import React from 'react'
import {
  Link
} from 'react-router-dom'

import Header from '../comp/Header'
import Navbar from '../comp/Navbar'

export default ({categoryId, tagId, categoryObj, categoryIdArray, tagObj, tagTreeObj, contentObj, tagContentObj, authorObj}) => {
  if (!categoryId || !categoryObj || !categoryIdArray || !tagObj || !tagTreeObj) return null

  let breadcumbCat = []

  let categoryTextJSX = null
  if (categoryObj && categoryObj[categoryId]) {
    categoryTextJSX = (
      <Link to={`/${categoryId}`}>
        {categoryObj[categoryId].title}
      </Link>
    )
    breadcumbCat.push(' > ')
    breadcumbCat.push(categoryTextJSX)
  }

  let breadcumbTag = []
  const renderBreadcumbTagText = ({tagId, tagObj}) => {
    if (!tagId || tagId.length === 0 || !tagObj[categoryId][tagId]) return

    const tagTextJSX = (
      <Link to={`/${categoryId}/${tagId}`}>
        {tagObj[categoryId][tagId].title}
      </Link>
    )
    breadcumbTag.splice(0, 0, tagTextJSX)
    breadcumbTag.splice(0, 0, ' > ')

    if (tagId.includes('/')) {
      const residualTagId = tagId.slice(0, tagId.lastIndexOf('/'))
      renderBreadcumbTagText({tagId: residualTagId, tagObj})
    }
  }
  renderBreadcumbTagText({tagId, tagObj})

  let currentDepth = 0
  let currentPath = []

  const currentDepth2FolderItemStyle = {
    0: '',
    1: 'level1',
    2: 'level2',
    3: 'level3'
  }

  const renderMenu = ({tagObj, tagTreeObj}) => {
    const listJSX = Object.keys(tagTreeObj).map((tagId, tagIdIndex) => {
      currentDepth += 1
      currentPath.push(tagId)
      const tagObjId = currentPath.join('/')
      const linkTo = currentPath.join('/')

      let subListJSX
      let itemStyle = ''

      if (Object.keys(tagTreeObj[tagId]).length > 0) {
        itemStyle += currentDepth2FolderItemStyle[currentDepth]
        subListJSX = renderMenu({tagObj, tagTreeObj: tagTreeObj[tagId]})
      }

      currentPath.pop()
      currentDepth -= 1

      return (
        <div className={`${itemStyle} item`} key={`${linkTo}-${tagIdIndex}`}>
          <Link to={`/${categoryId}/${linkTo}`}>
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

  const sidebarJSX = renderMenu({tagObj: tagObj[categoryId], tagTreeObj: tagTreeObj[categoryId]})

  const renderContentList = ({contentObj, tagContentObj}) => {
    let activeTagId = tagId || 'all'
    if (!tagContentObj || !tagContentObj[categoryId][activeTagId]) return null

    const contentListJSX = tagContentObj[categoryId][activeTagId].map((contentId, contentIdIndex) => {
      const contentItem = contentObj[categoryId][contentId]
      const contentIcon = tagObj[categoryId][contentItem.tag_id].icon
      return (
        <div className='item' key={`${contentId}-${contentIdIndex}`} >
          <div className='ui mini image'>
            <i className={`icon ${contentIcon}`} />
          </div>
          <div className='content'>
            <a href={`${contentItem.current_url || ''}`} target='_blank' className='header'>
              {contentItem.title}
            </a>
            <div className='meta'>
              {authorObj[contentItem.author_ids] ? authorObj[contentItem.author_ids].title : ''}
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className='ui divided items'>
        {contentListJSX}
      </div>
    )
  }

  const contentJSX = renderContentList({contentObj, tagContentObj})

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
          {breadcumbCat}
          {breadcumbTag}
        </div>
      </section>
      <section id='main'>
        <div className='ui container'>
          <div className='ui two column stackable grid'>
            <div id='sidebar' className='six wide column'>
              {sidebarJSX}
            </div>
            <div id='content' className='ten wide column'>
              {contentJSX}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
