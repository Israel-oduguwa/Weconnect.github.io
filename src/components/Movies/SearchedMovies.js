import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import GetSearchedMovies from "./getSearchedMovies";
export class SearchedMovies extends Component {
    render() {
        const { id, original_title, popularity, poster_path, release_date  } = this.props.result
        return (
          <div className="col-md-4">
               <Card className="searchMovieCard">
               <GetSearchedMovies id={id} popularity={popularity} posterPath={poster_path} originalTitle={original_title} releaseDate={release_date} />
           </Card>
          </div>
        )
    }
}

export default SearchedMovies
