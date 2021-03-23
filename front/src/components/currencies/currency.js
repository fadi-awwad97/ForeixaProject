import React, { useState , useEffect} from "react";
import axios from 'axios';
import MaterialTable from 'material-table';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import tableIcons from "./TableIcons.js";
import './currency.css';

export default function Currency() {
  
    const [currency,setCurrency] = useState([]);

    useEffect(async () => {
        const result = await axios(
          'http://localhost:5000/currency/getcurrencies',
        );
         
        let x=  result.data.result[0].currency.rates;
        var curr="curr"
        var val="val"
        var array=[]
        for (const key of Object.keys(x)) {          
          array.push({[curr]:key,[val]:x[key]})        
      }
       setCurrency(currency => [...currency, array]);
      },[]);


      const handleFollow =async (curr) => {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user.result[0]);
        const info = user.result[0]
        let x= {curr, info}
        axios.put('http://localhost:5000/user/followcurrency',x)
        .then(function(response) {
        })
        .catch(function(error) {
          console.log(error);
        });
      }


    return (
      <div >
       <div className="title5"></div>
       <div className="line"></div>
       <div className="circle"></div>

     <div className="table">
      <MaterialTable
      title="Foreixa Live Updates"
      columns={[
      { title: 'Currency', field: 'curr'},
      { title: 'Value', field: 'val'},
        
      ]}
      onRowClick={(event,rowData)=> console.log(rowData)}

      options={{
        selection: false,
        showSelectAllCheckbox: false,
        sorting: true,
        rowStyle: {
        backgroundColor: 'silver',
        },
        headerStyle: {
        backgroundColor: 'rgb(216, 94, 24)',
        color: '#FFF'
        }
        }}
        icons={tableIcons}
        actions={[
          {
            icon: () => <AddCircleOutlineIcon />,
            tooltip: "Follow",
            onClick: (event, rowData) => (
              handleFollow(rowData)
            
            )
          },
      ]}
        
        data={currency[0]}

      />
     </div>
        </div>
    )
}
