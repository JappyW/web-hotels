import React from "react";
import PropTypes from "prop-types";
import StudioCard from "../StudioCard/StudioCard.jsx";
import Pagination from "../../containers/Pagination";
import { AlertMessage } from "../reusableComponents/AlertMessage/AlertMessage.jsx";
import { NOT_VALID_PAGE } from "../../constants";
import Spinner from "../reusableComponents/Spinner";

export class Studios extends React.Component {
  componentDidMount() {
    const CURRENT_PAGE_FIRST = 1;
    const DEFAULT_CURRENT_PAGE = parseInt(this.props.defaultPage);
    !DEFAULT_CURRENT_PAGE || DEFAULT_CURRENT_PAGE <= 0
      ? this.props.requestCurrentPage(CURRENT_PAGE_FIRST)
      : this.props.requestCurrentPage(DEFAULT_CURRENT_PAGE);
  }

  render() {
    const {
      loading,
      studios,
      currentPage,
      countPage,
      pagesList,
      requestCurrentPage
    } = this.props;
    const TOGGLE_TOP_PAGINATION = 1;

    if (loading) {
      return (
        <div className="container mt-5 spinner-space">
          <Spinner />
        </div>
      );
    }

    if (currentPage > countPage) {
      return (
        <div className="container mt-5 spinner-space">
          <AlertMessage message={NOT_VALID_PAGE} alertStyle="alert-danger" />
        </div>
      );
    }

    return (
      <>
        <div className="container my-5">
          {studios.length >= TOGGLE_TOP_PAGINATION && (
            <Pagination
              pagesList={pagesList}
              countPage={countPage}
              currentPage={currentPage}
              requestCurrentPage={requestCurrentPage}
            />
          )}
          <div className="row mt-2">
            {studios.map(studio => (
              <div key={studio.id} className="col-lg-4 col-md-6 col-sm-12 my-3">
                <StudioCard studio={studio}  info={this.props}/>
              </div>
            ))}
          </div>
          <Pagination
            pagesList={pagesList}
            countPage={countPage}
            currentPage={currentPage}
            requestCurrentPage={requestCurrentPage}
          />
        </div>
      </>
    );
  }
}

Studios.propTypes = {
  studios: PropTypes.array,
  searchStudios: PropTypes.array,
  pagesList: PropTypes.array,
  countPage: PropTypes.number,
  currentPage: PropTypes.any,
  requestCurrentPage: PropTypes.func,
  defaultPage: PropTypes.string,
  loading: PropTypes.bool
};