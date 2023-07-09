import './App.css';
import createriderimage from './createriderimage.jpg';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Create() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [position, setPosition] = useState("");
  const [nric, setNRIC] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  
  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/riders", {
        email,
        name,
        id,
        position,
        nric,
        status,
      });
  
      // If the submission is successful and the response is received,
      // navigate to the home page
      if (response.status === 200) {
        navigate("/"); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  

  return (
    <div className="create-rider">
         <h1 className='rider-details-heading'>Add New <span style={{color:'red'}}>Rider</span></h1>

         <div className="container">
           <div className="contact-box">
           <div className="left">
              <img src={createriderimage} className="rider-image" alt="Rider_Image" />
           </div>
           <div className="right">
              <input type="text" className="field" placeholder="ID Number" onChange={(e) => {
                setID(e.target.value);
              }}/>
              <input type="text" className="field" placeholder="Your Name" onChange={(e) => {
                setName(e.target.value);
              }}/>
              <input type="text" className="field" placeholder="Your Email" onChange={(e) => {
                setEmail(e.target.value);
              }}/>
               <input type="text" className="field" placeholder="Position" onChange={(e) => {
                setPosition(e.target.value);
              }}/>
               <input type="text" className="field" placeholder="NRIC" onChange={(e) => {
                setNRIC(e.target.value);
              }}/>
               <input type="text" className="field" placeholder="Status" onChange={(e) => {
                setStatus(e.target.value);
              }}/>
              {/* <input type="text" className="field" placeholder="Phone"/>
              <textarea placeholder="Message" className="field"></textarea> */}
              <button className="send-btn" onClick={submit}>Send</button>
           </div>
           </div>
         </div>

   
    </div>
  );
}

export default Create;
