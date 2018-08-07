import React from 'react'
import {
  Link
} from 'react-router-dom'

export default ({tagObj, tagTreeObj, categoryId}) => {
  const renderPolicySegments = (policyIds) => {
    let gridStyle
    if (policyIds.length === 1) {
      gridStyle = ''
    } else {
      gridStyle = 'three column stackable'
    }
    const policySegmentsJSX = policyIds.map((policyId, policyIdIndex) => {
      const policyItem = tagObj[categoryId][policyId]
      return (
        <div key={`${policyId}-${policyIdIndex}`} className='column'>
          <section className='ui basic center aligned secondary segment' style={{height: '10rem'}}>
            <h3 className='ui header'>
              {policyItem.title}
            </h3>
          </section>
        </div>
      )
    })
    return (
      <div className={`${gridStyle} ui grid`}>
        {policySegmentsJSX}
      </div>
    )
  }

  const mainPolicyIds = Object.keys(tagTreeObj[categoryId].plan).slice(0, 1)
  const subPolicyIds = Object.keys(tagTreeObj[categoryId].plan).slice(1, 4)
  const restPolicyIds = Object.keys(tagTreeObj[categoryId].plan).slice(4)

  return (
    <section className='CategoryPolicy'>
      {renderPolicySegments(mainPolicyIds)}
      {renderPolicySegments(subPolicyIds)}
      {renderPolicySegments(restPolicyIds)}
      <hr className='ui section divider' />
      <section className='ui basic center aligned secondary segment' style={{height: '10rem'}}>
        <h3 className='ui header'>
          本局主管法規
        </h3>
      </section>
    </section>
  )
}
