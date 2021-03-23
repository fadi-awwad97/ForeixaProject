
import React, { useState,useEffect } from "react";
import axios from "axios";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './user.css';


function App() {
  const [info, setInfo] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [name , setName]=useState("");
  const [img , setImage]=useState("");
  const [currFollowing , setCurrFollowing]=useState([]);
  const [value , setValue]=useState([]);
  const [showHide, setShowHide] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = React.useState(false);
 

  useEffect( () => {

    var user = JSON.parse(localStorage.getItem('user'));
    let info1=user.result[0]
    setInfo(info1)
    setName(user.result[0].name)
    handleConfig();
    console.log("hello2")
    askForPermissioToReceiveNotifications();
  }, [])

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name); 
  };



  const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('user token: ', token);
      // return token;

      messaging.onMessage(function(payload){
        console.log('onMessage ', payload)                         
        console.log(JSON.parse(payload.notification.body));
        handleClick();
      })

      var user = JSON.parse(localStorage.getItem('user'));
      let info1=user.result[0]
      const res = await axios.post(
        "http://localhost:5000/user/notification",
       {token: token, user:info1}
      );
    }
    catch (error) {
      console.error(error);
    }
  }


  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("user", JSON.stringify(info));
    
    try {
      const res = await axios.put(
        "http://localhost:5000/user/upload",
        formData,
      );
      handleConfig();
    } catch (ex) {
      console.log(ex);
    }
  };

const  handleConfig= async() => {

  var user = JSON.parse(localStorage.getItem('user'));   
  let key = user.result[0]._key
 
 const result = await axios.post(
   "http://localhost:5000/user/getuser",{_key:key} );
  if (result.data.result[0].photo =='.'){
    setImage("avatar.png")
  }
  else {
    setImage(result.data.result[0].photo) 
  }
  setCurrFollowing(currFollowing => [...currFollowing,result.data.result[0].CurrenciesFollowing ] )
   }

 const handleGetCurrencies =async () => {
  const result = await axios.get(
    "http://localhost:5000/currency/getUserCurrencies", );

    setValue([]);
    currFollowing[0].forEach(item => {
      if(item in result.data){
        setValue(value => [...value,result.data[item]])
      }
    });
 }


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  function handleModalShowHide() {
    setShowHide(!showHide)
 }

 const handleUnfollow =async(e) => {
  let currencyDel=e.target.innerText
  let deleteData={currencyDel,info}
  const result = await axios.post(
    "http://localhost:5000/user/deleteCurrency",deleteData );
    if(result){
      setCurrFollowing([]);
      setCurrFollowing(currFollowing => [...currFollowing,result.data[0].CurrenciesFollowing ] )
    
    }
    
 }

  return (
      <div className="cont" >
      <img className="avatar"  src={`http://localhost:5000/images/${img}`}/>
      <div style={{marginTop:"1%" ,marginLeft:"41%",width:"250px",textAlign:"center",color:"whitesmoke"}}>
      <h3 > {name}</h3>      
      </div>

      <div className="head">
        FOREIXA 
        </div>

      <div className="title">
      <h3>Currencies Followed</h3>
      </div>
      <div className="pin2"></div>

      <div className="changePhoto">
      <Fab color="primary" size="small" component="span" aria-label="add"  onClick={handleModalShowHide}>
      <AddIcon />
        </Fab>
      </div>
    <div className="lists">
      <div className="list">
        {currFollowing.length > 0 ?       
        currFollowing[0].map((item,i)=>{
          return <List style={{alignItems:"center"}} key={i}  component="nav">
                  <ListItem key={i} button onClick={handleUnfollow}><ListItemText style={{textAlign:"center",borderBottom:" 1px solid black"}}>{item}</ListItemText> </ListItem>
                 </List>
                }):null }
      </div>
      
      <div style={{backgroundColor:"transparent",boxShadow:"none"}} className="list">
      {value.length > 0 ?       
        value.map((item,i)=>{
          return <List key={i}  component="nav">
                  <ListItem  key={i} className="lines"></ListItem>
                 </List>
                }):null }
      </div>

      <div className="list">
        {value.length > 0 ?       
        value.map((item,i)=>{
          return <List key={i}  component="nav">
                  <ListItem key={i} button>
                    <ListItemText style={{textAlign:"center",borderBottom:" 1px solid black"}}>{item}</ListItemText>
                    </ListItem>
                 </List>
                }):null }
      </div>
    </div>

      <Button variant="contained"  className="butt" onClick={handleGetCurrencies}>check</Button>
      <div className="pin">
      
      </div>
      <div className="title2"> EURO</div>
      <Modal show={showHide}>
                    <Modal.Header closeButton onClick={handleModalShowHide}>
                    <Modal.Title>Set Profile Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>                      
                      <Input   
                        type="file"
                        onChange={saveFile}>

                        Change Your Profile
                        </Input >
                        <Button variant="contained" color="primary" onClick={uploadFile}>
                        Submit
                        </Button> 
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="contained" onClick={handleModalShowHide}>
                        Close
                    </Button>
                    </Modal.Footer>
         </Modal>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="CHECK YOUR CURRENCIES"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              Close
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}


export default App;