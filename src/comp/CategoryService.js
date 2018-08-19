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
      const serviceItem = tagObj[categoryId][serviceId]
      return (
        <div key={`${serviceId}-${serviceIdIndex}`} className='column'>
          <section className='ui fluid card'>
            <div className='image' style={{height: '10rem'}} >
            </div>
            <div className='content'>
            <Link to={`/service/${serviceId}`} className='center aligned header'>
              {serviceItem.title}
            </Link>
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
