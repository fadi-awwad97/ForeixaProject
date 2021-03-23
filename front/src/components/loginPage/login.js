import React, { useState, useContext  } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";




export default function Login() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");



  const history = useHistory();

  function validateForm() {
    // return email.length > 0 && fullname.length > 0;
    return fullname.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { fullname };
      const loginRes = await Axios.post(
        "http://localhost:5000/user/login",
        loginUser
      );
      
      if(loginRes.data.message == "true" ) { 
        
        // console.log(loginRes.data)

    localStorage.setItem('user', JSON.stringify(loginRes.data)); 
    history.push("/user");
      }
      else {
        alert("Wrong User")
      }
    } catch (err) {
      console.log(err);
    }
  };
    

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>

        <Form.Group className="formGroup" size="lg" controlId="name">
          <Form.Label>User</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Group>

        <br></br>
{/* 
        <Form.Group className="formGroup" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group> */}
        <br></br>
 
        <Button className="formBut" block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}


