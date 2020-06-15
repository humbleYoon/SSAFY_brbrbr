/** @jsx jsx  */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'
import { Pager } from 'react-bootstrap';

import ReactPageScroller from './Scroll'
import FirstComponent from './LandingPages/FirstComponent'
import SecondComponent from './LandingPages/SecondComponent'
import ThirdComponent from './LandingPages/ThirdComponent'
import FourthComponent from './LandingPages/FourthComponent'
import FifthComponent from './LandingPages/FifthComponent'

import '../index_lan.css'


export default function LandingPages() {
  const [currentPage, setCurrentPage] = useState(null)

  const handlePageChange = (i) => {
    setCurrentPage(i) // set currentPage number, to reset it from the previous selected.
  }

  function getPagesNumbers() {
    const pageNumbers = []

    for (let i = 1; i <= 4; i++) {
      pageNumbers.push(
        <Pager.Item 
        key={i} eventKey={i - 1} onSelect={handlePageChange}>
          { }
        </Pager.Item>
      )
    }
    return [...pageNumbers]
  }

  const pagesNumbers = getPagesNumbers()

  return (
    <body>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
      >
        {/* <FirstComponent /> */}
        <SecondComponent />
        <ThirdComponent />
        <FifthComponent />
        <FourthComponent />
      </ReactPageScroller>
      <Pager className="pagination-additional-class">
        {pagesNumbers}
      </Pager>
    </body>
  )
}