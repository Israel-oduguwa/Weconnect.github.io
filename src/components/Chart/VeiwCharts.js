import React, {useState, useEffect} from 'react';
import {historyData} from "../../Covid19Api/index";
import { Bar, Line} from "react-chartjs-2";
import styles from ".//Chart.module.css";
import Countup from "react-countup";
import cx from "classnames";


export default function Charts({data:{confirmed,recovered,deaths} , country}) {
    const [dailyData, setDailyData] = useState([]);
    useEffect( () =>{
        const fetchApi = async () => { 

             setDailyData(await historyData());
        }
        
        fetchApi();
    },[]);

    const lineChart =(
        dailyData
        ?
        <Line
        data={{
            labels:dailyData.map(({date})=> date),
            datasets:[{
                data:dailyData.map(({confirmed})=> confirmed),
                label:"Infected",
                borderColor:"blue",
                fill:true,
            },{

              data:  dailyData.map(({deaths}) => deaths),
                label:"Deaths",
                borderColor:"red",
                backgroundColor:"rgba(255,0,0,0.5)",
                fill:true,

            }],
        }}
        />:null
    );

    const barChart = (
        confirmed
        ?
        (
            <Bar
                    data={{
                        labels:["Infected","Recovered","Deaths"],
                        datasets:[{
                            label:"People",
                            backgroundColor:[
                                'rgba(0,0,255,0.5)',
                                'rgba(0,255,0,0.5)',
                                'rgba(255,0,0,0.5)',
                            ],
                            data:[confirmed.value,recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend:{display:false},
                        title:{
                            display:true,
                            text:`Current state in ${country}`
                        },
                    }}
            />
        ):
        null
    )
    return (
        <div className={styles.container}>
          {country ?
         <div>
             { barChart}
             <ul className={cx(styles.rate)}>
                 <li className={cx(styles.recovered)}>
                   {country} Recovery Rate: <Countup 
                             start={0}
                             end={Math.floor((recovered.value/confirmed.value)*100)}
                             duration={8}
                             separator="."
                             />%
                 </li>
                 <li className={cx(styles.deathRate)}>
                  {country} Fatality Rate: <Countup 
                             start={0}
                             end={Math.floor((deaths.value/confirmed.value)*100)}
                             duration={3}
                             separator="."
                             />%
                 </li>
             </ul>
         </div>
          
          
          :  lineChart}
        </div>
    )
}
