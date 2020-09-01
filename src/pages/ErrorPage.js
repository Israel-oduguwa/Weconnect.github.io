import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

import { Helmet } from "react-helmet";


export class ErrorPage extends Component {
    render() {
        return (
            <Grid container className="errorPage">
                  <Helmet>
     <title>404 Error</title>
  
   </Helmet>
            <Grid item xs></Grid>
            <Grid item xs={8}>
            <Helmet>
       <title>Error 404</title>
     </Helmet>
             
            </Grid>
            <Grid item xs></Grid>
          </Grid>

        )
    }
}

export default ErrorPage

