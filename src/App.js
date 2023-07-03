import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Switch,Route, Link, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


import React, { Component } from 'react'

export class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>

      <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      
      />
          <Routes>
          <Route path="/" element={<News setProgress = {this.setProgress}  key="general" pageSize={15} category='general'/>}/>
          <Route path="/general" element={<News setProgress = {this.setProgress}  key="general" pageSize={15} category='general'/>}/>
          <Route path="/business" element={<News setProgress = {this.setProgress}  key="business"pageSize={15} category='business'/>}/>
          <Route path="/entertainment" element={<News setProgress = {this.setProgress}  key="entertainment"pageSize={15} category='entertainment'/>}/>
          <Route path="/health" element={<News setProgress = {this.setProgress}  key="health"pageSize={15} category='health'/>}/>
          <Route path="/science" element={<News setProgress = {this.setProgress}  key="science"pageSize={15} category='science'/>}/>
          <Route path="/technology" element={<News setProgress = {this.setProgress}  key="technology"pageSize={15} category='technology'/>}/>
          <Route path="/sports" element={<News setProgress = {this.setProgress}  key="sports"pageSize={6} category='sports'/>}/>
            </Routes>
      </BrowserRouter>
      </>
    )
  }
}

export default App


