// Import axios
import axios from "axios";
//define url
const url ="https://cors-anywhere.herokuapp.com/https://covid19.mathdro.id/api";
// fetch function
export const fetchData = async (country)=>{
    let changeableUrl = url;
  
    if(country){
        changeableUrl =`${url}/countries/${country}`
    }
    //Try catch method
    try {
        //define response and destructuring data to the ones I need
        const {data:{
            confirmed,
            deaths,
            recovered,
            lastUpdate
        }} = await axios.get(changeableUrl);
        const destructedData = {
            confirmed ,
            deaths,
            recovered,
            lastUpdate
        };
        //return response
       return destructedData;
    } catch (error) {
        //error
    }
}
export const historyData = async ()=>{
  
    try {
        const {data} = await axios.get(`${url}/daily`);

      const modData = data.map((dailyData)=>({
          confirmed:dailyData.confirmed.total,
          deaths:dailyData.deaths.total,
          date:dailyData.reportDate,
      }));
      return modData
    } catch (error) {
       console.log(error)
    }
}
export  const fetchCountries = async ()=>{
    try {
        const {data:{ countries}} = await axios.get(`${url}/countries`);
       return countries.map((country)=> country.name)
    } catch (error) {
        console.log(error)
    }
}
export const fetchHead  = async ()=>{
    try {
        const headData = await axios.get(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=eRWBEJBGxsRRzqkIX7LsnneGyihm6UIy`);
        return headData
    } catch (error) {
        console.log(error)
    }
}