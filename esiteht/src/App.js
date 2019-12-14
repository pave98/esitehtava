import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import RepositoryPage from './components/RepositoryPage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repoName: '',
      commits_url: '',
      page: true
    }
    this.handleRepo = this.handleRepo.bind(this)
    //this.setThePage = this.setThePage.bind(this)
  }

  /*  setThePage() {
    if (this.state.page === true) {
      return <SearchPage handleRepo={this.handleRepo} />
    } else if (this.state.page === false) {
      return <RepositoryPage repoName={this.state.repoName} commits={this.state.commits_url} />
    }
  }*/

  handleRepo(repoName, commits_url) {
    this.setState({ repoName: repoName, page: !this.state.page, commits_url: commits_url })

  }

  render() {
    return (
      <Router>
        <div className="mainBody center">
          <Switch>
            <Route
              path="/repo"
              render={(props) => (
                <RepositoryPage {...props} repoName={this.state.repoName} commits={this.state.commits_url} />
              )}
            />
            <Route path="/" render={(props) => <SearchPage {...props} handleRepo={this.handleRepo} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
