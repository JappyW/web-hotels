import React from "react";
import PropTypes from "prop-types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export class Pagination extends React.Component {
  render() {
    return (
      this.props.pagesList.length !== 1 && (
        <div className="pagination my-3">{this.renderPaginationPages()}</div>
      )
    );
  }

  renderMobilePaginationContent() {
    return (
      <div className="page-item d-md-none">
        <span className="page-link-mobile">
          <input
            className="form-control d-inline-block page-input-mobile"
            type="text"
            placeholder={this.props.currentPage}
            onChange={this.handleChange}
          />
          <span className="mx-1">of</span>
          {this.props.countPage}
        </span>
      </div>
    );
  }

  handleChange = event => {
    const page = parseInt(event.target.value)
    !page || page > this.props.countPage 
      ? this.props.requestCurrentPage(1)
      : this.props.requestCurrentPage(page);
  };

  renderPaginationPages() {
    const leftArrow = <FaAngleLeft />;
    const rightArrow = <FaAngleRight />;
    const disabledLeftArrow = this.props.currentPage === 1;
    const disabledRightArrow = this.props.currentPage === this.props.countPage;
    const mainPages = this.renderMainPage();

    return (
      <>
        {this.renderPage(
          this.props.currentPage - 1,
          false,
          leftArrow,
          disabledLeftArrow
        )}
        <div className="pagination-ch">
          {this.renderFirstAndLastPages(mainPages)}
        </div>
        <div className="mobile-pagination-ch">
          {this.renderMobilePaginationContent()}
        </div>
        {this.renderPage(
          this.props.currentPage + 1,
          false,
          rightArrow,
          disabledRightArrow
        )}
      </>
    );
  }

  renderFirstAndLastPages(content) {
    return (
      <>
        {this.props.currentPage > 2 &&
          this.renderPage(this.props.pagesList[0], true)}
        {content && content}
        {this.props.currentPage <
          this.props.pagesList[this.props.pagesList.length - 2] &&
          this.renderPage(
            this.props.pagesList[this.props.pagesList.length - 1],
            true
          )}
      </>
    );
  }

  dots() {
    return (
        <span className="test-light">...</span>
    );
  }

  renderMainPage() {
    const modifiedPageList = this.props.pagesList.filter(
      page =>
        page === this.props.currentPage ||
        page === this.props.currentPage - 1 ||
        page === this.props.currentPage + 1
    );
    const dotsPageFirst = modifiedPageList[0] >= 3;
    const dotsPageLast = modifiedPageList[0] < this.props.countPage - 2;

    return (
      <>
        {dotsPageFirst && this.renderPage(null, false, this.dots(), true)}
        {modifiedPageList.map(page => this.renderPage(page, true))}
        {dotsPageLast && this.renderPage(null, false, this.dots(), true)}
      </>
    );
  }

  renderPage(numberPage, isPage, contentPage, disabled) {
    if (
      numberPage < 0 ||
      numberPage === 0 ||
      numberPage === null ||
      numberPage > this.props.countPage
    ) {
      numberPage = 1;
    }

    const disabledPage = disabled ? "disabled" : "";

    return isPage ? (
      <div
        key={numberPage}
        className={`page-item ${disabledPage} ${
          this.props.currentPage === numberPage ? " active" : ""
        }`}
      >
        <span
          className="page-link"
          onClick={() => {
            this.props.requestCurrentPage(numberPage);
          }}
        >
          {contentPage ? contentPage : numberPage}
        </span>
      </div>
    ) : (
      <div className={`page-item ${disabledPage}`}>
        <span
          className="page-link"
          onClick={() => {
            this.props.requestCurrentPage(numberPage);
          }}
        >
          {contentPage}
        </span>
      </div>
    );
  }
}

Pagination.propTypes = {
  pagesList: PropTypes.array,
  countPage: PropTypes.number,
  currentPage: PropTypes.any,
  requestCurrentPage: PropTypes.func
};

export default Pagination;