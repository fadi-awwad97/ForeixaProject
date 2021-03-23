import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import "./home.css"

export default function home() {

    const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: "1 EURO"
        },
        yAxis: {
          type: 'linear',
      },
     
      
      xAxis: {
          categories: [10,20,30,40,50]
      },
        series: [
          {
            name: 'LBP',
            data: [1825, 1829, 1850, 1820, 1730, 1780, 1820, 1910]
        }, {
            name: 'AMD',
            data: [629.456756, 622.234234, 610.344563, 604.342342, 629.124534, 629.543445, 640.494476, 629.453224]
        },
        {
            name: 'AFN',
            data: [4.456756, 5.42344, 6.34534, 3.45645, 5.5635, 7.54656, 2.345534, 4.23425]
        },
        {
            name: 'AED',
            data: [92.456756, 93.234234, 91.344563, 90.342342, 94.124534, 91.543445, 93.494476, 93.453224]
        }
          
        ]
      };





    return (
<div className="main">

    <div className="container">

          <div className="box-1">            
            <h1>All your Currencies, in one place.</h1>
            <p>Exchange rate is the value of one currency for the purpose of conversion to another.</p>
            <p>It is also regarded as the value of one country's</p>
            <p>currency in relation to another currency.</p>
            <p>Track Raes and Values</p>
          </div>
          <div className="box-2">
            <h1>Choose Your Type Of Subscription</h1>
          </div>
          <div style={{color:"black",marginLeft:"46%",backgroundColor:"rgba(216, 94, 24)",width:"75px"}}>Subscribe</div>
        </div>
        <div >
        <HighchartsReact highcharts={Highcharts} options={options} />
        </div>

</div>
    )
}
