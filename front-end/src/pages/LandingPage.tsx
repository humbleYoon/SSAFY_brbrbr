import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'

import ReactPageScroller from './Scroll'
import FirstComponent from './LandingPages/FirstComponent'
import SecondComponent from './LandingPages/SecondComponent'
import ThirdComponent from './LandingPages/ThirdComponent'
import FourthComponent from './LandingPages/FourthComponent'
import FifthComponent from './LandingPages/FifthComponent'

import '../index.css'
import buttonImg from '../assets/button.png'

function LandingPages() {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const handlePageChange = (number: number) => {
    setCurrentPage(number) // set currentPage number, to reset it from the previous selected.
  }

  const getPagesNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} eventKey={i - 1} onSelect={handlePageChange}>
          <img src={buttonImg} />
        </Pagination.Item>
      )
    }

    return [...pageNumbers]
  }

  const pagesNumbers = getPagesNumbers()

  return (
    <div>
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
    </div>
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
