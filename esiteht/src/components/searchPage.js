import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm : '',
      data       : []
    }

    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
  }


  handleChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  search(event) {
    fetch('https://api.github.com/users/' + this.state.searchTerm + '/repos')
      .then((response) => response.json())
      .then((response) => this.setState({ data: response }))
    event.preventDefault()
  }

  render() {
    let repoList = this.state.data.map((item) => {
      return (
        <div>
          <Link
            to='/repo'
            onClick={() => {
              this.props.handleRepo(item.name, item.commits_url.slice(0, -6))
            }}
          >
            {item.name}
          </Link>
        </div>
      )
    })

    return (
      <div>
        <h1>search</h1>
        <form onSubmit={this.search}>
          <label>
            Search:
            <input type='text' value={this.state.searchTerm} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <div className='repoList'>{repoList}</div>
      </div>
    )
  }
}
