import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import Navbar from './comp/Navbar'
import Header from './comp/Header'
import Footer from './comp/Footer'

import Home from './page/Home'

import categoryCsvArray from './data/BOE - data - category.csv'
import tagCsvArray from './data/BOE - data - tag.csv'

import parseData from './func/parseData'

import SITE_SETTING from './const/SITE_SETTING'

const Category = ({categoryId, tagId, categoryObj, categoryIdArray, tagObj}) => {
  const categoryText = categoryObj && categoryObj[categoryId] ? ` > ${categoryObj[categoryId].title}` : ''
  const tagText = tagObj && tagObj[tagId] ? ` > ${tagObj[tagId].title}` : ''
  return (
    <div className='Category'>
      <Header>
        <Navbar categoryObj={categoryObj} categoryIdArray={categoryIdArray} />
      </Header>
      <section className='page headline'>
      </section>
      <section className='breadcumb'>
        <div className='ui container'>
          <Link to='/'>
            首頁
          </Link>
          {categoryText}
          {tagText}
        </div>
      </section>
    </div>
  )
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  async getData () {
    this.setState(parseData({tagCsvArray, categoryCsvArray}))
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    console.log(this.state)
    return (
      <Router basename={`/${SITE_SETTING.repo}`}>
        <div className='App'>
          <Switch>
            <Route exact path='/' render={() => Home({
              categoryObj: this.state.categoryObj,
              categoryIdArray: this.state.categoryIdArray
            })} />
            <Route path='/:categoryId/:tagId?' render={({match}) => Category({
              categoryId: match.params.categoryId,
              tagId: match.params.tagId,
              categoryObj: this.state.categoryObj,
              categoryIdArray: this.state.categoryIdArray,
              tagObj: this.state.tagObj
            })} />
          </Switch>
          {
            Footer({
              tagObj: this.state.tagObj,
              categoryObj: this.state.categoryObj,
              categoryIdArray: this.state.categoryIdArray,
              tagTreeObj: this.state.tagTreeObj
            })
          }
        </div>
      </Router>
    )
  }
}

export default App
