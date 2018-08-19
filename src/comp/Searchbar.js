import React from 'react'
import {
  Link
} from 'react-router-dom'

export default () => {
  const NEEDS = [
    '類別 1',
    '類別 2',
    '類別 3',
    '類別 4',
    '類別 5'
  ]
  const searchOptionJSX = NEEDS.map((item, itemIndex) => (
    <div key={`${item}-${itemIndex}`} className='item'>
      {item}
    </div>
  ))

  const SHORTCUTS = [
    '捷徑 1',
    '捷徑 2',
    '捷徑 3',
    '捷徑 4',
    '捷徑 5'
  ]
  const shortcutJSX = SHORTCUTS.map((item, itemIndex) => (
    <Link to='' key={`${item}-${itemIndex}`} className='item'>
      {item}
    </Link>
  ))

  return (
    <div className='Searchbar'>
      <div className='ui action input'>
        <input type='text' placeholder='搜尋關鍵字...' />
        <div className='ui simple dropdown button'>
          <div className='text'>
            所有類別
          </div>
          <i className='dropdown icon' />
          <div className='menu'>
            <div className='item'>
              所有類別
            </div>
            {searchOptionJSX}
          </div>
        </div>
        <Link to='/search' className='ui icon button'>
          <i className='search icon' />
        </Link>
      </div>
      <div className='ui small horizontal divided list'>
        {shortcutJSX}
      </div>
    </div>
  )
}
