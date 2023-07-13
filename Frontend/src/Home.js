import riderimage from './BikeRider.jpg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [riders, setRiders] = useState([]);
  const [filter, setFilter] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    fetchRiders();
  }, []);

  useEffect(() => {
    filterRiders();
  }, [filter]);

  async function fetchRiders() {
    try {
      const response = await axios.get("http://localhost:5000/allriders");
      const data = response.data.data;
      setRiders(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/riders/${id}`);
      setRiders((prevRiders) => prevRiders.filter((rider) => rider._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function filterRiders() {
    try {
      const response = await axios.get("http://localhost:5000/allriders", {
        params: filter,
      });
      const data = response.data.data;
      setRiders(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };
 console.log(riders)
  return (
    <div className="RiderApp">
      {/* Landing page cover image */}
      <img src={riderimage} className="rider-image" alt="Rider_Image" />

      {/* Rider details section */}
      <div>
        <h1 className="rider-details-heading">
          <span style={{ color: "red" }}>Riders</span> Details
        </h1>

        {/* Filter form */}
        <div className="filter-container">
          <form className="filter-form">
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={filter.id}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filter.name}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={filter.email}
              onChange={handleFilterChange}
            />
            <button type="submit" className="filter-button" onClick={filterRiders}>
              Search
            </button>
          </form>
        </div>
     
        <div className="rider-gallery">
          {riders.map((rider) => (
            <div className="responsive" key={rider._id}>
              <div className="gallery">
              <img src={rider.image} alt={rider.Name} className="packagepageimages"/>
                <p>{rider.Name}</p>
                <p>{rider.Email}</p>
                <p>{rider.ID}</p>
                <p>{rider.Position}</p>
                <p>{rider.NRIC}</p>
                <p>{rider.Status ? 'Active' : 'Inactive'}</p>
                <div className="button-container">
                  <button
                    className="update-button"
                    onClick={() =>
                      (window.location.href = `/UpdateRider/${rider._id}`)
                    }
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(rider._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create rider button */}
      <button
        className="new-rider-button"
        onClick={() => (window.location.href = "/create")}
      >
        Add New Rider
      </button>
    </div>
  );
}

export default Home;
