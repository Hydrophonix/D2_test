import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  ListItem,
  ListItemIcon,
  ListItemText, Collapse,
  List, Avatar, Divider,
  CircularProgress,
  Typography
} from 'material-ui'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import StarBorder from 'material-ui-icons/StarBorder'
import './Movie.css'

const IMG_API_PREFIX = 'https://image.tmdb.org/t/p/w'
const IMG_SIZE_S = 92;
const IMG_SIZE_B = 342;

export default class Movie extends Component {
  static propTypes = {
    id : PropTypes.number,
    title : PropTypes.string,
    overview : PropTypes.string,
    popularity : PropTypes.number,
    date : PropTypes.string,
    poster_path : PropTypes.string,
    release_date : PropTypes.string,
    vote_average : PropTypes.number,
  }

  state = { open: false }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const {
      id,
      title,
      overview,
      popularity,
      date,
      poster_path,
      release_date,
      vote_average,
    } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <Avatar
            src={`${IMG_API_PREFIX}${IMG_SIZE_S}${poster_path}`}
            alt={title}
          />
          <ListItemText
            inset
            primary={title}
            secondary={release_date}
           />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <div className="movie_info">
            <div className="movie_info-header">
              <Typography
                variant="display1"
              >
                {title}
              </Typography>
              <div className="movie_info-popularity">
                <Typography
                  variant="title"
                >
                  Popularity:
                </Typography>
                <div className="movie_info-popularityIcon">
                  <CircularProgress
                    variant="static"
                    value={vote_average * 10}
                  />
                  <p className="movie_info-popularityText">
                    {vote_average}
                  </p>
                </div>
              </div>
              <Typography
                variant="title"
              >
                Overview:
              </Typography>
              <p className="movie_info-text">
                {overview}
              </p>
              <a
                target="_blank"
                href={`https://www.themoviedb.org/movie/${id}?language=en-US`}
              >
                {title} on TMDB
              </a>
            </div>
            <div className="movie_info-img">
              <img
                src={`${IMG_API_PREFIX}${IMG_SIZE_B}${poster_path}`}
                alt={title}
              />
            </div>
          </div>
        </Collapse>
        <li>
          <Divider inset />
        </li>
      </Fragment>
    );
  }
}
