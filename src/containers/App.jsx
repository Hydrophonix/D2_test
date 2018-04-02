import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader';
import { CircularProgress, LinearProgress } from 'material-ui'

import { fetchMovies, searchParams } from '../actions'
import MovieList from '../components/MovieList.jsx'
import SearchBar from '../components/SearchBar.jsx'

class AppContainer extends Component {
  componentDidMount() {
    this.props.fetchMovies(this.props.search)
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.search !== nextProps.search) {
      this.props.fetchMovies(nextProps.search)
    }
  }

  handleSearchParamsChange = params => {
    this.props.searchParams(params)
  };

  render() {
    const { isFetching } = this.props;
    const movies = this.props.data.results;
    const pages = this.props.data.total_pages;

    return (
      <Fragment>
        <SearchBar
          pages={pages}
          isFetching={isFetching}
          onChange={this.handleSearchParamsChange}
        />
        {
          isFetching
          ? <LinearProgress />
          : <MovieList movies={movies} />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  data: state.movies.data,
  isFetching: state.movies.isFetching,
  search: state.search
});

export default hot(module)(connect(mapStateToProps, { fetchMovies, searchParams })(AppContainer))
