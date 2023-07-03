import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import {PropTypes} from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps={
    country:"in",
    pageSize:9,
    category:"general",
    }

   static propTypes={
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string,
  }
  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults:0,
      
    };
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83e9f8c91e334edfa70c3390adaeaadf&page=${this.state.page}&pagesize=${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ 
     
      articles: parsedData.articles ,
      totalResults:parsedData.totalResults,
      loading:false,
    });
    this.props.setProgress(100);
  
  }
  async componentDidMount() {
    this.updateNews();
    // console.log("component did mount");
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83e9f8c91e334edfa70c3390adaeaadf&page=1&pagesize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ 
    //   articles: parsedData.articles ,
    //   loading:false,
    //   totalResults:parsedData.totalResults
    // });
  }
  // handlePrevClick= async()=>{
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  //   console.log('Previous');
  //   let url =
  //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83e9f8c91e334edfa70c3390adaeaadf&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // this.setState({ 
  //   page:this.state.page-1,
  //   articles: parsedData.articles ,
  //   loading:false
  // });
  // }
  // handleNextClick= async()=>{
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
    // console.log('Next');
    // let url =
    // `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83e9f8c91e334edfa70c3390adaeaadf&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // if(!this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
    //   console.log("no any next page");
    // }else
    // {
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);
    //   this.setState({ 
    //     page:this.state.page+1,
    //     articles: parsedData.articles ,
    //     loading:false
    //   });
    // }
  // }

    fetchMoreData = async() => {
       this.setState({
        page:this.state.page + 1
      });
      console.log(this.state.page);
      const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=83e9f8c91e334edfa70c3390adaeaadf&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
       this.setState({loading:true});
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
     this.setState({ 
      //  page:this.state.page+1,
       articles: this.state.articles.concat(parsedData.articles),
       totalResults:parsedData.totalResults,
       loading:false
     });
      
    }
  render() {
    // console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">
        News Monkey - Top Headlines
        </h1>
       { this.state.loading && <Spinner/> }

       {/* infinite scroll */}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
       
      <div className="container">
        <div className="row">
          {/*!this.state.loading && */this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url} >
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : " "
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>

        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
      </div>
    );
  }
}

export default News;
