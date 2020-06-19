import React from "react";
import PropTypes from "prop-types";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import { Studios } from "../../containers";
import Search from "../../containers/SearchForm";

const Home = props => {
  return (
    <>
      <ScrollUpButton  ContainerClassName='scroll-up-ch'/>
      <Search handleClick={props.clearSearch} />
      <Studios defaultPage={props.match.params.page} info={props} />
    </>
  );
};

Home.propTypes = {
  clearSearch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired
    })
  })
};

export default Home;