import React, { Component } from 'react'

export default class RepositoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repoName: props.repoName,
      commits: props.commits,
      data: []
    }
  }

  componentDidMount() {
    fetch(this.state.commits).then((response) => response.json()).then((response) => {
      this.setState({ data: response.slice(0, 10) })
    })
  }

  render() {
    let commitList = this.state.data.map((item) => {
      let avatar
      let date = new Date(item.commit.author.date)
      date =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes()

      if (item.commit.author.avatar_url) {
        avatar = (
          <div>
            <img src={item.author.avatar_url} alt="avatar" />
          </div>
        )
      }
      return (
        <div key={item.sha} className="commitListItem center">
          {avatar}
          <p>
            {item.commit.author.name} {date}
          </p>
          <p>{item.commit.message}</p>
        </div>
      )
    })

    return (
      <div className="container">
        <h1 className="header center">{this.props.repoName} - commits</h1>
        <br />
        {commitList}
      </div>
    )
  }
}
