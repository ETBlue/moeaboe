import React from 'react'
import {
  Link,
  NavLink
} from 'react-router-dom'

import Header from '../comp/Header'
import Navbar from '../comp/Navbar'
import CategorySidebar from '../comp/CategorySidebar'
import CategoryPolicy from '../comp/CategoryPolicy'
import CategoryService from '../comp/CategoryService'
import CategoryTransition from '../comp/CategoryTransition'
import renderMenu from '../func/renderMenu'

export default ({categoryId, tagId, pathname, search, categoryObj, categoryIdArray, tagObj, tagTreeObj, contentObj, tagContentObj, authorObj}) => {
  if (!categoryId || !categoryObj || !categoryIdArray || !tagObj || !tagTreeObj) return null

  console.log(pathname)
  console.log(search)

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

  // destination page
  if (contentObj[categoryId][tagId]) {
    renderBreadcumbTagText({tagId: contentObj[categoryId][tagId].tag_id, tagObj})
    const contentTextJSX = (
      <Link key={`${categoryId}/${tagId}`} to={`/${categoryId}/${tagId}`}>
        {contentObj[categoryId][tagId].title}
      </Link>
    )
    breadcumbTag.push(' > ')
    breadcumbTag.push(contentTextJSX)

    const headerIcon = contentObj[categoryId][tagId].icon || tagObj[categoryId][contentObj[categoryId][tagId].tag_id].icon
    headerText = [
      <i className={`${headerIcon} icon`} style={{opacity: '0.5'}} />,
      contentObj[categoryId][tagId].title
    ]
    mainJSX = (
      <p>
        <a href={contentObj[categoryId][tagId].current_url || ''} target='_blank'>
          {`《${contentObj[categoryId][tagId].title}》的原始網址 `}
          <i className='external alternate icon' />
        </a>
      </p>
    )

  // navigation pages
  } else {
    renderBreadcumbTagText({tagId, tagObj})
    headerText = categoryObj[categoryId].title
    const renderContentList = ({contentObj, tagContentObj}) => {
      let activeTagId = tagId || 'all'
      if (!tagContentObj || !tagContentObj[categoryId][activeTagId]) return null

      const contentListJSX = tagContentObj[categoryId][activeTagId].map((contentId, contentIdIndex) => {
        const contentItem = contentObj[categoryId][contentId]
        const contentIcon = contentItem.icon || tagObj[categoryId][contentItem.tag_id].icon
        const contentUrl = `/${contentItem.category_id}/${contentId}`
        let contentAction = null
        if (contentItem.layout_id === 'external_site') {
          contentAction = (
            <div className='extra'>
              <a href={contentItem.current_url} target='_blank'>
                直接前往外網連結
                <i className='icon right chevron' />
              </a>
            </div>
          )
        }
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
                {contentItem.updated ? `於 ${contentItem.updated} 更新` : ''}
              </div>
              {contentAction}
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

    const categoryLayout = categoryObj[categoryId].layout || ''

    let filterJSX = null

    // level one policy page
    if (tagId.length === 0 && categoryLayout === 'policy') {
      mainJSX = CategoryPolicy({categoryId, tagTreeObj, tagObj})

    // level one service page
    } else if (tagId.length === 0 && categoryLayout === 'service') {
      mainJSX = CategoryService({categoryId, tagTreeObj, tagObj})

    // level two service pages
    } else if (tagId.length > 0 && categoryId === 'service') {
      headerText = tagObj[categoryId][tagId].title

      if (!tagId.includes('/')) {
        const contentListJSX = Object.keys(tagTreeObj[categoryId][tagId]).map((serviceId, serviceIdIndex) => {
          return (
            <div className='column'>
              <h2 className='ui center aligned medium icon header'>
                <i className='circular image icon' style={{fontSize: '5rem'}} />
                {tagObj[categoryId][serviceId].title}
              </h2>
            </div>
          )
        })
        mainJSX = (
          <div className='ui three column stackable grid'>
            {contentListJSX}
          </div>
        )
      } else {
        mainJSX = (
          <div className='ui two column stackable grid'>
            <div id='sidebar' className='five wide column'>
              {renderMenu({tagObj: tagObj[categoryId], tagTreeObj: tagTreeObj[categoryId][tagId], categoryId, currentDepth: 0, currentDepth2FolderItemStyle: {}})}
            </div>
            <div id='content' className='eleven wide column'>
              {renderContentList({contentObj, tagContentObj})}
            </div>
          </div>
        )
      }

    // level one transition page
    } else if (tagId.length === 0 && categoryLayout === 'transition') {
      mainJSX = <CategoryTransition />

    // others
    } else {
      // setup filters for info
      if (categoryLayout === 'info') {
        const dropdownFilterDataA = [
          '所有格式',
          'pdf',
          'docx / odt',
          'xlsx / odt',
          'zip'
        ]
        const dropdownFilterDataAJSX = dropdownFilterDataA.map((filterItem) => (
          <div className='item'>
            {filterItem}
          </div>
        ))
        const dropdownFilterDataB = [
          '新到舊',
          '熱門的優先'
        ]
        const dropdownFilterDataBJSX = dropdownFilterDataB.map((filterItem) => (
          <div className='item'>
            {filterItem}
          </div>
        ))
        filterJSX = (
          <div className='ui menu'>
            <div className='ui simple dropdown item'>
              {dropdownFilterDataA[0]}
              <i className='icon dropdown' />
              <div className='menu'>
                {dropdownFilterDataAJSX}
              </div>
            </div>
            <div className='ui simple dropdown item'>
              {dropdownFilterDataB[0]}
              <i className='icon dropdown' />
              <div className='menu'>
                {dropdownFilterDataBJSX}
              </div>
            </div>
            <div className='right menu'>
              <div className='ui right aligned category search item'>
                <div className='ui transparent icon input'>
                  <input type='text' placeholder='搜尋...' />
                  <i className='search icon' />
                </div>
              </div>
            </div>
          </div>
        )
      }
      mainJSX = (
        <div className='ui two column stackable grid'>
          <div id='sidebar' className='five wide column'>
            {CategorySidebar({tagObj, tagTreeObj, categoryId})}
          </div>
          <div id='content' className='eleven wide column'>
            {filterJSX}
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
