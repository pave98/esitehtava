import React, { Component } from 'react'

export default class RepositoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repoName : props.repoName,
      commits  : props.commits,
      data     : []
    }
    console.log(props)
  }

  componentDidMount() {
    fetch(this.state.commits).then((response) => response.json()).then((response) => {
      this.setState({ data: response.slice(0, 10) })
      console.log(response)
    })
  }

  render() {
    console.log(this.state.data)
    let commitList = this.state.data.map((item) => {
      let avatar
      if (item.commit.author.avatar_url) {
        avatar = (
          <div>
            <img src={item.author.avatar_url} alt='avatar' />
          </div>
        )
      }
      return (
        <div style={{ margin: 5, border: '1px solid black' }}>
          {avatar}
          <p>{item.commit.author.name}</p>
          <p>{item.commit.author.date}</p>
          <p>{item.commit.message}</p>
        </div>
      )
    })
    return (
      <div>
        <h1>{this.props.repoName}</h1>
        <h1>{this.props.commits}</h1>
        {commitList}
      </div>
    )
  }
}
