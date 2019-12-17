import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default class RepositoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repoName : props.repoName,
      commits  : props.commits,
      data     : []
    }
  }

  //Fetches the commits of the given repository using the commits url.
  componentDidMount() {
    fetch(this.state.commits).then((response) => response.json()).then((response) => {
      this.setState({ data: response.slice(0, 10) })
    })
  }

  render() {
    let commitList = this.state.data.map((item) => {
      //Make the date a little bit more readable
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

      //check if the committer has an avatar
      let avatar
      if (item.author !== null) {
        if (item.author.avatar_url !== null) {
          avatar = <img className='avatarImage' src={item.author.avatar_url} alt='avatar' />
        }
      }

      return (
        <div key={item.sha} className='commitListItem center'>
          <div className='avatarContainer'>{avatar}</div>
          <div className='itemContainer'>
            <p>
              {item.commit.author.name} {date}
            </p>
            <p>{item.commit.message}</p>
          </div>
        </div>
      )
    })

    return (
      <div className='container'>
        <div className='repoPageHeader'>
          <div
            className='backButton'
            onClick={() => {
              window.history.back()
            }}
          >
            <FontAwesomeIcon className='arrow' icon={faArrowLeft} size='3x' />
          </div>
          <div className='repoHeader'>
            <h1 className='header center'>{this.props.repoName} - commits</h1>
          </div>
        </div>
        {commitList}
      </div>
    )
  }
}
