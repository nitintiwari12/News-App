import React, { Component } from 'react'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0
    }
  }
  async getAPIData() {
    let response = await fetch("https://newsapi.org/v2/everything?q=all&sortBy=publishedAt&language=hi&apiKey=4665bb14c974495cbc087086e17f652d")
    response = await response.json()
    console.log(response)
  }
  componentDidMount() {
    this.getAPIData()
  }
  render() {
    return (
      <div className='container-fluid'>
        <h5 className='bg-secondary text-light text-center p-2 my-2'><span className='text-capitalize'>{this.props.q}</span> News Aritcles</h5>
      </div>
    )
  }
}
