import React, { Component } from 'react';
import Card from "../components/Cards/VeiwCards";
import Charts from "../components/Chart/VeiwCharts";
import CountryChoose from "../components/Country/VeiwCountryChoose";
import { Helmet } from "react-helmet";

// import the Covid api by calling the firstData
import {fetchData} from "../Covid19Api/index";



export class Covid19 extends Component {
    constructor(){
        super()
        this.state={
            covidData:[],
            country:'',
        }
    }
  async componentDidMount(){
        const data = await fetchData();
       
        this.setState({
            covidData:data
        })
        window.scrollTo(0, 0);
    }

    handleCountryChange = async (country) =>{
        const fetchedData = await fetchData(country);
       this.setState({
           covidData:fetchedData,
           country:country
       })
    }
    render() {
        const {covidData , country}=this.state;
        const covidImage =`https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/download.png?alt=media&token=6358fefc-cb98-4834-8666-16d122c28998`
        return (
           <>  
              <Helmet>
     <title> WeConnect - Covid19 Data</title>
   </Helmet>
              <div className="home-page">          
        {
            covidData ?
            <div className="covid-page">
            <h4>C<img src={covidImage} alt="covid"/>vid 19 </h4>
        <Card cardData={covidData}/>
         
          <CountryChoose handleCountryChange={this.handleCountryChange} />
          <Charts data={covidData} country={country} />
          
          </div>
           :
         <p></p>
        }
        </div>
            
           
           </>
        )
    }
}

export default Covid19
