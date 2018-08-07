import React from 'react'
import {
  NavLink
} from 'react-router-dom'

export default ({tagObj, tagTreeObj, categoryId}) => {
  let currentDepth = 0

  const currentDepth2FolderItemStyle = {
    0: '',
    1: 'level1',
    2: 'level2',
    3: 'level3'
  }

  const renderMenu = ({tagObj, tagTreeObj, categoryId}) => {
    const listJSX = Object.keys(tagTreeObj).map((tagId, tagIdIndex) => {
      currentDepth += 1

      let subListJSX
      let itemStyle = ''

      if (Object.keys(tagTreeObj[tagId]).length > 0) {
        itemStyle += currentDepth2FolderItemStyle[currentDepth]
        subListJSX = renderMenu({tagObj, tagTreeObj: tagTreeObj[tagId], categoryId})
      }

      currentDepth -= 1

      return (
        <div className={`${itemStyle} item`} key={`${tagId}-${tagIdIndex}`}>
          <NavLink to={`/${categoryId}/${tagId}`}>
            {tagObj[tagId].title}
          </NavLink>
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

  const sidebarJSX = renderMenu({tagObj: tagObj[categoryId], tagTreeObj: tagTreeObj[categoryId], categoryId})

  return (
    <nav className='CategorySidebar'>
      {sidebarJSX}
    </nav>
  )
}
