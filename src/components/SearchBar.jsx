import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, TextField, IconButton, Tabs, Tab } from 'material-ui'
import { Search } from 'material-ui-icons'


export default class SearchBar extends Component {
  static propTypes = {
    onChange : PropTypes.func,
    pages: PropTypes.number,
    isFetching: PropTypes.bool
  }

  state = {
    tab: 0,
    tabs: [],
    name: '',
    year: '',
    checked: true
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.tabs.length !== nextProps.pages) {
      const tabs = new Array(nextProps.pages);
      for (let i = 0; i < tabs.length; i++) {
        tabs[i] = i
      };
      this.setState({ tabs});
    }
  }

  handleChange = name => ({ target: { value }}) =>
    this.setState({
      [name]: value
    });

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
    this.props.onChange({
      page: value + 1
    })
  };

  handleSearch = e => {
    if (this.state.name && e.keyCode === 13
        || this.state.name && !e.keyCode) {
      this.props.onChange({
        name: this.state.name,
        year: this.state.year
      });
      this.setState({
        name: '',
        year: '',
        tab: 0,
        checked: true
      })
    } else if (!this.state.name) {
      this.setState({
        checked: false
      })
    }
  }

    render() {
      const { isFetching } = this.props;
      const { name, year, checked, tab, tabs} = this.state;
      return (
        <AppBar position="static" color="default">
          <Toolbar style={{justifyContent: "space-between"}}>
            {
              checked
              ? <TextField
                  label="Movie title"
                  placeholder="Enter the movie title"
                  value={name}
                  onKeyUp={this.handleSearch}
                  onChange={this.handleChange('name')}
                  margin="none"
                  required
                />
              : <TextField
                  label="Movie title"
                  placeholder="Enter the movie title"
                  value={name}
                  onKeyDown={this.handleSearch}
                  onChange={this.handleChange('name')}
                  margin="none"
                  error
                />
            }
            <TextField
              label="Movie year"
              placeholder="Enter the movie release year"
              type="number"
              value={year}
              onChange={this.handleChange('year')}
              margin="none"
            />
            <IconButton color="inherit" aria-label="Search" onClick={this.handleSearch}>
              <Search  />
            </IconButton>
          </Toolbar>
          {
            isFetching
            ? null
            : <Tabs
                value={tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
              >
                {
                  tabs.map((page, i) =>
                    <Tab
                      key={i}
                      label={page + 1}
                    />
                  )
                }
              </Tabs>
          }
        </AppBar>
      )
    }
}
