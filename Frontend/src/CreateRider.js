import './App.css';
import createriderimage from './createriderimage.jpg';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Create() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [position, setPosition] = useState("");
  const [nric, setNRIC] = useState("");
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");
  const [public_id, setPublic_id] = useState("");

  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.url;
      setUrl(imageUrl)
      // Use the imageUrl as needed (e.g., save it in the backend)
      console.log("Image uploaded:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  async function submit(e) {
    e.preventDefault();
    try {
      handleFileUpload()
      console.log(url)
      const response = await axios.post("http://localhost:5000/riders", {
        email,
        name,
        id,
        position,
        nric,
        status,
        url,
      });
  
      // If the submission is successful and the response is received,
      // navigate to the home page
      // if (response.status === 201) {
      //   navigate("/"); 
      // }
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
              <div>
               <input type="file" onChange={handleFileChange} />
               {/* <button className="new-rider-button" onClick={handleFileUpload}>
                  Upload
               </button> */}
              </div>
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
