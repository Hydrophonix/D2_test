import React, { Component } from 'react'
import { Paper, List } from 'material-ui'

import Movie from './Movie.jsx';


export default class UserList extends Component {
    render() {
        const { movies } = this.props;
        return (
          <Paper style={{height: 800, overflowY: 'auto'}}>
            <List>
              {
                movies.map(item =>
                  <Movie
                    key={item.id}
                    {...item}
                  />
                )
              }
            </List>
          </Paper>
        )
    }
}
