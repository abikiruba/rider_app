const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const fileupload = require("express-fileupload");
const fs = require("fs");

app.use(cors());
app.use(express.json());
mongoose.connect(
    "mongodb+srv://vacationapk:apk192407@cluster0.zuj273r.mongodb.net/?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
   );

// Localhost configration
// mongoose.connect("mongodb://localhost/riders", {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });

   const Rider = mongoose.model("Rider", {
    ID: Number,
    Name: String,
    Email: String,
    Position: String,
    NRIC: String,
    Status: Boolean,
    // Image: String,
   });

app.get("/allriders", async (req, res) => {
    try {
    const allriders = await Rider.find({});
   
    res.send({ status: "ok", data: allriders });
    } catch (error) {
    console.log(error);
    }
   });

app.get('/riders/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the rider by the provided ID
      const rider = await Rider.findOne({ ID: id });
  
      if (!rider) {
        return res.status(404).json({ error: 'Rider not found' });
      }
  
      res.status(200).json({ data: rider });
    } catch (error) {
      console.error('Error retrieving rider:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the rider' });
    }
  });
  
app.post('/riders', async (req, res) => {
    try {
      // Extract the rider data from the request body
      const {  id,name, email, position, nric, status } = req.body;
  
      // Create a new rider instance
      const rider = new Rider({
        ID:id,
        Name:name,
        Email:email,
        Position:position,
        NRIC:nric,
        Status:status,
      });
  
      // Save the rider to the database
      await rider.save();
  
      res.status(201).json({ message: 'Rider created successfully' });
    } catch (error) {
      console.error('Error creating rider:', error);
      res.status(500).json({ error: 'An error occurred while creating the rider' });
    }
  });

  // PUT method to update a rider
  app.put('/riders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, position, nric, status } = req.body;
  
      // Validate if id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid rider ID' });
      }
  
      // Find the rider by ID and update the fields
      const updatedRider = await Rider.findByIdAndUpdate(
        id,
        {
          Name: name,
          Email: email,
          Position: position,
          NRIC: nric,
          Status: status,
        },
        { new: true } // Set { new: true } to return the updated rider
      );
  
      if (!updatedRider) {
        return res.status(404).json({ error: 'Rider not found' });
      }
  
      res.status(200).json({ message: 'Rider updated successfully', data: updatedRider });
    } catch (error) {
      console.error('Error updating rider:', error);
      res.status(500).json({ error: 'An error occurred while updating the rider' });
    }
  });
  
  
  // DELETE method to remove a rider
app.delete('/riders/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the rider by ID and remove it
      const deletedRider = await Rider.findByIdAndRemove(id);
  
      if (!deletedRider) {
        return res.status(404).json({ error: 'Rider not found' });
      }
  
      res.status(200).json({ message: 'Rider deleted successfully' });
    } catch (error) {
      console.error('Error deleting rider:', error);
      res.status(500).json({ error: 'An error occurred while deleting the rider' });
    }
  });

 
  // API endpoint for searching riders
  // API endpoint for searching riders
app.get('/search', async (req, res) => {
    const searchCriteria = req.query.criteria;
    if (!searchCriteria) {
      return res.status(400).json({ error: 'Missing search criteria' });
    }
  
    try {
      // Perform a case-insensitive search on the MongoDB collection
      const matchedRiders = await Rider.find({
        $or: [
          { Name: { $regex: new RegExp(searchCriteria, 'i') } },
          { Email: { $regex: new RegExp(searchCriteria, 'i') } },
          { ID: { $regex: new RegExp(searchCriteria, 'i') } },
        ],
      });
  
      res.json({ riders: matchedRiders });
    } catch (error) {
      console.error('Error searching riders:', error);
      res.status(500).json({ error: 'An error occurred while searching riders' });
    }
  });
  
  
  



app.listen(5000, () => {
    console.log("Server connected on port 5000");
   });