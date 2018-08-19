import React from 'react'
import {
  NavLink
} from 'react-router-dom'

const renderMenu = ({tagObj, tagTreeObj, categoryId, currentDepth, currentDepth2FolderItemStyle}) => {
  const listJSX = Object.keys(tagTreeObj).map((tagId, tagIdIndex) => {
    currentDepth += 1

    let subListJSX
    let itemStyle = ''

    if (Object.keys(tagTreeObj[tagId]).length > 0) {
      itemStyle += currentDepth2FolderItemStyle[currentDepth]
      subListJSX = renderMenu({tagObj, tagTreeObj: tagTreeObj[tagId], categoryId, currentDepth, currentDepth2FolderItemStyle})
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

  const menuStyle = currentDepth === 0 ? 'ui vertical fluid' : ''
  return (
    <div className={`${menuStyle} menu`}>
      {listJSX}
    </div>
  )
}

export default renderMenu
