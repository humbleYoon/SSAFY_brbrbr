/** @jsx jsx  */
import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'

import ReactPageScroller from './Scroll'
import FirstComponent from './LandingPages/FirstComponent'
import SecondComponent from './LandingPages/SecondComponent'
import ThirdComponent from './LandingPages/ThirdComponent'
import FourthComponent from './LandingPages/FourthComponent'
import FifthComponent from './LandingPages/FifthComponent'

import '../index_lan.css'
import buttonImg from '../assets/button.png'


function LandingPages() {
  const [currentPage, setCurrentPage] = useState<any>(null)

  const handlePageChange = (i:number) => {
    // console.log(currentPage, '바꾸기 전')
    setCurrentPage(i) // set currentPage number, to reset it from the previous selected.
    // console.log(currentPage, '바꾼 후')
    // ??? 눌러도 지금 상태에서 변하지 않음
  }

  const getPagesNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} eventKey={i - 1} onSelect={(i:number) => handlePageChange}>
          {i}
          {/* <img src={buttonImg} /> */}
        </Pagination.Item>
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
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
        <FifthComponent />
      </ReactPageScroller>
      <Pagination className="pagination-additional-class">
        {pagesNumbers}
      </Pagination>
    </body>
  )
}

export default LandingPages

// export default class Landing extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { currentPage: null };
//   }

//   handlePageChange = number => {
//     this.setState({ currentPage: number }); // set currentPage number, to reset it from the previous selected.
//   };

//   getPagesNumbers = () => {
//     const pageNumbers = [];

//     for (let i = 1; i <= 5; i++) {
//       pageNumbers.push(
//         <Pager.Item key={i} eventKey={i - 1} onSelect={this.handlePageChange}>
//           <img src={buttonImg} />
//         </Pager.Item>
//       );
//     }

//     return [...pageNumbers];
//   };

//   render() {
//     const pagesNumbers = this.getPagesNumbers();

//     // window.scrollTo(0, 1)
//     // document.documentElement.requestFullscreen();

//     // document.getElementsByTagName("META")[2].name="mobile-web-app-capable";
//     // document.getElementsByTagName("META")[2].content="yes";

//     return (
//       <React.Fragment>

//         <ReactPageScroller
//           pageOnChange={this.handlePageChange}
//           customPageNumber={this.state.currentPage}
//         >
//           <FirstComponent />
//           <SecondComponent />
//           <ThirdComponent />
//           <FourthComponent />
//           <FifthComponent />
//         </ReactPageScroller>
//         <Pager className="pagination-additional-class" bsSize="large" >
//           {pagesNumbers}
//         </Pager>
//       </React.Fragment>
//     );
//   }
// }
