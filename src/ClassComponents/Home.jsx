import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import NewsItem from './NewsItem'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            totalResults: 0,
            page: 1
        }
    }
    async getAPIData(page) {
        let response = await fetch(`https://newsapi.org/v2/everything?&page=${page}&q=${this.props.q}&sortBy=publishedAt&language=${this.props.language}&pageSize=12&apiKey=301c5411d2c14378ae6c68c0ff399326`)
        response = await response.json()
        if (response.articles) {
            if (page === 1) {
                this.setState({
                    articles: response.articles.filter((x) => x.title !== "[Removed]"),
                    totalResults: response.totalResults
                })
            }
            else
                this.setState({ articles: this.state.articles.concat(response.articles.filter((x) => x.title !== "[Removed]")) })
        }
    }
    fetchData = async () => {
        this.getAPIData(this.state.page + 1)
        this.setState({ page: this.state.page + 1 })
    }
    componentDidMount() {
        this.getAPIData(1)
    }
    componentDidUpdate(oldProps) {
        if (this.props !== oldProps) {
            this.getAPIData(1)
        }
    }
    render() {
        console.log("called")
        return (
            <div className='container-fluid'>
                <h5 className='bg-secondary text-light text-center p-2 my-2'><span className='text-capitalize'>{this.props.q}</span> News Aritcles</h5>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={
                        <div className='py-5 text-center'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>No More Data</b>
                        </p>
                    }
                >
                    <div className="row">
                        {
                            this.state.articles.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    title={item.title}
                                    source={item.source.name}
                                    pic={item.urlToImage}
                                    date={item.publishedAt}
                                    description={item.description}
                                    url={item.url}
                                />
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
