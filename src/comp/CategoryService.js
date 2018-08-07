import React from 'react'
import {
  Link
} from 'react-router-dom'

export default ({tagObj, tagTreeObj, categoryId}) => {
  const renderServiceSegments = (serviceIds) => {
    let gridStyle
    if (serviceIds.length === 2) {
      gridStyle = 'two'
    } else {
      gridStyle = 'three'
    }
    const serviceSegmentsJSX = serviceIds.map((serviceId, serviceIdIndex) => {
      const serviceChildrenJSX = Object.keys(tagTreeObj[categoryId][serviceId]).map((serviceChildrenId, serviceChildrenIdIndex) => {
        const serviceChildrenItem = tagObj[categoryId][serviceChildrenId]
        return (
          <Link to={`${categoryId}/${serviceChildrenId}`} className='item'>
            {serviceChildrenItem.title}
          </Link>
        )
      })
      const serviceItem = tagObj[categoryId][serviceId]
      return (
        <div key={`${serviceId}-${serviceIdIndex}`} className='column'>
          <section className='ui basic secondary segment' style={{height: '100%'}} >
            <h3 className='ui center aligned dividing header'>
              {serviceItem.title}
            </h3>
            <div className='ui relaxed list'>
              {serviceChildrenJSX}
            </div>
          </section>
        </div>
      )
    })
    return (
      <div className={`${gridStyle} column stackable ui grid`}>
        {serviceSegmentsJSX}
      </div>
    )
  }

  const mainServiceIds = Object.keys(tagTreeObj[categoryId]).slice(0, 2)
  const subServiceIds = Object.keys(tagTreeObj[categoryId]).slice(2, 5)

  return (
    <section className='CategoryService'>
      {renderServiceSegments(mainServiceIds)}
      {renderServiceSegments(subServiceIds)}
    </section>
  )
}
