import React from 'react'
import renderMenu from '../func/renderMenu'

export default ({tagObj, tagTreeObj, categoryId}) => {
  let currentDepth = 0

  const currentDepth2FolderItemStyle = {
    0: '',
    1: 'level1',
    2: 'level2',
    3: 'level3'
  }

  const sidebarJSX = renderMenu({tagObj: tagObj[categoryId], tagTreeObj: tagTreeObj[categoryId], categoryId, currentDepth, currentDepth2FolderItemStyle})

  return (
    <nav className='CategorySidebar'>
      {sidebarJSX}
    </nav>
  )
}
