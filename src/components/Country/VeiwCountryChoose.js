import React, {useState, useEffect}from 'react';
import {FormControl} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import {fetchCountries} from "../../Covid19Api/index";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from "./CountryChoose.module.css";

export default function CountryChoose({handleCountryChange}) {
    const [fetchedCountries, setFetchedCountries]= useState([]);

    useEffect(()=>{
        const fetchApi = async () =>{
            setFetchedCountries(await fetchCountries());
        }

        fetchApi();
      
    },
   [setFetchedCountries]
    )
   
    return (
        <>
       {
           fetchedCountries ?
           <FormControl className={styles.formControl}>
           <InputLabel id="Gobal">Gobal</InputLabel>
           <Select defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)}>
               
               {fetchedCountries.map((country,i) => 
               <MenuItem key={i} value={country}>{country}</MenuItem>)}
           </Select>
       </FormControl>:
       <p></p>
       }
</>
    )
}

