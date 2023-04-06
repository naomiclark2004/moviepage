import React, { useState } from "react";
var array = [];

export default function App() {
  const [list, setList] = useState([]);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');


  async function fetchQuote(event) {
    var m = event.target.value;
    var url = "https://www.omdbapi.com/?apikey=551a0e27&s=" + m;
    fetch(url)
      .then(response => response.json())
      .then(
        (data) => {
          if (data.Response === 'True') {
            setList(data.Search)
            setResponse(data.Response)
          } else {
            setResponse(data.Response)
            setError(data.Error)
            console.log(error)
          }
        }
      )
  }


  return (
    <>
      <div className="form">
        <input type="text" id="movie" name="move" onChange={fetchQuote} placeholder="Search movie and TV shows "
        />
      </div>
      <div className="container">
        <Body list={list} response={response} error={error}></Body>
      </div>
    </>

  )
}

function Body({ list }) {
  function fav(e) {
    var name = e.target.parentElement.id
    array.push(name)
    // don't allow repeats
    var arr = [...new Set(array)];

    console.log(arr);
  }

  return <>
    {list.map((movie, index) => {
      return (
        <div className="box" key={index} id={movie.Title}>
          <img src={movie.Poster} alt=" Not Found" ></img>
          <h1>{movie.Title}</h1>
          <p>{movie.Year}</p>
          <button id="heart" onClick={fav}>&#x2665;</button>
        </div>
      )
    })}
  </>
}