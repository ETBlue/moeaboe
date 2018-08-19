import React from 'react'
import {
  Link
} from 'react-router-dom'

export default ({tagObj, tagTreeObj, categoryId}) => {
  const renderPolicySegments = (policyIds) => {
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
      <div className='three column stackable ui grid'>
        {policySegmentsJSX}
      </div>
    )
  }

  const mainPolicyIds = Object.keys(tagTreeObj[categoryId].plan).slice(0, 3)
  const subPolicyIds = Object.keys(tagTreeObj[categoryId].plan).slice(3, 6)
  const restPolicyIds = Object.keys(tagTreeObj[categoryId].plan).slice(6, 9)
  return (
    <section className='CategoryPolicy'>
      {renderPolicySegments(mainPolicyIds)}
      {renderPolicySegments(subPolicyIds)}
      {renderPolicySegments(restPolicyIds)}
      <hr className='ui section divider' />
      <div className='ui grid'>
        <div className='column'>
          <section className='ui basic center aligned secondary segment' style={{height: '10rem'}}>
            <h3 className='ui header'>
              本局主管法規
            </h3>
          </section>
        </div>
      </div>
    </section>
  )
}
