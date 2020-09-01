import React, { Component } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import axios from "axios";


export class RightBar extends Component {
    state={
        chuckNorris:null,
        jokes:null,
     
    }
componentDidMount(){
    axios.get(`https://api.chucknorris.io/jokes/random?category=money`)
    .then((res) =>{
        this.setState({
            chuckNorris:res.data
        })
    })
    .catch((err) =>{
        console.log(err)
    });

  

    axios.get(`https://sv443.net/jokeapi/v2/joke/Any?amount=6`)
    .then((res) =>{
        
        this.setState({
            jokes:res.data.jokes
        })
    })
    .catch((err) =>{
        console.log(err)
    })
}
    render() {
        let jokesMarkup = this.state.jokes !== null && this.state.chuckNorris !==null ? (
            this.state.jokes.map((joke) =>{
                const { type } = joke
                return(
                    <ListItem key={joke.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="chuck norris" src={this.state.chuckNorris.icon_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={joke.category}
                      secondary={
                       type === "twopart" ?
                       <>
                       <Typography
                         component="span"
                         variant="body2"
                        
                         color="textPrimary"
                       >
                      Ques: {joke.setup}
                       </Typography>
                       <Typography
                         component="span"
                         variant="body2"
                        
                         color="textPrimary"
                       >
                      Ans: {joke.delivery}
                       </Typography>
                      
                     </>:
                      <>
                      <Typography
                        component="span"
                        variant="body2"
                       
                        color="textPrimary"
                      >
                      {joke.joke} 
                      </Typography>
                      
                    </>
                      }
                    />
                  </ListItem>
                )
            })
        ):( <p></p> )
        return (
            <div className="rightBar" >
                <List>
                    {
                        this.state.chuckNorris !== null ?
                        <>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="chuck norris" src={this.state.chuckNorris.icon_url} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={this.state.chuckNorris.categories}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                               
                                color="textPrimary"
                              >
                               Chuck Norris 
                              </Typography>
                              — "{this.state.chuckNorris.value}"
                            </>
                          }
                        />
                      </ListItem>
                     
                      </>:
                     <ListItem alignItems="flex-start">
                     <ListItemAvatar>
                     <Skeleton animation="wave" variant="circle"  />
                     </ListItemAvatar>
                     <ListItemText>
                     <Skeleton  variant="rect" width="70%" />
                     </ListItemText>
           
                   </ListItem>
                    }     
                     <Divider  component="li" />                                       
                     {
                         this.state.jokes ?
                         <>
                         <Typography variant="h5" style={{marginTop:"5px" }}>Jokes to Crack you Up</Typography>
                         <List>
                         {jokesMarkup}
                         </List>
                         </>:
                        <>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Skeleton animation="wave" variant="circle"  />
                        </ListItemAvatar>
                        <ListItemText>
                        <Skeleton  variant="rect" width="70%" />
                        </ListItemText>
                      </ListItem>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Skeleton animation="wave" variant="circle"  />
                        </ListItemAvatar>
                        <ListItemText>
                        <Skeleton  variant="rect" width="70%" />
                        </ListItemText>
                      </ListItem>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Skeleton animation="wave" variant="circle"  />
                        </ListItemAvatar>
                        <ListItemText>
                        <Skeleton  variant="rect" width="70%" />
                        </ListItemText>
                      </ListItem>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Skeleton animation="wave" variant="circle"  />
                        </ListItemAvatar>
                        <ListItemText>
                        <Skeleton  variant="rect" width="70%" />
                        </ListItemText>
                      </ListItem>
              </>
                    
                     }
                     
                </List>
            </div>
        )
    }
}

export default RightBar
