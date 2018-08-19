import React from 'react'
import {
  Link
} from 'react-router-dom'

export default () => {
  const blockIdArray = [
    '為什麼要能源轉型',
    '臺灣的關鍵能源數據',
    '我們如何邁向能源轉型'
  ]

  const blockJSX = blockIdArray.map((blockId, blockIdIndex) => {
    return (
      <section key={blockId} className='section'>
        <h2 className='ui medium center aligned header'>
          {blockId}
        </h2>
      </section>
    )
  })
  return (
    <div className='CategoryTransition'>
      {blockJSX}
    </div>
  )
}
