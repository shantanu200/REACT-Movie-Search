import React, { useState, useEffect } from "react";
import "./Style.css";
import axios from "axios";

const Main = () => {
  const apiKey = "642cfaf4";
  const [movieData, setmovieData] = useState({});
  const [movie, setMovie] = useState("");

  async function getData() {
    await axios
      .get(`http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
      .then((res) => {
        setmovieData(res.data);
      });
  }

  const handleButton = () => {
    getData();
  }

  useEffect(() => {
    getData();
  }, [movie]);

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter movie name heree.."
        />
        <button onClick={handleButton}>Search</button>
      </div>
      {movieData?.Title && (
        <>
          <div className="info">
            <img src={movieData?.Poster} className="poster" alt="" />
            <div>
              <div>
                <h2>{movieData.Title}</h2>
                <div className="rating">
                  <img src="images/star-icon.svg" alt="" />
                  <h4>{movieData?.imdbRating}</h4>
                </div>
                <div className="details">
                  <span>{movieData?.Rated}</span>
                  <span>{movieData?.Year}</span>
                  <span>{movieData?.Runtime}</span>
                </div>
                <div className="genre">
                  <div>{movieData?.Genre}</div>
                </div>
              </div>
            </div>
          </div>
          <h3>Plot:</h3>
          <p>{movieData?.Plot}</p>
          <h3>Cast:</h3>
          <p>{movieData?.Actors}</p>
        </>
      )}
    </div>
  );
};

export default Main;
