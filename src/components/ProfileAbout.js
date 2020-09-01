 import React, { Component,  Fragment} from 'react'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import WebIcon from '@material-ui/icons/Web';
import CardContent from '@material-ui/core/CardContent';
import dayjs from "dayjs";
import LanguageIcon from '@material-ui/icons/Language';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PersonIcon from '@material-ui/icons/Person';
import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//MUI stuffs
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from "@material-ui/core/Typography"

import DnsIcon from '@material-ui/icons/Dns';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import BuildIcon from '@material-ui/icons/Build';
const styles = (theme) =>({
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
      },
      gridList:{
          width: 500,
            height:190,
            
      },
      eachList:{
        padding: "2px 16px 2px 0px"
      },
      Lroot:{
          padding:"0px 16px"
      },
      Licon:{
        minWidth: "35px",
      }
      
})
export class ProfileAbout extends Component {
    render() {
        const { 
            classes, 
            profile:{ fullName , birthDate, coverPhoto,  createdAt, imageUrl, website,
                location,
                otherNames,
                skills,
                sex,
                relationshipStatus,
                famousQuotes,
                languages} 
        } = this.props;
        
       
            
        return (
          <>
           <div className={classes.container}>
           <div className="AboutSection">
            <Card>
               
               <CardContent className={classes.Lroot} >        
                   <List>
                  
              {
           location && 
            <ListItem className={classes.eachList}>
            <ListItemIcon className={classes.Licon} >
            <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary={location}             
            />
          </ListItem>             
       }
         {
           sex && (
               <>
                <ListItem className={classes.eachList} >
            <ListItemIcon className={classes.Licon}>
            <PersonIcon/> 
            </ListItemIcon>
            <ListItemText>
            <span className="aboutSpan">Gender</span> {sex}
            </ListItemText>
          </ListItem>                          
               </>
           )
       }
        {
           website && (
               <Fragment>
                    <ListItem className={classes.eachList}>
            <ListItemIcon className={classes.Licon}>
            <WebIcon />
            </ListItemIcon>
            <ListItemText>
            <a href={website} target="_blank" rel="noopener noreferrer">
                       {' '}{website}
                   </a>
            </ListItemText>
          </ListItem>  
               </Fragment>
           )
       }
          {
           skills && (
               <>
                <ListItem className={classes.eachList}> 
                <ListItemIcon className={classes.Licon}>
           <BuildIcon/>
            </ListItemIcon>          
            <ListItemText>
            <span className="aboutSpan">Skills</span> {skills}
            </ListItemText>
          </ListItem> 
              
               </>
                
           )
       }            
         {
           languages && (
               <>
                <ListItem className={classes.eachList} >
            <ListItemIcon className={classes.Licon}>
            <LanguageIcon/>
            </ListItemIcon>
            <ListItemText primary={languages} />           
          </ListItem>                
               </>
                
           )
       }
       {
           otherNames && (
               <>
                   <ListItem className={classes.eachList} >
            <ListItemIcon className={classes.Licon}>
            <DnsIcon/> 
            </ListItemIcon>
            <ListItemText>
            <span className="aboutSpan">OtherNames</span> {otherNames}    
            </ListItemText>
          </ListItem>                 
               </>
           )
       }
         
       
       {
           famousQuotes && (
               <>
                <ListItem className={classes.eachList} >
            <ListItemIcon className={classes.Licon}>
            <FormatQuoteIcon/> 
            </ListItemIcon>
            <ListItemText>
            <span className="aboutSpan">Favorite Quote</span> "{famousQuotes}"
            </ListItemText>
          </ListItem>  

               </>
               
           )
       }
       
       {
           birthDate && (
            <ListItem className={classes.eachList} >
            <ListItemIcon className={classes.Licon}>
            <FormatQuoteIcon/> 
            </ListItemIcon>
            <ListItemText>
            BirthDay {birthDate}
            </ListItemText>
          </ListItem> 
               
           )
       }
       
       {
           relationshipStatus && (
            <Fragment>
                 <ListItem className={classes.eachList} >
            <ListItemIcon>
            <FavoriteIcon/>
            </ListItemIcon>
            <ListItemText primary= {relationshipStatus}/>           
          </ListItem>                            
            </Fragment>
            
        )
       }
        <ListItem className={classes.eachList}>
            <ListItemIcon className={classes.Licon}>
            <CalendarTodayIcon/>
            </ListItemIcon>
            <ListItemText>
            <span>
           Joined {dayjs(createdAt).format('MMM YYYY')}
       </span>
            </ListItemText>                           
          </ListItem>              
                       </List>          
               </CardContent>
           </Card>
           <Card>
               <CardContent>
                   
               <div className={classes.root}>
                   <Typography variant="h6"> Photos</Typography>
     <GridList cellHeight={160} className={classes.gridList} cols={3}>
         <GridListTile  cols={2 || 1}>
           <img src={coverPhoto} alt="profile" />
         </GridListTile>      
         <GridListTile  cols={1 || 1}>
           <img src={imageUrl} alt="cover" />
          
         </GridListTile> 
          
     </GridList>
     <Link to={{
  pathname: '/photos',
  state: {
    posts:this.props.timelines,
    name:fullName
  }
}}>
    <Button>More Images</Button>
</Link>
    
   </div>
               </CardContent>
               </Card>
            </div>
           </div>
            
</>
        )
    }
}

ProfileAbout.propTypes ={    
    classes:PropTypes.object.isRequired
}

export default (withStyles(styles)(ProfileAbout))
