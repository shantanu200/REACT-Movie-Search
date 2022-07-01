import React,{useState,useEffect} from 'react'
import "./Style.css";
import axios from 'axios';

const Main = () => {
  const apiKey = "642cfaf4";
  const [movieData,setmovieData] = useState({});
  const [movie,setMovie] = useState({
    movieName: ""
  });
  const [isSerach,setIsSearch] = useState(true);

  const handleInput = (e) => {
    const {name,value} = e.target;
    setMovie({
      ...movie,
      [name] : value
    })
  }

  const handleButton = () => {
    axios.get(`http://www.omdbapi.com/?t=${movie.movieName}&apikey=${apiKey}`)
    .then((res) => {
      setIsSearch(!isSerach);
      setmovieData(res.data);
    })
  }

  return (
    <div className='container'>
        <div className="search-container">
          <input name="movieName" type="text" onChange={handleInput} placeholder='Enter movie name heree..' />
          <button onClick={handleButton}>Search</button>
        </div>
        {isSerach && (<>
        <div className='info'>
           <img src={movieData.Poster} className="poster"/>
        <div>
        <div>
          <h2>{movieData.Title}</h2>
          <div className='rating'>
            <img src="images/star-icon.svg" />
            <h4>{movieData.imdbRating}</h4>
          </div>
          <div className='details'>
            <span>
             {movieData.Rated}
            </span>
            <span>
             {movieData.Year}
            </span>
            <span>
             {movieData.Runtime}
            </span>
          </div>
          <div className='genre'>
            <div>{movieData.Genre}</div>
          </div>
        </div>
        </div>
        </div>
        <h3>Plot:</h3>
        <p>{movieData.Plot}</p>
        <h3>Cast:</h3>
        <p>{movieData.Actors}</p>
        </>
        )}
    </div>
  )
}

export default Main