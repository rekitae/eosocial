import React from 'react'
import { Div } from 'glamorous'
import QuickSubmit from './QuickSubmit'
import FeedItem from './FeedItem'
import {
  getGlobalFeed,
} from '../libs/EosJsApi'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      feedItems: [],
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    await getGlobalFeed().then((response) => {
      response.rows.map((data) => {
        data.key = data.id

        return data
      })

      this.setState({
        loading: false,
        feedItems: response,
      })
    })
  }

  render() {
    const items = this.state.feedItems.rows || ''
    let feed = null

    if (items !== '') {
      feed = items.reverse().map((item) => {
        return (
          <FeedItem
            key={item.key}
            id={item.id}
            author={item.author}
            content={item.content}
            voting={item.voting}
            createdAt={item.created_at}
            updatedAt={item.updated_at}
            loading={this.state.loading}
            auth={this.props.auth}
            profile={this.props.profile}
          />
        )
      })
    } else {
      feed = (
        <div>
          <FeedItem />
          <span>No items found.</span>
        </div>
      )
    }

    return (
      <Div
        width='546px'
        marginLeft='20px'
        marginRight='20px'
      >
        <QuickSubmit auth={this.props.auth} profile={this.props.profile} fetch={this.fetch} />
        <Div>
          { feed }
        </Div>
      </Div>
    )
  }
}

Feed.defaultProps = {
  auth: false,
  profile: {
    username: '',
    publicKey: '',
    privateKey: '',
  },
}
