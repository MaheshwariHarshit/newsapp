import './App.css';

import React, { Component, useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const pageSize = 9
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

  const updateProgress = (progress) => {
    setProgress(progress)
  }
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height='2px'
        />
        <Routes>
          <Route exact path="/business" element={<News apiKey={apiKey} updateProgress={updateProgress} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} updateProgress={updateProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/" element={<News apiKey={apiKey} updateProgress={updateProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News apiKey={apiKey} updateProgress={updateProgress} key="health" pageSize={pageSize} country="in" category="health/" />} />
          <Route exact path="/science" element={<News apiKey={apiKey} updateProgress={updateProgress} key="science" pageSize={pageSize} country="in" category="science/" />} />
          <Route exact path="/sports" element={<News apiKey={apiKey} updateProgress={updateProgress} key="sports" pageSize={pageSize} country="in" category="sports/" />} />
          <Route exact path="/technology" element={<News apiKey={apiKey} updateProgress={updateProgress} key="technology" pageSize={pageSize} country="in" category="technology/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;