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
import Category from './page/Category'

import tagCsvArray from './data/BOE - data - tag.csv'
import categoryCsvArray from './data/BOE - data - category.csv'
import contentCsvArray from './data/BOE - data - content.csv'
import authorCsvArray from './data/BOE - data - author.csv'
import energyCsvArray from './data/BOE - data - energy.csv'
import needCsvArray from './data/BOE - data - need.csv'
import taCsvArray from './data/BOE - data - ta.csv'

import parseData from './func/parseData'

import SITE_SETTING from './const/SITE_SETTING'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  async getData () {
    this.setState(parseData({tagCsvArray, categoryCsvArray, contentCsvArray, authorCsvArray}))
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
            <Route exact path='/' render={() => Home({...this.state})} />
            <Route exact path='/search' render={() => <p>search</p>} />
            <Route path='/:categoryId' render={({match, location}) => Category({
              categoryId: match.params.categoryId,
              tagId: location.pathname.replace(`/${match.params.categoryId}`, '').replace(/^\//, ''),
              ...this.state
            })} />
          </Switch>
          {Footer({...this.state})}
        </div>
      </Router>
    )
  }
}

export default App
