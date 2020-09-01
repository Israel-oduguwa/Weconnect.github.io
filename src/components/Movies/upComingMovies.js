import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

import GetUpcoming from "./getUpcoming";

 class upComingMovies extends Component {
    render() {
        const { id, original_title, poster_path, release_date  } = this.props.result
        
        return (
           <>
              <li>
              <Card className="discoverCard">
                  <GetUpcoming id={id} posterPath={poster_path} originalTitle={original_title} releaseDate={release_date} />
              </Card>
              </li>
           </>
        )
    }
}

export default upComingMovies
