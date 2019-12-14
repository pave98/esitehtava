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
    if (this.state.searchTerm) {
      fetch('https://api.github.com/users/' + this.state.searchTerm + '/repos?type=all?sort=full_name')
        .then((response) => response.json())
        .then((response) => {
          this.setState({ data: response })
        })
    } else {
      this.setState({
        data: { name: 'please enter a search term' }
      })
    }

    event.preventDefault()
  }

  render() {
    let repoList = []
    if (this.state.data.length > 0) {
      repoList = this.state.data.map((item) => {
        return (
          <Link
            to="/repo"
            key={item.name}
            onClick={() => {
              this.props.handleRepo(item.name, item.commits_url.slice(0, -6))
            }}
          >
            <div className="repoContainer">
              <p>{item.name}</p>
            </div>
          </Link>
        )
      })
    }

    return (
      <div className="container center">
        <h1 className="header">Github users repo search</h1>
        <form onSubmit={this.search}>
          <input className="input" type="text" value={this.state.searchTerm} onChange={this.handleChange} />
          <br />
          <input className="button" type="submit" value="Search" />
        </form>
        <div className="repoList">{repoList}</div>
      </div>
    )
  }
}
