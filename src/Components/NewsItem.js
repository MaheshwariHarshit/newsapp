import React from 'react'

const NewsItem = (props) => {
    return (
        <div className='my-3'>
            <div className="card">
                <div>
                    <span className=" badge rounded-pill bg-danger" style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>{props.source}</span>
                </div>
                <img src={props.imageUrl ? props.imageUrl : "https://images.thequint.com/thequint%2F2024-01%2Fa916b188-0ff6-4e48-b5b0-4dd28307e42f%2FBANGLADESH_ELECTION_2024__1_.png"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.date).toGMTString()} </small></p>
                    <a htmlFor={props.newsUrl} target='_blank' className="btn btn-sm btn-primary btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
