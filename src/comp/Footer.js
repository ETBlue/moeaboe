import React from 'react'
import {
  Link
} from 'react-router-dom'

import MENU_CLASS_SETTING from '../const/MENU_CLASS_SETTING'
import SITE_SETTING from '../const/SITE_SETTING'

export default ({tagObj, categoryObj, categoryIdArray, tagTreeObj}) => {
  if (!tagObj || !categoryObj || !categoryIdArray || !tagTreeObj) return null

  const menuClass = MENU_CLASS_SETTING[categoryIdArray.length]

  const guideJSX = categoryIdArray.map((categoryId, categoryIdIndex) => {
    const listJSX = Object.keys(tagTreeObj[categoryId]).map((tagId, tagIdIndex) => {
      return (
        <Link to={`/${categoryId}/${tagId}`} className='item' key={`${tagId}-${tagIdIndex}`} >
          {tagObj[categoryId][tagId].title}
        </Link>
      )
    })
    return (
      <div className='column' key={`${categoryId}-${categoryIdIndex}`}>
        <p>
          {categoryObj[categoryId].title}
        </p>
        <div className='ui small relaxed list'>
          {listJSX}
        </div>
      </div>
    )
  })

  return (
    <footer className='Footer'>
      <section className='guide'>
        <div className='ui container'>
          <div className={`ui ${menuClass} column stackable grid`}>
            {guideJSX}
          </div>
        </div>
      </section>
      <section className='meta'>
        <div className='ui container'>
          <div className='ui two column stackable divided grid'>
            <div className='column'>
              <div className='site info'>
                <div className='banners'>
                  <div className='banner accessability' />
                  <div className='banner gov' />
                </div>
                <div className='text'>
                  <div className='ui small relaxed list'>
                    <Link className='item' to='/'>
                      <i className='icon file alternate outline' />
                      <div className='content'>
                        政府網站資料開放宣告
                      </div>
                    </Link>
                    <Link className='item' to='/'>
                      <i className='icon file alternate outline' />
                      <div className='content'>
                        隱私權政策
                      </div>
                    </Link>
                    <Link className='item' to='/'>
                      <i className='icon file alternate outline' />
                      <div className='content'>
                        網站安全政策
                      </div>
                    </Link>
                  </div>
                  <div className='ui small relaxed list'>
                    <div className='item'>
                      瀏覽器支援 IE、Firefox 及 Chrome
                    </div>
                    <div className='item'>
                      最佳解析度 1024x768 以上
                    </div>
                  </div>
                  <div className='ui small relaxed list'>
                    <div className='item'>
                      於 2018 年 7 月 17 日更新
                    </div>
                    <div className='item'>
                      共 21,732,159 人次瀏覽
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='name card'>
                <h3 className='ui small header'>
                  {SITE_SETTING.name.zh}
                  <div className='sub header'>
                    {SITE_SETTING.name.en}
                  </div>
                </h3>
                <div className='ui small relaxed list'>
                  <div className='item'>
                    {SITE_SETTING.address.zh}
                  </div>
                  <Link to='/' className='item'>
                    <i className='icon map outline' />
                    <div className='content'>
                      交通位置圖
                    </div>
                  </Link>
                </div>
                <div className='ui small relaxed list'>
                  <div className='item'>
                    電話 {SITE_SETTING.tel[0]}
                  </div>
                  <div className='item'>
                    傳真 {SITE_SETTING.fax[0]} 或 {SITE_SETTING.fax[1]}
                  </div>
                  <Link to='/' className='item'>
                    <i className='icon fire' />
                    <div className='content'>
                      緊急應變聯絡中心
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
