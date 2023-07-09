import './App.css';
import updateriderimage from './update_rider.jpg';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateRider() {
  const { id } = useParams();

  const [riderData, setRiderData] = useState({
    name: "",
    email: "",
    id: "",
    position: "",
    status: "",
    nric: ""
  });

  useEffect(() => {
    fetchRiderData();
  }, []);

  async function fetchRiderData() {
    try {
      const response = await axios.get(`http://localhost:5000/riders/${id}`);
      setRiderData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (event) => {
    setRiderData({ ...riderData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/riders/${id}`,
        riderData
      );

      if (response.status === 200) {
        alert("Rider updated successfully");
        window.location.href = "/"; // Redirect to home page after successful update
      } else {
        alert("Failed to update rider");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the rider");
    }
  };

  return (
    <div className="RiderApp">
      <h1 className="update-heading">
        Update <span style={{ color: "red" }}>Rider</span> Details
      </h1>
      <div className="container">
        <div className="contact-box">
          <div className="left">
            <img
              src={updateriderimage}
              className="rider-image"
              alt="Rider_Image"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="field"
                placeholder="ID Number"
                name="id"
                value={riderData.id}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="field"
                placeholder="Your Name"
                name="name"
                value={riderData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="field"
                placeholder="Your Email"
                name="email"
                value={riderData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="field"
                placeholder="Position"
                name="position"
                value={riderData.position}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="field"
                placeholder="NRIC"
                name="nric"
                value={riderData.nric}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="field"
                placeholder="Status"
                name="status"
                value={riderData.status}
                onChange={handleInputChange}
              />
              <button type="submit" className="send-btn">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRider;
