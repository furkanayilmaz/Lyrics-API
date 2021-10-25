import { getLyrics, getSong } from 'genius-lyrics-api'
import React, { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState({})
  const [displayData, setDisplayData] = useState(false) 

  const options = {
    apiKey: 'CAEfkyg1aLkW-jFuwR4I7dUxdnaYHLLAP_IZ7iUjHYPj0EqNflpVGBBza38ilq-4', // Genius Developer Access Token
    title: `${query}`,
    artist: `${query}`,
    optimizeQuery: true, // Setting this to true will optimize the query for the best results
    authHeader: false // Wheter to include auth header in the search request. 'false' by default. 
  };

  const search = evt => {
    if (evt.key === "Enter") {
      getLyrics(options).then((lyrics) => console.log(lyrics));
      console.log(data)
      
      getSong(options).then((song) => {
        if(!song || song == null || song === null){
          alert("No Song Found!")
          setQuery('')
        } else if(song){
          console.log(`
        ${song.id}
        ${song.title}
        ${song.url}
        ${song.albumArt}
        ${song.lyrics}`)
        
        }
        setData(song)
        console.log(data)

        if(data == null || !data || data === null){
          setDisplayData(false)
        } else if(data || data !== null){
          setDisplayData(true)
        }
        setQuery('')
      })
    }
  }

  return (
    <div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onKeyPress={search}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="cover-img">
          {
            displayData ? 
            <img src={data.albumArt} alt="cover-img" width="250" height="250"/>

            :  

            <h1></h1>
          }
        </div>
        <br></br>

        <div className="song-name">
          {
            displayData ? 
            <h3 styles={{color: 'white'}}>Song Name: {data.title}</h3>

            : 
            <h1></h1>
          }
        </div>

        <br></br>

        <div className="song-id">
          {
            displayData ? 
            <p> Song ID: {data.id}</p>

            : 
            <h1></h1>
          }
        </div>
        <br></br>

        <div className="song-url">
          {
            displayData ? 
            <a href={data.url}>{data.url}</a>

            : 
            <h1></h1>
          }
        </div>

        <br></br>

        <div className="song-lycrics">
          {
            displayData ? 
            <p>{data.lyrics}</p>

            : 
            <h1></h1>
          }
        </div>
      </main>
    </div>
  )
}

export default App;
