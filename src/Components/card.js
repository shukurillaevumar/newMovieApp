import { useState } from "react";

function Card (props) {
    const [showFullText, setShowFullText] = useState(false);

    function shortenText(text, maxLength) {
        if (text.length <= maxLength) {
          return text;
        } else {
          return text.substring(0, maxLength) + '...';
        }
      }

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };
    return (
        <div className='card'>
                <img className="resultImg" src={`https://image.tmdb.org/t/p/w500${props.poster_path}`} alt='img' />
                <div className='groupElement'>
                  <span className="movieLang">The movie original language: {props.original_language}</span>
                  <span className='filmName'>The movie name: {props.original_title}</span>
                  {<span className='bannerMovieRelease'>The movie release date: {props.release_date}</span>}
                  {<span className='bannerMovieRating'>The average vote: {props.vote_average}</span>}
                  <span className='filmOverview'>The movie overview: {showFullText ? props.overview : shortenText(props.overview, 50)}</span>
                </div>

                {props.overview.length > 50 && (
                    <button className="btnShow" onClick={toggleShowFullText}>
                      {showFullText ? 'Show less' : 'Show more'}
                    </button>
                )}
        </div>
    )
}

export default Card;