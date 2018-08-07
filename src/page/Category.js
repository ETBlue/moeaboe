import React from 'react'
import {
  Link,
  NavLink
} from 'react-router-dom'

import Header from '../comp/Header'
import Navbar from '../comp/Navbar'
import CategorySidebar from '../comp/CategorySidebar'
import CategoryPolicy from '../comp/CategoryPolicy'

export default ({categoryId, tagId, categoryObj, categoryIdArray, tagObj, tagTreeObj, contentObj, tagContentObj, authorObj}) => {
  if (!categoryId || !categoryObj || !categoryIdArray || !tagObj || !tagTreeObj) return null

  let breadcumbCat = []
  let categoryTextJSX = null
  if (categoryObj && categoryObj[categoryId]) {
    categoryTextJSX = (
      <Link key={categoryId} to={`/${categoryId}`}>
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
      <Link key={`${categoryId}/${tagId}`} to={`/${categoryId}/${tagId}`}>
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

  let headerText
  let mainJSX

  if (contentObj[categoryId][tagId]) {
    renderBreadcumbTagText({tagId: contentObj[categoryId][tagId].tag_id, tagObj})
    const contentTextJSX = (
      <Link key={`${categoryId}/${tagId}`} to={`/${categoryId}/${tagId}`}>
        {contentObj[categoryId][tagId].title}
      </Link>
    )
    breadcumbTag.push(' > ')
    breadcumbTag.push(contentTextJSX)

    headerText = contentObj[categoryId][tagId].title
    mainJSX = (
      <p>
        content page
      </p>
    )
  } else {
    renderBreadcumbTagText({tagId, tagObj})
    const renderContentList = ({contentObj, tagContentObj}) => {
      let activeTagId = tagId || 'all'
      if (!tagContentObj || !tagContentObj[categoryId][activeTagId]) return null

      const contentListJSX = tagContentObj[categoryId][activeTagId].map((contentId, contentIdIndex) => {
        const contentItem = contentObj[categoryId][contentId]
        const contentIcon = tagObj[categoryId][contentItem.tag_id].icon
        const contentUrl = `/${contentItem.category_id}/${contentId}`
        return (
          <div className='item' key={`${contentId}-${contentIdIndex}`} >
            <div className='ui mini image'>
              <i className={`icon ${contentIcon}`} />
            </div>
            <div className='content'>
              <Link to={contentUrl} className='header'>
                {contentItem.title}
              </Link>
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

    if (tagId.length === 0 && categoryObj[categoryId].layout.length > 0) {
      headerText = categoryObj[categoryId].title
      const layout = categoryObj[categoryId].layout

      if (layout === 'policy') {
        mainJSX = CategoryPolicy({categoryId, tagTreeObj, tagObj})
      } else if (layout === 'service') {
        mainJSX = <p>layout - service</p>
      } else if (layout === 'transition') {
        mainJSX = <p>layout - transition</p>
      }
    } else if (tagId.length > 0 && tagObj[categoryId][tagId].layout.length > 0) {
      headerText = tagObj[categoryId][tagId].title
      mainJSX = <p>layout - tag</p>
    } else {
      headerText = categoryObj[categoryId].title
      mainJSX = (
        <div className='ui two column stackable grid'>
          <div id='sidebar' className='six wide column'>
            {CategorySidebar({tagObj, tagTreeObj, categoryId})}
          </div>
          <div id='content' className='ten wide column'>
            {renderContentList({contentObj, tagContentObj})}
          </div>
        </div>
      )
    }
  }

  return (
    <div className='Category'>
      <Header>
        <Navbar categoryObj={categoryObj} categoryIdArray={categoryIdArray} />
      </Header>
      <section className='page headline'>
        <div className='center aligned ui container'>
          <h2 className='ui header'>
            {headerText}
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
          {mainJSX}
        </div>
      </section>
    </div>
  )
}
