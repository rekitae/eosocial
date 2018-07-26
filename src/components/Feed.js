import React from 'react'
import { Div } from 'glamorous'
import FeedItem from './FeedItem'
import {
  getGlobalFeed,
} from '../libs/EosJsApi'

export default class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      feedItems: [],
    }
  }

  componentDidMount() {
    getGlobalFeed().then((response) => {
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
    const items = this.state.feedItems.rows || ['']
    console.log('[ render() ]: ', items)
    const feed = items.map((item) => {
      return (
        <FeedItem
          key={item.id}
          author={item.author}
          content={item.content}
          createdAt={item.created_at}
          updatedAt={item.updated_at}
          loading={this.state.loading}
        />
      )
    })

    return (
      <Div
        width='546px'
        marginLeft='20px'
        marginRight='20px'
      >
        {feed}
      </Div>
    )
  }
}