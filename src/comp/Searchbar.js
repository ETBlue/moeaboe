import React from 'react'
import {
  Link
} from 'react-router-dom'

export default () => {
  const NEEDS = [
    '能源時事',
    '法規與公民參與',
    '本局報告與資料',
    '知識與教材',
    '優惠方案'
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
            所有類型
          </div>
          <i className='dropdown icon' />
          <div className='menu'>
            <div className='item'>
              所有類型
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
