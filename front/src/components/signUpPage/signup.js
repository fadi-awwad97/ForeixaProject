import React, { useState, useContext  } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import {facebookProvider} from "../../config/authMethods";
import {githubProvider} from "../../config/authMethods";
import {googleProvider} from "../../config/authMethods";
import socialMediaAuth from '../../service/auth';



export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setFullname] = useState("");
  const [photo, setPhoto] = useState(".");
  const [currenciesFollowing, setCurrenciesFollowing] = useState(['empty']);
  const [currenciesAdded, setCurrenciesAdded] = useState(['empty']);
  const [subscriptionType, setSubscriptionType] = useState("premium");


  const history = useHistory();

  function validateForm() {
    return email.length > 0 && name.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signupUser = { email, name,photo,currenciesFollowing,currenciesAdded,subscriptionType };
      const signupRes = await Axios.post(
        "http://localhost:5000/user/insertUser",
        signupUser
      );
      history.push("/login");
    } catch (err) {
      console.log(err)
    }
  };

  const handleOnclick = async (provider) =>{
    const res = await socialMediaAuth(provider);

  
    try {
        setEmail(res.email)
        setFullname(res.displayName)
        setPhoto(res.photoURL)
        const signupUser = { email, name,photo,currenciesFollowing,currenciesAdded,subscriptionType };
        console.log(signupUser)
        const signupRes = await Axios.post(
          "http://localhost:5000/user/insertUser",
          signupUser
        );

      } catch (err) {
        console.log(err)
      }
    
}
    

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>

        <Form.Group className="formGroup" size="lg" controlId="name">
          <Form.Label>NickName</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Group>

        <br></br>

        <Form.Group className="formGroup" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br></br>
 
        <Button className="formBut" block size="lg" type="submit" disabled={!validateForm()}>
          Sign Up
        </Button>
      </Form>
      <div style={{marginTop:"2px", marginLeft:"45%"}}>
        <h5> Or Continue Using </h5>
        </div>
        <div style={{marginTop:"2px", marginLeft:"43%"}}>
                
                <button onClick={()=> handleOnclick(facebookProvider)}>facebook</button>
                <button onClick={()=> handleOnclick(githubProvider)}>github</button>
                <button onClick={()=> handleOnclick(googleProvider)}>Google</button>
        </div>

    </div>
  );
}