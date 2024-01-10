import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async () => {
        props.updateProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.updateProgress(30)
        let parsedData = await data.json()
        props.updateProgress(70)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.updateProgress(100)
    }

    useEffect(() => {
        updateNews()
        document.title = `NewsMonkey - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`
        setPage(page + 1)
    }, [])

    const fetchNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h1 className='text-center' style={{marginTop: '60px'}}>NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)}  Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchNews}
                hasMore={articles.length <= totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((e) => {
                            return <div className="col-md-4" key={e.url}>
                                <NewsItem title={e.title ? e.title : ""} description={e.description ? e.description : ""}
                                    imageUrl={e.urlToImage ? e.urlToImage : ""} newsUrl={e.url ? e.url : ""}
                                    author={e.author ? e.author : "Unknown"} date={e.publishedAt} source={e.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.props = {
    country: 'in',
    pageSize: '8',
    category: 'general',
    apiKey: 'unknown'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
}

export default News
