import React from 'react'
import {
  Link,
  NavLink
} from 'react-router-dom'

export default (props) => {
  return (
    <header className='Header'>
      <div className='ui container'>
        <section className='head'>
          <Link className='logo' to='/' />
          <div className='options'>
            <div className='ui mini basic buttons' data-option='font-size'>
              <div className='ui button' style={{fontSize: '0.85rem'}}>
                小
              </div>
              <div className='ui button' style={{fontSize: '1rem'}}>
                中
              </div>
              <div className='ui button' style={{fontSize: '1.15rem'}}>
                大
              </div>
            </div>
            <select className='ui simple dropdown' data-option='lang'>
              <option className='item' data-value='zh'>中</option>
              <option className='item' data-value='en'>En</option>
            </select>
            <div className='actions'>
              <i className='share alternate icon' />
              <i className='print icon' />
              <i className='rss icon' />
            </div>
            <Link to='sitemap' className='guide'>
              網站地圖
            </Link>
          </div>
        </section>
        {props.children}
      </div>
    </header>
  )
}
