import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import RepositoryPage from './components/RepositoryPage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      data: [],
      repoName: '',
      commits_url: '',
    }
    this.checkIfEmpty = this.checkIfEmpty.bind(this)
    this.handleRepo = this.handleRepo.bind(this)
  }

  //Checks if a search has been made before allowing entry to the /repo site
  checkIfEmpty() {
    if (this.state.repoName === '') {
      return false
    } else {
      return true
    }
  }

  //saves the data from the search page that is used in the repository page.
  handleRepo(searchTerm, data, repoName, commits_url) {
    this.setState({
      searchTerm: searchTerm,
      data: data,
      repoName: repoName,
      commits_url: commits_url
    })
  }

  render() {
    return (
      <Router>
        <div className="mainBody center">
          <Switch>
            <Route
              path="/repo"
              render={(props) => {
                if (this.checkIfEmpty()) {
                  return <RepositoryPage {...props} repoName={this.state.repoName} commits={this.state.commits_url} />
                } else {
                  return <Redirect to="/" />
                }
              }}
            />
            <Route
              path="/"
              render={(props) => (
                <SearchPage
                  {...props}
                  searchTerm={this.state.searchTerm}
                  data={this.state.data}
                  handleRepo={this.handleRepo}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
