import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./toolbar.css"
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
  },
  title: {
    flexGrow: 1,
  },
  pricing: {
      marginRight:"25%"
  }
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{backgroundColor: "gray" ,boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", height:"87px"}}>
        <Toolbar >

          <Button onClick={(e)=>{history.push('/')}} variant="contained" className={classes.title}>
            Foreixa            
          </Button>

          <Button color="inherit" onClick={(e)=>{history.push('/user')}}>My Account</Button>
          
          <Typography variant="h6" className="trapezoid">
          <Button onClick={(e)=>{history.push('/currencies')}} color="inherit">Pricing</Button>
          </Typography>

        <Typography style={{marginRight:"5%"}}>
          <Button  onClick={(e)=>{history.push('/login')}}color="inherit">Sign In</Button>
          <Button onClick={(e)=>{history.push('/signup')}} color="inherit">Sign Up</Button>
          <Button color="inherit">Contact Us</Button>
          <Button color="inherit">About Us</Button>
        </Typography>

        </Toolbar>

      </AppBar>
     
    </div>
  );
}