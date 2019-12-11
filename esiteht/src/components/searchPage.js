import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      data: []
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
            to="/repo"
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
      <div className="container center">
        <h1 className="header">Github users repo search</h1>
        <form onSubmit={this.search}>
          
          <br />
          <input className="input" type="text" value={this.state.searchTerm} onChange={this.handleChange} />
          <br />
          <input className="button" type="submit" value="Search" />
        </form>
        <div className="repoList">{repoList}</div>
      </div>
    )
  }
}
