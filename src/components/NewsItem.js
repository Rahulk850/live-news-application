import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , description,imageUrl, newsUrl,author,date,source}=this.props;
    return (
      <div className='my-3'>
      <span class="badge bg-danger">{source}</span>

            <div className="card" >
          <img src={!imageUrl?"https://techcrunch.com/wp-content/uploads/2020/09/snap-glitch1.jpg?w=712":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted"> By {!author?"unknown":author} on {new Date(date).toDateString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem