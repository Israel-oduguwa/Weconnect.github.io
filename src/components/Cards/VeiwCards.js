import React from 'react'
import styles from "./Cards.module.css";
import {Card, CardContent, Typography , Grid} from "@material-ui/core";
import Countup from "react-countup";
import cx from "classnames";



export default function Cards(props) {
   
    if(!props.cardData.confirmed){
        console.log(props)
        return(
           <p>Loding...</p>
        )
    }
    const pan = props.cardData;
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card}  xs={12} md={3} className={cx(styles.card,styles.infected)} >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5" > <Countup
                             start={0}
                             end={pan.confirmed.value}
                             duration={15}
                             separator=","
                             /></Typography>  
                        <Typography color="textSecondary">{new Date(pan.lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2" >Number of active cases of COVID-19</Typography>  
                          </CardContent>
                </Grid>
                <Grid item component={Card}  xs={12} md={3} className={cx(styles.card,styles.recovered)} >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                           Recovered
                        </Typography>
                        <Typography variant="h5" >
                        <Countup
                             start={0}
                             end={pan.recovered.value}
                             duration={15}
                             separator=","
                             />
                            </Typography>  
                        <Typography color="textSecondary">{new Date(pan.lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2" >Number of recovered cases of COVID-19</Typography>  
                          </CardContent>
                </Grid>
                <Grid item component={Card} className={cx(styles.card,styles.deaths)}  xs={12} md={3} >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                           Deaths
                        </Typography>
                        <Typography style={{color:"red"}} variant="h5" >
                        <Countup 
                             start={0}
                             end={pan.deaths.value}
                             duration={15}
                             separator=","
                             />
                            </Typography>  
                        <Typography color="textSecondary">{new Date(pan.lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2" >Number of deaths caused by COVID-19</Typography>  
                          </CardContent>
                         
                </Grid>
            </Grid>
        
        </div>
    )
}
